import { NextResponse } from 'next/server'
import { z } from 'zod'
import { siteConfig } from '@/config/site'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(100),
  email: z.email('Please enter a valid email address').max(200),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  budget: z.string().trim().max(60).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Tell us a little more').max(4000),
  // Honeypot: real users never fill this, bots usually do. It has to accept a
  // filled value — rejecting it here would 422 with `website` named in the
  // issues, telling the bot exactly which field gave it away. The handler
  // below takes the silent path instead.
  website: z.string().max(200).optional(),
})

/**
 * Delivery is intentionally pluggable. Set CONTACT_WEBHOOK_URL (Slack, Discord,
 * Make, Zapier, n8n — anything that accepts a JSON POST) and submissions are
 * forwarded there. With nothing configured the route returns 501 so the client
 * can fall back to a prefilled mailto link rather than silently losing a lead.
 */
export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Please check the highlighted fields.',
        issues: parsed.error.issues.map((issue) => ({
          field: String(issue.path[0] ?? ''),
          message: issue.message,
        })),
      },
      { status: 422 },
    )
  }

  const { website, ...enquiry } = parsed.data

  // Silently accept honeypot hits so bots do not learn they were caught.
  if (website) {
    return NextResponse.json({ ok: true })
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn(
      '[contact] CONTACT_WEBHOOK_URL is not set — enquiry was not delivered. ' +
        'Set it in .env.local to receive submissions.',
    )
    return NextResponse.json(
      {
        error: 'not_configured',
        fallbackEmail: siteConfig.contact.email,
      },
      { status: 501 },
    )
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: siteConfig.url,
        receivedAt: new Date().toISOString(),
        ...enquiry,
      }),
    })

    if (!response.ok) {
      throw new Error(`Webhook responded ${response.status}`)
    }
  } catch (error) {
    console.error('[contact] Failed to deliver enquiry:', error)
    return NextResponse.json(
      { error: 'delivery_failed', fallbackEmail: siteConfig.contact.email },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}

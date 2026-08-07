'use client'

import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { Container } from '@/components/shared/Container'
import { siteConfig } from '@/config/site'
import { useToast } from '@/hooks/use-toast'

const budgets = ['< $2.5k', '$2.5k – $5k', '$5k – $15k', '$15k+', 'Not sure yet']

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>

/** Opens the visitor's mail client with the enquiry prefilled. */
function mailtoFallback(form: Record<string, string>) {
  const body = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.company && `Company: ${form.company}`,
    form.budget && `Budget: ${form.budget}`,
    '',
    form.message,
  ]
    .filter(Boolean)
    .join('\n')

  return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    `New project enquiry — ${form.name}`,
  )}&body=${encodeURIComponent(body)}`
}

export function Contact() {
  const { toast } = useToast()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [budget, setBudget] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors({})
    setStatus('sending')

    const formEl = event.currentTarget
    const data = Object.fromEntries(new FormData(formEl)) as Record<string, string>

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus('sent')
        formEl.reset()
        setBudget('')
        toast({
          title: 'Message sent',
          description: 'We reply within one business day — usually much sooner.',
        })
        return
      }

      const result = await response.json().catch(() => ({}))

      if (response.status === 422 && Array.isArray(result.issues)) {
        const fieldErrors: FieldErrors = {}
        for (const issue of result.issues) {
          if (issue.field in { name: 1, email: 1, message: 1 }) {
            fieldErrors[issue.field as keyof FieldErrors] = issue.message
          }
        }
        setErrors(fieldErrors)
        setStatus('idle')
        return
      }

      // Delivery is not configured or failed — hand the visitor their mail client
      // rather than dropping the enquiry.
      window.location.href = mailtoFallback(data)
      setStatus('idle')
      toast({
        title: 'Opening your email app',
        description: `You can also reach us directly at ${siteConfig.contact.email}.`,
      })
    } catch {
      window.location.href = mailtoFallback(data)
      setStatus('idle')
      toast({
        variant: 'destructive',
        title: 'Could not send the form',
        description: `Please email us at ${siteConfig.contact.email}.`,
      })
    }
  }

  const fieldClass =
    'w-full rounded-lg border border-kitsu-border bg-kitsu-bg px-4 py-3 text-sm text-white placeholder:text-kitsu-dim outline-none transition-colors duration-300 focus:border-fox'

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      <div
        className="pointer-events-none absolute -bottom-40 right-0 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.09) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: pitch + details */}
          <AnimatedSection direction="up">
            <p className="mb-3 font-accent text-xs uppercase tracking-[0.2em] text-fox">
              Get in touch
            </p>
            <h2
              id="contact-heading"
              className="mb-5 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            >
              Let&apos;s build something{' '}
              <span className="gradient-text-fox">worth shipping</span>
            </h2>
            <p className="mb-10 text-base leading-relaxed text-kitsu-muted md:text-lg">
              Tell us what you are working on. We reply within one business day with honest
              feedback, a rough timeline and a number — no discovery-call gatekeeping.
            </p>

            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-kitsu-border bg-kitsu-surface text-fox">
                  <Mail className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="mb-0.5 text-xs uppercase tracking-wider text-kitsu-dim">Email</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="animated-underline text-sm text-white transition-colors hover:text-fox"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>

              {siteConfig.contact.phone && (
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-kitsu-border bg-kitsu-surface text-fox">
                    <Phone className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="mb-0.5 text-xs uppercase tracking-wider text-kitsu-dim">Phone</p>
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                      className="animated-underline text-sm text-white transition-colors hover:text-fox"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </li>
              )}

              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-kitsu-border bg-kitsu-surface text-fox">
                  <MapPin className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="mb-0.5 text-xs uppercase tracking-wider text-kitsu-dim">Based in</p>
                  <p className="text-sm text-white">
                    {siteConfig.address.city}, {siteConfig.address.countryName}
                  </p>
                  <p className="mt-1 text-xs text-kitsu-dim">
                    Working with clients across Europe, North America and the Gulf
                  </p>
                </div>
              </li>
            </ul>
          </AnimatedSection>

          {/* Right: form */}
          <AnimatedSection direction="up" delay={0.12}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-kitsu-border bg-kitsu-surface p-6 md:p-8"
            >
              {/* Honeypot — hidden from humans and assistive tech. */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="website">Do not fill this in</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                    Name <span className="text-fox">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Yasmine Bennani"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                    Email <span className="text-fox">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="company" className="mb-2 block text-sm font-medium text-white">
                  Company <span className="text-kitsu-dim">(optional)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Acme SARL"
                  className={fieldClass}
                />
              </div>

              <fieldset className="mt-5">
                <legend className="mb-2 block text-sm font-medium text-white">
                  Budget <span className="text-kitsu-dim">(optional)</span>
                </legend>
                <input type="hidden" name="budget" value={budget} />
                <div className="flex flex-wrap gap-2">
                  {budgets.map((option) => {
                    const selected = budget === option
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setBudget(selected ? '' : option)}
                        aria-pressed={selected}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
                          selected
                            ? 'border-fox bg-fox/10 text-fox'
                            : 'border-kitsu-border text-kitsu-muted hover:border-fox/30 hover:text-white'
                        }`}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
                  What are you building? <span className="text-fox">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="A few sentences on the project, the goal, and any deadline you are working towards."
                  className={`${fieldClass} resize-y`}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-fox px-8 py-3.5 font-semibold text-white fox-glow transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" strokeWidth={2} />
                    Send enquiry
                  </>
                )}
              </button>

              <p aria-live="polite" className="mt-4 text-center text-xs text-kitsu-dim">
                {status === 'sent'
                  ? 'Thanks — your message is on its way.'
                  : 'We never share your details. No newsletter signup, no sales sequence.'}
              </p>
            </form>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}

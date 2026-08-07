/**
 * Renders JSON-LD. Server component by design — structured data must be in the
 * initial HTML, since crawlers that skip JavaScript will otherwise never see it.
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return (
    <script
      type="application/ld+json"
      // Content is built from our own config, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

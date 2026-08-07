import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/**
 * Article body renderer. Styles are declared per-element rather than via a
 * typography plugin so the amber/charcoal theme stays consistent with the
 * landing page without pulling in another dependency.
 */
export function Markdown({ content }: { content: string }) {
  return (
    <div className="text-base leading-[1.75] text-kitsu-muted md:text-[1.0625rem]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-14 mb-4 scroll-mt-28 font-heading text-2xl font-bold text-white md:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-10 mb-3 scroll-mt-28 font-heading text-lg font-semibold text-white md:text-xl">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mb-5">{children}</p>,
          a: ({ href, children }) => {
            const isExternal = href?.startsWith('http')
            return (
              <a
                href={href}
                className="text-fox underline decoration-fox/30 underline-offset-4 transition-colors hover:decoration-fox"
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {children}
              </a>
            )
          },
          ul: ({ children }) => <ul className="mb-6 space-y-2.5 pl-1">{children}</ul>,
          ol: ({ children }) => (
            <ol className="mb-6 list-decimal space-y-2.5 pl-5 marker:text-fox">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-fox/60 [ol_&]:pl-0 [ol_&]:before:hidden">
              {children}
            </li>
          ),
          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
          blockquote: ({ children }) => (
            <blockquote className="my-7 border-l-2 border-fox/50 pl-5 text-white/85 italic">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isBlock = Boolean(className)
            if (!isBlock) {
              return (
                <code className="rounded-md border border-kitsu-border bg-kitsu-elevated px-1.5 py-0.5 font-accent text-[0.875em] text-fox-glow">
                  {children}
                </code>
              )
            }
            return <code className="font-accent text-sm text-kitsu-muted">{children}</code>
          },
          pre: ({ children }) => (
            <pre className="mb-6 overflow-x-auto rounded-xl border border-kitsu-border bg-kitsu-surface p-5 leading-relaxed">
              {children}
            </pre>
          ),
          hr: () => <hr className="my-12 border-kitsu-border" />,
          table: ({ children }) => (
            <div className="mb-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-kitsu-border px-4 py-2.5 text-left font-semibold text-white">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-kitsu-border/50 px-4 py-2.5">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

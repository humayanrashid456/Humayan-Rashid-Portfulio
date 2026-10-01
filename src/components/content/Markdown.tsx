import ReactMarkdown, { type Components } from "react-markdown";

// Rendered on the server; raw HTML in the source is not rendered (react-markdown's default).
const components: Components = {
  h1: ({ children }) => <h2 className="font-display font-black text-2xl text-white mt-10 mb-4">{children}</h2>,
  h2: ({ children }) => <h2 className="font-display font-black text-2xl text-white mt-10 mb-4">{children}</h2>,
  h3: ({ children }) => <h3 className="font-display font-bold text-xl text-white mt-8 mb-3">{children}</h3>,
  h4: ({ children }) => <h4 className="font-display font-bold text-lg text-white mt-6 mb-2">{children}</h4>,
  p: ({ children }) => <p className="text-zinc-300 text-base leading-relaxed my-5">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-6 my-5 space-y-2 text-zinc-300 marker:text-[#cbf341]">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6 my-5 space-y-2 text-zinc-300 marker:text-[#cbf341]">{children}</ol>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-[#cbf341] underline underline-offset-2 hover:text-white"
      {...(href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[#cbf341]/50 pl-4 my-6 text-zinc-400 italic">{children}</blockquote>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-[#04120b] p-4 text-sm leading-relaxed">
      {children}
    </pre>
  ),
  code: ({ className, children }) =>
    className ? (
      <code className={`font-mono text-zinc-200 ${className}`}>{children}</code>
    ) : (
      <code className="font-mono text-[0.9em] text-[#cbf341] bg-[#0a2219] border border-white/10 rounded px-1.5 py-0.5">
        {children}
      </code>
    ),
  hr: () => <hr className="my-10 border-white/10" />,
  img: ({ src, alt }) =>
    // Arbitrary-source images inside article bodies; dimensions are unknown here.
    // eslint-disable-next-line @next/next/no-img-element
    typeof src === "string" ? <img src={src} alt={alt ?? ""} loading="lazy" className="my-6 rounded-xl border border-white/10" /> : null,
};

export default function Markdown({ source }: { source: string }) {
  return <ReactMarkdown components={components}>{source}</ReactMarkdown>;
}

import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="mb-4 mt-8 text-3xl font-bold first:mt-0" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="mb-3 mt-6 text-2xl font-semibold" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="mb-2 mt-4 text-xl font-semibold" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300" {...props}>
        {children}
      </p>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-zinc-900 dark:text-zinc-100" {...props}>
        {children}
      </strong>
    ),
    ul: ({ children, ...props }) => (
      <ul className="mb-4 list-disc space-y-1 pl-6" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-6" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-zinc-700 leading-relaxed dark:text-zinc-300" {...props}>
        {children}
      </li>
    ),
    code: ({ children, ...props }) => (
      <code
        className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-mono text-pink-600 dark:bg-zinc-800 dark:text-pink-400"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="mb-4 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        {...props}
      >
        {children}
      </pre>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-blue-600 underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-700 dark:text-blue-400 dark:decoration-blue-700"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="mb-4 border-l-4 border-blue-400 pl-4 italic text-zinc-600 dark:border-blue-600 dark:text-zinc-400"
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: (props) => (
      <hr
        className="my-8 border-zinc-200 dark:border-zinc-700"
        {...props}
      />
    ),
    img: ({ src, alt, ...props }) => (
      <img
        src={src}
        alt={alt}
        className="my-4 rounded-lg"
        {...props}
      />
    ),
    table: ({ children, ...props }) => (
      <div className="mb-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border border-zinc-300 bg-zinc-100 px-3 py-2 text-left font-semibold dark:border-zinc-600 dark:bg-zinc-800"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="border border-zinc-300 px-3 py-2 dark:border-zinc-600"
        {...props}
      >
        {children}
      </td>
    ),
    ...components,
  };
}

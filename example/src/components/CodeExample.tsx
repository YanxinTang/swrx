import { Highlight, themes } from 'prism-react-renderer';
import type { ReactNode } from 'react';

interface CodeExampleProps {
  index: string;
  title: string;
  fileName: string;
  description?: string;
  code: string;
  children: ReactNode;
}

export function CodeExample({
  index,
  title,
  fileName,
  description,
  code,
  children,
}: CodeExampleProps) {
  return (
    <section className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 lg:py-12">
      <header className="lg:sticky lg:top-24 lg:self-start">
        <p className="subheader text-accent-blue">{index}</p>
        <h3 className="mt-2 font-plex-serif text-xl leading-snug tracking-tight text-offgray-950">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-offgray-600">
            {description}
          </p>
        ) : null}
        <p className="mt-4 border-t border-offgray-200 pt-3 font-zed-mono text-[10px] uppercase tracking-wider text-offgray-500">
          {fileName}
        </p>
      </header>

      <div className="grid min-w-0 overflow-hidden border border-offgray-200 bg-white md:grid-cols-2">
        <div className="order-2 h-72 min-w-0 overflow-auto border-t border-offgray-200 bg-white md:order-1 md:h-80 md:border-t-0">
          <Highlight theme={themes.oneLight} code={code.trim()} language="tsx">
            {({ tokens, getLineProps, getTokenProps }) => (
              <pre className="min-w-max p-4 font-zed-mono text-[12px] leading-5">
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>

        <div
          data-testid={title}
          className="order-1 flex min-h-72 min-w-0 items-center justify-center bg-white p-6 md:order-2 md:h-80 md:border-l md:border-offgray-200 md:overflow-auto"
        >
          <div className="w-full">{children}</div>
        </div>
      </div>
    </section>
  );
}

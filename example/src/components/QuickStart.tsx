import { Highlight, themes } from 'prism-react-renderer';
import { useState } from 'react';
import apiCode from '../examples/quickstart/api.ts?raw';
import pageCode from '../examples/quickstart/page.tsx?raw';

const FILES = [
  { name: 'api.ts', language: 'ts', code: apiCode },
  { name: 'page.tsx', language: 'tsx', code: pageCode },
] as const;

export function QuickStart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = FILES[activeIndex];

  return (
    <div className="min-w-0 border border-offgray-200 bg-white/80">
      <div className="flex items-stretch justify-between border-b border-offgray-200">
        <div role="tablist" aria-label="Quick start files" className="flex">
          {FILES.map((file, index) => {
            const selected = index === activeIndex;

            return (
              <button
                key={file.name}
                type="button"
                role="tab"
                id={`quickstart-tab-${file.name}`}
                aria-selected={selected}
                aria-controls={`quickstart-panel-${file.name}`}
                onClick={() => setActiveIndex(index)}
                className={`h-9 border-r border-offgray-200 px-3 font-zed-mono text-[10px] uppercase tracking-wider transition-colors ${
                  selected
                    ? 'bg-cream-50 text-accent-blue'
                    : 'text-offgray-500 hover:bg-offgray-50/60 hover:text-offgray-800'
                }`}
              >
                {file.name}
              </button>
            );
          })}
        </div>
        <span className="hidden items-center px-3 font-zed-mono text-[9px] uppercase tracking-wider text-offgray-400 sm:flex">
          Quick start
        </span>
      </div>

      <div
        role="tabpanel"
        id={`quickstart-panel-${active.name}`}
        aria-labelledby={`quickstart-tab-${active.name}`}
        className="h-80 min-w-0 overflow-auto sm:h-96"
      >
        <Highlight
          key={active.name}
          theme={themes.oneLight}
          code={active.code.trim()}
          language={active.language}
        >
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
    </div>
  );
}

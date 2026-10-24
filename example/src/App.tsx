import { CodeExample } from './components/CodeExample';
import { QuickStart } from './components/QuickStart';
import BasicUsage from './examples/BasicUsage';
import basicUsageCode from './examples/BasicUsage.tsx?raw';
import ConditionalFetch from './examples/ConditionalFetch';
import conditionalFetchCode from './examples/ConditionalFetch.tsx?raw';
import ErrorHandling from './examples/ErrorHandling';
import errorHandlingCode from './examples/ErrorHandling.tsx?raw';
import ImmutableData from './examples/ImmutableData';
import immutableDataCode from './examples/ImmutableData.tsx?raw';
import MultipleParams from './examples/MultipleParams';
import multipleParamsCode from './examples/MultipleParams.tsx?raw';
import './App.css';
import { Button } from './components/Button';
import pkgJson from '../../package.json';

const NAV_ITEMS = [
  { label: '概览', href: '#overview' },
  { label: '特性', href: '#features' },
  { label: '示例', href: '#examples' },
];

const FEATURES = [
  {
    index: '01',
    label: 'Key',
    title: '函数即 key',
    body: '把 API 函数和它的参数放进同一个元组，无需再单独编写 fetcher。',
  },
  {
    index: '02',
    label: 'Types',
    title: '签名即类型',
    body: 'data 从函数返回值自动推导，Promise 自动解包，参数逐一校验。',
  },
  {
    index: '03',
    label: 'SWR',
    title: '完整的 SWR',
    body: '配置项、mutate、条件请求与缓存策略全部原样保留。',
  },
];

const EXAMPLES = [
  {
    title: '基础用法',
    fileName: 'BasicUsage.tsx',
    description:
      '把 API 函数和参数放进同一个 key 元组，data 从返回值自动推导，异步 Promise 自动解包。',
    code: basicUsageCode,
    render: <BasicUsage />,
  },
  {
    title: '多参数',
    fileName: 'MultipleParams.tsx',
    description: '多个参数按顺序传入，与 API 函数的参数类型逐一校验。',
    code: multipleParamsCode,
    render: <MultipleParams />,
  },
  {
    title: '条件请求',
    fileName: 'ConditionalFetch.tsx',
    description: 'key 为 null 或 false 时暂停请求。',
    code: conditionalFetchCode,
    render: <ConditionalFetch />,
  },
  {
    title: '错误处理与重试',
    fileName: 'ErrorHandling.tsx',
    description: '接口抛错时 error 会被捕获，可通过 mutate() 重试。',
    code: errorHandlingCode,
    render: <ErrorHandling />,
  },
  {
    title: 'useApiImmutable',
    fileName: 'ImmutableData.tsx',
    description: '数据加载成功后不再自动重新验证，适合不会频繁变化的数据。',
    code: immutableDataCode,
    render: <ImmutableData />,
  },
];

const App = () => (
  <div className="min-h-screen bg-cream-50 font-sans text-offgray-900 antialiased">
    <a
      href="#main"
      className="sr-only rounded-sm bg-accent-blue px-3 py-2 font-zed-mono text-xs text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
    >
      跳到主要内容
    </a>

    <header className="sticky top-0 z-30 border-b border-offgray-200 bg-cream-50/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <a href="#overview" className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center border border-accent-blue/40 bg-accent-blue/10"
          >
            <span className="h-1.5 w-1.5 bg-accent-blue" />
          </span>
          <span className="font-zed-mono text-sm tracking-tight text-offgray-950">
            {pkgJson.name}
          </span>
        </a>

        <nav className="hidden items-center gap-7 sm:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-zed-mono text-[10px] uppercase tracking-wider text-offgray-500 transition-colors hover:text-accent-blue"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden font-zed-mono text-[10px] uppercase tracking-wider text-offgray-500 md:inline">
            {pkgJson.version}
          </span>
          <a
            href="https://github.com/tyx1703/swrx"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-7 items-center border border-offgray-300 px-2.5 font-zed-mono text-[10px] uppercase tracking-wider text-offgray-700 transition-colors hover:border-offgray-400 hover:text-offgray-950"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/swrx"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-7 items-center border border-offgray-300 px-2.5 font-zed-mono text-[10px] uppercase tracking-wider text-offgray-700 transition-colors hover:border-offgray-400 hover:text-offgray-950"
          >
            npm
          </a>
        </div>
      </div>
    </header>

    <section
      id="overview"
      className="relative overflow-hidden border-b border-offgray-200"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-blueprint opacity-70"
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-end gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <p className="subheader flex items-center gap-2 text-accent-blue">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent-blue" />
            Type-safe · SWR · TypeScript
          </p>

          <h1 className="mt-5 font-plex-serif text-[2.75rem] font-normal leading-[1.06] tracking-tight text-offgray-950 sm:text-6xl">
            {pkgJson.name}
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-offgray-600 sm:text-base">
            fetcher 即 key，类型安全的 SWR hooks
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-8 min-w-0 items-center gap-3 border border-offgray-200 bg-white/80 px-3 font-zed-mono text-xs text-offgray-700">
              <span className="text-accent-blue">$</span>
              <code className="min-w-0">pnpm add @tyx1703/swrx swr</code>
            </div>
            <a href="#examples">
              <Button>查看示例</Button>
            </a>
          </div>
        </div>

        <QuickStart />
      </div>
    </section>

    <section id="features" className="border-b border-offgray-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid divide-y divide-offgray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {FEATURES.map((feature) => (
            <div key={feature.index} className="py-8 sm:px-8 sm:py-10">
              <div className="flex items-center justify-between">
                <span className="subheader text-offgray-500">
                  {feature.label}
                </span>
                <span className="font-zed-mono text-[10px] text-accent-blue">
                  {feature.index}
                </span>
              </div>
              <h2 className="mt-3 font-plex-serif text-xl tracking-tight text-offgray-950">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-offgray-600">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <main id="main" className="mx-auto max-w-6xl px-6">
      <div
        id="examples"
        className="flex scroll-mt-20 flex-col gap-4 border-b border-offgray-200 py-10 sm:flex-row sm:items-end sm:justify-between sm:py-14"
      >
        <div>
          <p className="subheader text-offgray-500">Live examples</p>
          <h2 className="mt-2 font-plex-serif text-3xl tracking-tight text-offgray-950">
            示例
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-offgray-600">
          左侧是源码，右侧是实时运行结果。每个示例都只演示一个核心概念。
        </p>
      </div>

      <div className="divide-y divide-offgray-200">
        {EXAMPLES.map((example, index) => (
          <CodeExample
            key={example.title}
            index={String(index + 1).padStart(2, '0')}
            title={example.title}
            fileName={example.fileName}
            description={example.description}
            code={example.code}
          >
            {example.render}
          </CodeExample>
        ))}
      </div>
    </main>

    <footer className="border-t border-offgray-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-zed-mono text-[10px] uppercase tracking-wider text-offgray-500">
          @tyx1703/swrx · Built on SWR · MIT
        </p>
        <p className="font-zed-mono text-[10px] uppercase tracking-wider text-offgray-500">
          Type-safe data fetching
        </p>
      </div>
    </footer>
  </div>
);

export default App;

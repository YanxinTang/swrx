import { useApiImmutable } from 'swrx';

interface Settings {
  theme: 'light' | 'dark';
  locale: string;
  notifications: boolean;
}

async function getSettings(): Promise<Settings> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { theme: 'light', locale: 'zh-CN', notifications: true };
}

export default function ImmutableData() {
  // 数据加载成功后不会自动重新验证
  const { data, isLoading } = useApiImmutable([getSettings]);

  if (isLoading) {
    return (
      <p className="text-center font-zed-mono text-xs text-offgray-500">
        Loading…
      </p>
    );
  }

  if (!data) {
    return null;
  }

  const items = [
    { label: 'Theme', value: data.theme },
    { label: 'Locale', value: data.locale },
    { label: 'Notify', value: data.notifications ? '开启' : '关闭' },
  ];

  return (
    <dl className="mx-auto grid w-full max-w-sm grid-cols-3 divide-x divide-offgray-200 border-y border-offgray-200">
      {items.map((item) => (
        <div key={item.label} className="px-2 py-4 text-center">
          <dt className="subheader text-offgray-500">{item.label}</dt>
          <dd className="mt-1.5 font-plex-serif text-base leading-tight text-offgray-950">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

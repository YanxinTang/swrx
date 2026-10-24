import { useApi } from 'swrx';

interface User {
  id: number;
  name: string;
  role: string;
}

// 模拟一个异步 API 函数
async function getUser(id: number): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { id, name: '张伟', role: '前端工程师' };
}

export default function BasicUsage() {
  const { data, error, isLoading } = useApi([getUser, 1]);
  // data: User | undefined（Promise 已自动解包）

  if (isLoading) {
    return (
      <p className="text-center font-zed-mono text-xs text-offgray-500">
        Loading…
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center font-zed-mono text-xs text-danger">加载失败</p>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-xs items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent-blue/30 bg-accent-blue/10 font-plex-serif text-lg leading-none text-accent-blue">
        {data.name.charAt(0)}
      </div>
      <div className="min-w-0">
        <p className="truncate font-plex-serif text-lg leading-tight text-offgray-950">
          {data.name}
        </p>
        <p className="mt-0.5 font-zed-mono text-[10px] uppercase tracking-wider text-offgray-500">
          {data.role}
        </p>
      </div>
    </div>
  );
}

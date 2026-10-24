import { useState } from 'react';
import { useApi } from 'swrx';
import { Button } from '../components/Button';

interface User {
  id: number;
  name: string;
}

async function getUser(id: number): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { id, name: id === 1 ? '张伟' : '李娜' };
}

export default function ConditionalFetch() {
  const [id, setId] = useState<number | null>(null);

  // id 为 null 时暂停请求
  const { data, isLoading } = useApi(id ? [getUser, id] : null);

  return (
    <div className="mx-auto w-full max-w-xs">
      <div className="flex gap-2">
        <Button
          variant={id === 1 ? 'primary' : 'secondary'}
          onClick={() => setId(1)}
        >
          用户 1
        </Button>
        <Button
          variant={id === 2 ? 'primary' : 'secondary'}
          onClick={() => setId(2)}
        >
          用户 2
        </Button>
        <Button
          variant={id === null ? 'primary' : 'secondary'}
          onClick={() => setId(null)}
        >
          清空
        </Button>
      </div>

      <div className="mt-4 flex min-h-16 items-center justify-center border-y border-offgray-200">
        {id === null ? (
          <p className="font-zed-mono text-xs text-offgray-500">已暂停</p>
        ) : isLoading ? (
          <p className="font-zed-mono text-xs text-offgray-500">Loading…</p>
        ) : (
          <p className="font-plex-serif text-lg leading-tight text-offgray-950">
            {data?.name}
          </p>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useApi } from 'swrx';
import { Button } from '../components/Button';

interface User {
  id: number;
  name: string;
}

const USERS: User[] = [{ id: 1, name: '张伟' }];

async function getUser(id: number): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const user = USERS.find((u) => u.id === id);
  if (!user) {
    throw new Error(`用户 ${id} 不存在`);
  }
  return user;
}

export default function ErrorHandling() {
  const [id, setId] = useState(404);
  const { data, error, isLoading, mutate } = useApi([getUser, id]);

  return (
    <div className="mx-auto w-full max-w-xs">
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => setId(1)}>
          正常用户
        </Button>
        <Button variant="secondary" onClick={() => setId(404)}>
          404
        </Button>
      </div>

      <div className="mt-4 flex min-h-20 items-center justify-center border-y border-offgray-200">
        {isLoading ? (
          <p className="font-zed-mono text-xs text-offgray-500">Loading…</p>
        ) : error ? (
          <div className="w-full text-center">
            <p className="text-sm leading-6 text-danger">
              {error instanceof Error ? error.message : String(error)}
            </p>
            <Button variant="primary" className="mt-3" onClick={() => mutate()}>
              重试
            </Button>
          </div>
        ) : (
          <p className="font-plex-serif text-lg leading-tight text-offgray-950">
            {data?.name}
          </p>
        )}
      </div>
    </div>
  );
}

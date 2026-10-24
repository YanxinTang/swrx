import { useState } from 'react';
import { useApi } from '@tyx1703/swrx';
import { Button } from '../components/Button';

interface User {
  id: number;
  name: string;
}

const USERS: User[] = [
  { id: 1, name: '张伟' },
  { id: 2, name: '李娜' },
  { id: 3, name: '王强' },
  { id: 4, name: '赵敏' },
];

// 分页 API：page / pageSize 会和调用处的参数逐一校验
async function getUsers(page: number, pageSize: number): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return USERS.slice((page - 1) * pageSize, page * pageSize);
}

const PAGE_SIZE = 2;
const TOTAL_PAGES = Math.ceil(USERS.length / PAGE_SIZE);

export default function MultipleParams() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useApi([getUsers, page, PAGE_SIZE]);

  return (
    <div className="mx-auto w-full max-w-xs">
      {isLoading ? (
        <div className="flex h-[113px] items-center justify-center border-y border-offgray-200">
          <p className="font-zed-mono text-xs text-offgray-500">Loading…</p>
        </div>
      ) : (
        <ul className="divide-y divide-offgray-200 border-y border-offgray-200">
          {data?.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between py-2.5"
            >
              <span className="text-sm text-offgray-900">{user.name}</span>
              <span className="font-zed-mono text-[10px] uppercase tracking-wider text-offgray-500">
                #{user.id}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <Button
          variant="secondary"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          上一页
        </Button>
        <span className="shrink-0 font-zed-mono text-[10px] uppercase tracking-wider text-offgray-500">
          {page} / {TOTAL_PAGES}
        </span>
        <Button
          variant="secondary"
          disabled={page >= TOTAL_PAGES}
          onClick={() => setPage((p) => p + 1)}
        >
          下一页
        </Button>
      </div>
    </div>
  );
}

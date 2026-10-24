# swrx

[![npm version](https://img.shields.io/npm/v/@tyx1703/swrx?color=1348dc)](https://www.npmjs.com/package/@tyx1703/swrx)
[![npm downloads](https://img.shields.io/npm/dm/@tyx1703/swrx)](https://www.npmjs.com/package/@tyx1703/swrx)
[![GitHub stars](https://img.shields.io/github/stars/YanxinTang/swrx?color=1348dc)](https://github.com/YanxinTang/swrx)
[![license](https://img.shields.io/badge/license-MIT-1348dc)](https://github.com/YanxinTang/swrx)

> fetcher 即 key，类型安全的 SWR hooks。

基于 [SWR](https://swr.vercel.app/) 的轻量封装，将 API 函数及其参数作为 SWR 的 key，让 TypeScript 根据函数签名推导请求数据类型，并检查参数类型。

相比原生 SWR，使用 `swrx` 不需要单独编写 fetcher，也不需要为 `data` 指定泛型。

- npm: <https://www.npmjs.com/package/@tyx1703/swrx>
- GitHub: <https://github.com/YanxinTang/swrx>
- 在线示例: <https://yanxintang.github.io/swrx/>

## 特性

- **函数即 key**：API 函数和参数组成 key，不再需要单独的 fetcher。
- **签名即类型**：`data` 从函数返回值自动推导，Promise 自动解包；参数与签名不一致时 TypeScript 会报错。
- **完整的 SWR**：配置项、`mutate`、条件请求、缓存与重新验证策略全部保留。

## 安装

```bash
pnpm add @tyx1703/swrx swr
```

`swr` 是 peer dependency，需单独安装。支持 `swr@^2.0.0`。

## 快速开始

### 1. 定义 API

```ts
// api.ts
export interface User {
  id: number;
  name: string;
  role: string;
}

export async function getUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}
```

### 2. 在组件中使用

```tsx
// page.tsx
import { useApi } from '@tyx1703/swrx';
import { getUser } from './api';

export function UserProfile({ id }: { id: number }) {
  const { data, error, isLoading } = useApi([getUser, id]);

  if (isLoading) return <p>加载中...</p>;
  if (error) return <p>请求失败</p>;
  if (!data) return null;

  return (
    <section>
      <h2>{data.name}</h2>
      <p>{data.role}</p>
    </section>
  );
}
```

`data` 的类型为 `User | undefined`，由 `getUser` 的返回值推导。参数与函数签名不匹配时，TypeScript 会报错。

## 更多用法

### 多个参数与无参函数

参数按函数签名中的顺序传入，无参函数只需传入函数本身。

```ts
async function getUsers(page: number, size: number): Promise<User[]> {
  // ...
}

useApi([getUsers, 1, 20]);

async function getConfig(): Promise<Config> {
  // ...
}

useApi([getConfig]);
```

### 条件请求

传入 `null` 或 `false` 可暂停请求，也可以使用返回 key 的函数。

```ts
useApi(id ? [getUser, id] : null);

useApi(() => (id ? [getUser, id] : null));
```

### useApiImmutable

`useApiImmutable` 使用 SWR 的 `useSWRImmutable`，适用于不需要自动重新验证的请求。

```ts
import { useApiImmutable } from '@tyx1703/swrx';

const { data } = useApiImmutable([getConfig]);
```

### 配置项

第二个参数与 SWR 的配置项一致，返回值也是标准的 `SWRResponse`。

```ts
const { data, mutate } = useApi([getUser, id], {
  refreshInterval: 5000,
  revalidateOnFocus: false,
});
```

## 类型定义

### 参数与返回值

`swrx` 根据 API 函数的签名推导参数和数据类型，支持同步函数与异步函数。

```ts
async function getUser(id: number): Promise<User> {
  // ...
}

useApi([getUser, 1]); // 正确
useApi([getUser, '1']); // 类型错误
useApi([getUser]); // 缺少参数
```

### 错误类型

第三个泛型参数用于指定错误类型，默认是 `unknown`。

```ts
interface ApiError {
  code: number;
  message: string;
}

useApi<[number], User, ApiError>([getUser, id]);
```

通常不需要手动指定泛型。上例中的 `A` 表示参数元组，`R` 表示数据类型，第三个泛型表示错误类型。

### 导出的类型

`ApiFn` 用于描述 API 函数，`SWRKey` 用于描述请求 key。

```ts
import type { ApiFn, SWRKey } from '@tyx1703/swrx';

const getUser: ApiFn<[number], User> = async (id) => {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
};

function useUser(id: number | null) {
  const key: SWRKey<[number], User> = id == null ? null : [getUser, id];

  return useApi(key);
}
```

## 注意事项

API 函数应保持引用稳定，建议定义在模块级。不要在组件渲染时创建新的 API 函数作为 key 的一部分。

```ts
// 推荐：模块级函数
async function getUser(id: number): Promise<User> {
  // ...
}

// 组件中复用
const { data } = useApi([getUser, id]);
```

## 开发

```bash
# 安装依赖
pnpm install

# 构建库
pnpm run build

# 监听构建
pnpm run dev

# 运行测试
pnpm run test
pnpm run test:watch

# 代码检查与格式化
pnpm run lint
pnpm run format

# 更新版本号
pnpm run bumpp
```

## License

MIT

/**
 * 一个可被 @tyx1703/swrx 调用的 API 函数。
 *
 * @template A - 参数元组类型
 * @template R - 解析后的数据类型（同步返回或 Promise 解析值）
 */
export interface ApiFn<A extends unknown[] = unknown[], R = unknown> {
  (...args: A): R | Promise<R>;
}

/**
 * `useApi` / `useApiImmutable` 接受的 key。
 *
 * - `[apiFn, ...args]` 元组：最常用的形式，携带 API 函数与实参
 * - `null | false`：条件拉取，为假值时暂停请求
 * - `() => SWRKey`：返回 key 的函数，用于动态 / 条件 key
 *
 * @template A - API 函数参数元组类型
 * @template R - API 函数返回值（解析后）类型
 */
export type SWRKey<A extends unknown[], R> =
  | null
  | false
  | readonly [ApiFn<A, R>, ...A]
  | (() => SWRKey<A, R>);

/**
 * 从 key 中取出 API 函数并调用它。
 *
 * @example
 *
 * useApi([fn, args[0], args[1], ...])
 */
export const fetcher = <A extends unknown[], R>(
  key: readonly [ApiFn<A, R>, ...A],
): R | Promise<R> => {
  const [fn, ...args] = key;
  return fn(...args);
};

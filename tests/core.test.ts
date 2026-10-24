import { describe, expect, it, rs } from '@rstest/core';
import { fetcher } from '../src/core';

describe('fetcher', () => {
  it('应该从元组 key 中提取函数和参数', async () => {
    const fn = rs.fn((id: number) => id);

    expect(fetcher([fn, 1])).toBe(1);

    // @ts-expect-error 缺少参数
    expect(fetcher([fn])).toBe(undefined);
  });

  it('应该支持异步 API 返回值', async () => {
    const fn = rs.fn(async (id: number) => id);

    await expect(fetcher([fn, 1])).resolves.toBe(1);

    // @ts-expect-error 缺少参数
    await expect(fetcher([fn])).resolves.toBe(undefined);
  });

  it('应该支持无参 API 函数', async () => {
    const fn = rs.fn(() => 1);

    expect(fetcher([fn])).toBe(1);
  });
});

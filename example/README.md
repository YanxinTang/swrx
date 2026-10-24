# @tyx1703/swrx 示例

一个参考 React 官网布局、采用 Zed 官网视觉语言的示例页面：**左侧是代码，右侧是实时运行的示例**，用于演示 [swrx](../README.md) 的核心用法。

整体遵循 Zed 的编辑式极简风格：暖白背景（`cream-*`）、冷灰文字（`offgray-*`）、克制的蓝色强调（`accent-blue`）、IBM Plex 字体族，以及细边框与工程网格构成的版面秩序。代码面板采用深色编辑器观感，与浅色页面形成对比。

页面包含导航、概览区、特性栅格和示例区。概览区提供一份 `api.ts` + `page.tsx` 的完整快速开始示例，可通过标签切换查看；每个演示示例则由左侧的序号 / 标题 / 文件名说明、深色源码面板和浅色实时预览面板组成。

代码与示例通过 `?raw` 导入保持同步（示例组件即展示源码），避免文档与示例脱节。

## 演示内容

| 示例            | 说明                                                   |
| --------------- | ------------------------------------------------------ |
| 基础用法        | `useApi([getUser, id])`，data 从返回值自动推导         |
| 多参数          | `useApi([getUsers, page, pageSize])`，参数逐一校验     |
| 条件请求        | `useApi(id ? [getUser, id] : null)`，id 为空时暂停请求 |
| 错误处理与重试  | 接口抛错时 `error` 被捕获，可用 `mutate()` 重试        |
| useApiImmutable | 数据加载成功后不再自动重新验证                         |

## 目录结构

```
example/
├── src/
│   ├── App.tsx                  # 页面入口：导航 / 概览 / 特性 / 示例
│   ├── App.css                  # Tailwind CSS 主题与自定义工具类
│   ├── index.tsx                # 应用挂载入口
│   ├── components/
│   │   ├── Button.tsx           # 主 / 次按钮
│   │   ├── CodeExample.tsx      # 示例分栏：源码高亮 + 实时预览
│   │   └── QuickStart.tsx       # 首页快速开始：api.ts / page.tsx 切换
│   └── examples/                # 每个文件都是一个自包含示例
│       ├── quickstart/
│       │   ├── api.ts           # 接口定义与 API 函数
│       │   └── page.tsx         # 使用 useApi 的组件
│       ├── BasicUsage.tsx
│       ├── MultipleParams.tsx
│       ├── ConditionalFetch.tsx
│       ├── ErrorHandling.tsx
│       └── ImmutableData.tsx
└── tests/
    └── index.test.tsx           # 页面渲染与交互测试
```

## 设计约定

- 颜色只使用 `App.css` 中 `@theme` 定义的 `accent-blue`、`cream-*`、`offgray-*` 与语义化 `danger`。
- 标题使用 `font-plex-serif`，正文使用 `font-sans`，技术标签使用 `font-zed-mono` 或 `subheader` 工具类。
- 优先使用 1px 细边框、分隔线和网格建立层次，避免大圆角、厚重阴影和嵌套卡片。
- 装饰元素保持低对比度，并标注 `aria-hidden`。

## 开始

先构建根目录的 swrx（示例通过 workspace 引用它的构建产物）：

```bash
# 在仓库根目录
pnpm install
pnpm run build
```

然后启动示例开发服务器，访问 [http://localhost:3000](http://localhost:3000)：

```bash
cd example
pnpm run dev
```

构建生产版本：

```bash
pnpm run build
```

预览生产构建：

```bash
pnpm run preview
```

## 运行测试

```bash
pnpm run test
```

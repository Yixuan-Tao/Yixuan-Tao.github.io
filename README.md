# Yixuan Tao - 个人网站

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

一个现代化的个人网站，展示我的项目、技术博客和个人信息。支持中英文双语切换。

## 🌟 特性

- **响应式设计**：完美适配桌面、平板和移动设备
- **双语支持**：支持中文和英文切换
- **深色模式**：支持深色和浅色主题切换
- **现代化UI**：使用 Radix UI 和 Tailwind CSS 构建精美界面
- **动画效果**：流畅的页面滚动动画和过渡效果
- **SEO友好**：优化的HTML结构和元数据

## 🛠️ 技术栈

### 前端框架
- **React 19.2.0** - 用于构建用户界面
- **TypeScript** - 类型安全的JavaScript
- **Vite 7.2.4** - 快速的开发服务器和构建工具

### 样式和UI
- **Tailwind CSS 3.4.19** - 实用优先的CSS框架
- **Radix UI** - 无障碍的React组件库
- **Lucide React** - 精美的图标库
- **Framer Motion** - 动画效果库

### 国际化
- **i18next** - 国际化框架
- **react-i18next** - React的i18next绑定

### 表单和验证
- **React Hook Form** - 高性能表单库
- **Zod** - TypeScript优先的模式验证

## 📦 安装和运行

### 克隆仓库

```bash
git clone https://github.com/Yixuan-Tao/Yixuan-Tao.github.io.git
cd Yixuan-Tao.github.io
```

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看网站。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录中。

### 预览生产构建

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 📁 项目结构

```
src/
├── components/          # 可重用组件
│   ├── ui/            # UI组件库
│   └── LanguageSwitcher.tsx  # 语言切换组件
├── hooks/             # 自定义React Hooks
├── lib/               # 工具函数
├── locales/           # 国际化翻译文件
│   ├── en.json        # 英文翻译
│   └── zh.json        # 中文翻译
├── sections/          # 页面区块
│   ├── About.tsx      # 关于我
│   ├── BlogPosts.tsx  # 博客文章
│   ├── Contact.tsx    # 联系表单
│   ├── Footer.tsx     # 页脚
│   ├── Hero.tsx       # 英雄区域
│   ├── Navigation.tsx  # 导航栏
│   └── Projects.tsx   # 项目展示
├── App.tsx           # 主应用组件
├── main.tsx          # 应用入口
└── i18n.ts           # 国际化配置
```

## 🎨 页面区块

### 英雄区域
- 个人头像和介绍
- 社交媒体链接
- 行动号召按钮

### 关于我
- 个人背景介绍
- 技能展示
- 统计数据

### 项目展示
- 项目卡片展示
- 项目详情链接
- 技术栈标签

### 博客文章
- 文章列表
- 文章摘要
- 阅读更多链接

### 联系表单
- 联系信息展示
- 表单验证
- 消息提交功能

## 🌐 国际化

项目支持中英文双语切换，翻译文件位于 `src/locales/` 目录：

- `en.json` - 英文翻译
- `zh.json` - 中文翻译

要添加新的翻译文本，请在对应的JSON文件中添加键值对。

## 📱 响应式设计

网站采用移动优先的设计策略，确保在各种设备上都有良好的用户体验：

- 移动设备：单列布局，折叠导航菜单
- 平板设备：优化的网格布局
- 桌面设备：多列布局，完整导航

## 🚀 部署

### GitHub Pages

项目已配置为通过 GitHub Pages 自动部署。每次推送到 `main` 分支时，GitHub Actions 会自动构建和部署网站。

### 手动部署

1. 构建项目：
```bash
npm run build
```

2. 将 `dist` 目录内容部署到你的Web服务器。

## 📞 联系方式

- **邮箱**: taoyixuan0415@outlook.com
- **电话**: +86 17751006875
- **GitHub**: [Yixuan-Tao](https://github.com/Yixuan-Tao)
- **LinkedIn**: [Yixuan Tao](https://www.linkedin.com/in/yixuan-tao-y78tao)

## 📄 许可证

本项目采用 MIT 许可证，详情请参阅 [LICENSE](LICENSE) 文件。

## 🙏 致谢

感谢以下开源项目和工具：
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [i18next](https://www.i18next.com/)

---

© 2026 Yixuan Tao. 保留所有权利。

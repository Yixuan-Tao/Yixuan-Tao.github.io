---
title: 统一企业 Agent 平台
category: AI / Agent
---

# agent-platform —— 统一企业 Agent 平台

将 6 个既有项目（agent、multi、product-py、intern_rag、yfi-mainagent、yfintern）整合为一个统一的多 Agent 平台：

- **接入层**：FastAPI 网关（:8000）+ React/Next.js 前端（:3000），SSE 流式对话
- **编排层**：LangGraph Supervisor + 语义路由 + 反思校验
- **Agent 层**：IT 支持 / 硬件问答 / EMC 对比 / 行业信息采集 四个专家 Agent
- **知识层**：多模态 RAG 独立服务（:8010，来自 intern_rag，ChromaDB）
- **治理层**：审计日志、反馈闭环、Langfuse 追踪（可选）、Ragas 评测

## 目录结构

```text
apps/
  api/       FastAPI 网关
  web/       React 18 + Next.js 14 前端
packages/
  core/        工程底座：配置 / 数据库 / LLM 路由 / 日志 / 统一 schema
  orchestrator/ 编排层：Agent 注册表、语义路由、Supervisor、反思校验
  agents/       四个专家 Agent
  rag/          多模态 RAG 服务（intern_rag）
  tools/        统一工具契约 + MCP + 插件沙箱
  memory/       短/长期记忆 + 反馈学习
deploy/        Docker Compose 一键部署
docs/          架构与 API 文档
```

[English](README.md) | [中文](README.zh-CN.md)

# AI 技能：技术文档

两个 AI Agent 技能——**tech-doc-writer** 和 **tech-doc-reviewer**——将 Claude Code 变成一支专业的技术文档团队。一个负责写，一个负责审，两者遵循同一套标准，确保输出质量始终一致。

## 概述

写出好的技术文档比看起来要难。大多数开发者知道自己想表达什么，却在文档结构、一致性和完整性上举步维艰。这两个技能通过将成熟的文档方法论内嵌到 AI 助手中来解决这个问题。

**tech-doc-writer** 引导 AI 执行结构化的写作流程：识别文档类型，按照模板填充必选章节，应用风格规范，最后在交付前进行自检。**tech-doc-reviewer** 承担互补的审查角色，从五个维度（内容质量、清晰度、准确性、风格规范、无障碍性）评估任意文档，并返回按优先级排序的问题清单及具体修改建议。

两个技能均为 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 设计，存放在本仓库的 `.claude/skills/` 目录中。安装后，当你要求 Claude 编写或审查文档时，它们会自动激活。

## 核心特性

- **模板驱动写作** — 支持六种文档类型（简单 README、复杂 README、架构文档、ADR、开发指南、部署指南），每种类型都有必选章节和统一结构
- **五维审查** — 每次审查从内容质量、清晰度与可读性、准确性与时效性、风格与规范、无障碍性五个维度进行评估
- **分级反馈** — 问题按 MUST FIX（必须修复）、SHOULD FIX（建议修复）、NICE TO HAVE（锦上添花）、QUESTION（待确认）四个等级分类，让你清楚知道优先处理什么
- **自检机制** — Writer 技能在交付前强制执行 10 项检查清单，自动捕获常见错误（如代码块缺少语言标注、标题层级跳级等）
- **零配置** — 将技能文件夹放入 `.claude/skills/` 即可在 Claude Code 中直接使用

## 快速开始

### 前置条件

- 已安装并配置 [Claude Code](https://docs.anthropic.com/en/docs/claude-code)
- 已将本仓库克隆到本地

### 安装技能

将技能目录复制（或创建符号链接）到你项目的 `.claude/skills/` 目录：

```bash
# 在本仓库根目录执行
cp -r skills/tech-doc-writer /your-project/.claude/skills/
cp -r skills/tech-doc-reviewer /your-project/.claude/skills/
```

> **提示：** 如果希望这些技能在所有项目中可用，请将它们复制到 `~/.claude/skills/` 目录。

### 验证安装

启动 Claude Code 会话并要求它编写或审查文档。当你的请求匹配触发短语时，技能会自动激活——例如，"写一个 README" 触发 tech-doc-writer，"审查这份文档" 触发 tech-doc-reviewer。

## 使用方法

### 编写文档

让 Claude Code 创建任意类型的技术文档。明确说明你需要什么：

```text
> /tech-doc-writer

为我的图片压缩库写一个简单 README。
```

Writer 技能将执行以下步骤：

1. 识别文档类型（README、架构文档、ADR、开发指南或部署指南）
2. 使用匹配的模板生成内容，包含所有必选章节
3. 应用标题、代码块、列表和格式相关的风格规范
4. 执行自检，修复问题后交付

### 审查文档

将现有文档交给 Claude Code 审查：

```text
> /tech-doc-reviewer

审查 docs/README.md
```

Reviewer 技能将执行以下步骤：

1. 识别文档类型
2. 从五个审查维度进行全面评估
3. 按严重程度分类每个问题（MUST FIX、SHOULD FIX、NICE TO HAVE、QUESTION）
4. 返回结构化审查报告，包含每个问题的具体修改建议

### 推荐工作流

为获得最佳效果，建议两个技能配合使用：

1. 使用 **tech-doc-writer** 编写文档
2. 使用 **tech-doc-reviewer** 审查输出
3. 根据审查报告修复 MUST FIX 和 SHOULD FIX 项
4. 再次运行 Reviewer 验证修复效果

## 技能一览

| 技能 | 用途 | 文档 | 触发短语 |
|------|------|------|----------|
| **tech-doc-writer** | 创建技术文档 | [SKILL.md](tech-doc-writer/SKILL.md) | "write docs"、"create a README"、"document the architecture"、"write a dev guide" |
| **tech-doc-reviewer** | 审查和审计文档 | [SKILL.md](tech-doc-reviewer/SKILL.md) | "review this doc"、"check this README"、"audit the documentation"、"is this any good" |

## 支持的文档类型

两个技能识别相同的六种文档类型，确保 Writer 的产出与 Reviewer 的审查标准一一对应：

| 文档类型 | 必选章节 |
|----------|----------|
| 简单 README | 标题与描述 → 概述 → 核心特性 → 快速开始 → 使用方法 |
| 复杂 README | 简单 README 全部章节 → 架构说明 → 模块划分 |
| 架构文档 | 概述 → 架构原则 → 系统架构 → 核心组件 → 数据流 |
| 架构决策记录（ADR） | 背景 → 决策 → 影响分析 → 备选方案 |
| 开发指南 | 概述 → 前置条件 → 分步设置 → 验证 |
| 部署指南 | 概述 → 前置条件 → 部署步骤 → 验证 |

## 参与贡献

如需修改技能，编辑对应目录下的 `SKILL.md` 文件即可。修改在下次启动 Claude Code 会话时生效。更新技能时，请确保 frontmatter（`---` 包裹的元数据块）与正文内容保持同步。

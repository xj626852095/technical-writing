[English](README.md) | [中文](README.zh-CN.md)

# AI Skills for Technical Documentation

Two AI agent skills — **tech-doc-writer** and **tech-doc-reviewer** — that turn Claude Code into a disciplined technical documentation team. One writes, the other reviews, and both follow the same standards so the output stays consistent.

## Overview

Creating good technical documentation is harder than it looks. Most developers know what they want to say but struggle with structure, consistency, and completeness. These skills solve that problem by embedding a documentation methodology directly into your AI assistant.

**tech-doc-writer** guides the AI through a structured writing workflow: identify the document type, write from a template with required sections, apply style rules, then self-check before delivering. **tech-doc-reviewer** takes the complementary role, evaluating any document across five dimensions (content quality, clarity, accuracy, style, and accessibility) and returning a prioritized list of issues with specific fixes.

Both skills are designed for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and live in this repository's `.claude/skills/` directory. Once installed, they activate automatically when you ask Claude to write or review documentation.

## Key Features

- **Template-driven writing** — Six document types (simple README, complex README, architecture document, ADR, development guide, deployment guide) each with required sections and a consistent structure
- **Five-dimension review** — Every review evaluates content quality, clarity and readability, accuracy and currency, style and convention, and accessibility
- **Severity-classified feedback** — Issues are sorted into MUST FIX, SHOULD FIX, NICE TO HAVE, and QUESTION categories so you know exactly what to address first
- **Self-check discipline** — The writer skill enforces a 10-point checklist before delivering output, catching common mistakes like missing code block languages or skipped heading levels
- **Zero configuration** — Drop the skill folders into `.claude/skills/` and they work immediately with Claude Code

## Quick Start

### Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed and configured
- This repository cloned to your local machine

### Install the skills

Copy (or symlink) the skill directories into your project's `.claude/skills/` folder:

```bash
# From this repository's root
cp -r skills/tech-doc-writer /your-project/.claude/skills/
cp -r skills/tech-doc-reviewer /your-project/.claude/skills/
```

> **Tip:** If you want these skills available across all projects, copy them to `~/.claude/skills/` instead.

### Verify installation

Start a Claude Code session and ask it to write or review documentation. The skills activate automatically when your request matches their trigger phrases — for example, "write a README" triggers tech-doc-writer, and "review this doc" triggers tech-doc-reviewer.

## Usage

### Write documentation

Ask Claude Code to create any type of technical document. Be specific about what you need:

```text
> /tech-doc-writer

Write a simple README for my image compression library.
```

The writer skill will:

1. Identify the document type (README, architecture doc, ADR, development guide, or deployment guide)
2. Generate content using the matching template with all required sections
3. Apply style rules for headings, code blocks, lists, and formatting
4. Run a self-check and fix any issues before delivering

### Review documentation

Pass an existing document to Claude Code for review:

```text
> /tech-doc-reviewer

Review the README at docs/README.md
```

The reviewer skill will:

1. Classify the document type
2. Evaluate it across all five review dimensions
3. Classify every issue by severity (MUST FIX, SHOULD FIX, NICE TO HAVE, QUESTION)
4. Return a structured report with specific fixes for each issue

### Recommended workflow

For best results, use both skills together:

1. Write the document with **tech-doc-writer**
2. Review the output with **tech-doc-reviewer**
3. Apply the MUST FIX and SHOULD FIX items from the review report
4. Run the reviewer again to verify the fixes

## Skill reference

| Skill | Purpose | Document | Trigger phrases |
|-------|---------|----------|-----------------|
| **tech-doc-writer** | Create technical documentation | [SKILL.md](tech-doc-writer/SKILL.md) | "write docs", "create a README", "document the architecture", "write a dev guide" |
| **tech-doc-reviewer** | Review and audit documentation | [SKILL.md](tech-doc-reviewer/SKILL.md) | "review this doc", "check this README", "audit the documentation", "is this any good" |

## Document types supported

Both skills recognize the same six document types, ensuring that what the writer produces matches what the reviewer expects to evaluate:

| Document type | Required sections |
|---|---|
| Simple README | Title & Description → Overview → Key Features → Quick Start → Usage |
| Complex README | All simple README sections → Architecture → Module Breakdown |
| Architecture Document | Overview → Architecture Principles → System Architecture → Core Components → Data Flow |
| Architecture Decision Record (ADR) | Context → Decision → Consequences → Alternatives Considered |
| Development Guide | Overview → Prerequisites → Step-by-step Setup → Verification |
| Deployment Guide | Overview → Prerequisites → Deployment Steps → Verification |

## Contributing

To modify a skill, edit the corresponding `SKILL.md` file in the skill's directory. Changes take effect the next time Claude Code starts a session. When updating a skill, keep the frontmatter (`---` block) in sync with the content.

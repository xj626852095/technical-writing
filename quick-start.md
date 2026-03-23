# Quick Start Guide

Get your project documented in 5 minutes.

## Essential README Elements

Every README must have these 5 critical sections:

1. **Title & Description** - What is this project?
2. **Quick Start** - How to get it running immediately
3. **Usage** - How to use it
4. **Configuration** - What can be configured
5. **API/Documentation Links** - Where to learn more

## Choose Your Template

```
Is your project multi-module or distributed?
├── No → Use Simple Project Template
│   └── Single codebase, < 5 main files
└── Yes → Use Complex Project Template
    └── Multiple services, modules, or components
```

## Copy & Get Started

### Simple Project

```bash
# Copy the template
cp resources/templates/readme-simple.md your-project/README.md

# Edit the placeholders
# Replace [BRACKETED_TEXT] with your project details
```

### Complex Project

```bash
# Copy the template
cp resources/templates/readme-complex.md your-project/README.md

# Create docs directory structure
mkdir -p your-project/docs/{api,images}

# Copy additional templates as needed
cp resources/templates/*.md your-project/docs/
```

## Diagram Tools Quick Reference

| Tool | Best For | File Format |
|------|----------|-------------|
| **draw.io** | Architecture, deployment, component diagrams | `.drawio` → `.png` |
| **PlantUML** | Data flow, sequence, structural diagrams | `.puml` → `.png` |

**Workflow:**
1. Create diagram in draw.io or PlantUML
2. Export as PNG (max width: 800px)
3. Commit both source (.drawio/.puml) and PNG to your repo
4. Reference in markdown: `![Architecture](docs/images/architecture.png)`

## Next Steps

- Read the [Complete Writing Guide](writing-guide/) for detailed guidelines
- Browse [Examples](examples/) to see standards in action
- Explore [Templates](resources/templates/) for more document types

---

**Need help?** Check the [Writing Guide](writing-guide/) or review the [Examples](examples/).

# Documentation Version Control

Managing documentation versions alongside your code.

## Purpose

Version control for documentation ensures:
- **Accuracy** - Docs match the software version users are running
- **Continuity** - Historical versions remain accessible
- **Clarity** - Users know which docs apply to their version
- **Traceability** - Changes are tracked and attributable
- **Recovery** - Previous versions can be restored if needed

## Version Strategies

### Strategy 1: Single Version (Latest Only)

**Best for:** Libraries with automatic updates, SaaS products

```markdown
## Approach

Keep only the latest version of documentation.
Older versions are removed or archived.

## Pros
- Simple to maintain
- Always up to date
- Lower maintenance cost

## Cons
- Users on older versions lack docs
- Breaking changes confuse users
- Migration guidance limited

## Implementation

Use git branches for development, merge to main:
- main branch → Published documentation
- feature branches → Work in progress
```

### Strategy 2: Versioned Documentation

**Best for:** Frameworks, platforms with LTS versions, enterprise software

```markdown
## Approach

Maintain separate documentation for each supported version.

## Version Support Policy

| Version Type | Support Duration | Examples |
|--------------|------------------|----------|
| Current | Until next major release | v2.x |
| LTS (Long Term Support) | 12-24 months | v1.8 LTS |
| Maintenance | 6 months | v1.7 |
| Deprecated | 3 months (security only) | v1.6 |

## Directory Structure

```
docs/
├── v2.0/           # Current major version
├── v1.8/           # LTS version
├── v1.7/           # Maintenance version
└── latest/         # Symlink to v2.0
```

## Pros
- Users find docs for their version
- Clear migration paths
- Better user experience

## Cons
- Higher maintenance cost
- Content duplication
- Complex navigation
```

### Strategy 3: Semantic Versioning with Docs

**Best for:** Most software projects following SemVer

```markdown
## Approach

Map documentation versions to semantic versions:

- Major versions (X.0.0) get separate docs
- Minor versions (X.Y.0) share docs with notes
- Patch versions (X.Y.Z) don't affect docs

## Example

Code Version | Documentation
-------------|--------------
2.0.0        | v2 (separate)
2.1.0        | v2 (with "New in 2.1" section)
2.1.1        | v2 (unchanged)
1.5.0        | v1 (separate)

## Implementation

- Main branch tracks latest major version
- Release branches track supported versions
- Tags mark specific releases
```

## Branching Strategies

### Git Flow for Documentation

```markdown
## Branch Types

main
  - Production-ready documentation
  - Matches production code

develop
  - Integration branch for features
  - Pre-release documentation

feature/doc-topic
  - New documentation features
  - Branch from develop

release/x.y.z
  - Release preparation
  - Stabilization only

hotfix/doc-fix
  - Urgent documentation fixes
  - Branch from main

## Workflow

1. Create feature branch from develop
2. Write and review documentation
3. Merge to develop
4. Create release branch when ready
5. Finalize on release branch
6. Merge release to main and develop
7. Tag the release
```

### Trunk-Based Development

```markdown
## Approach

All documentation work happens on main branch.
Features are hidden behind feature flags.

## Pros
- Simple workflow
- Always releasable
- Easy to understand

## Cons
- Requires feature flags
- Careful coordination needed
- Harder to do large rewrites

## Best For
- Continuous deployment
- Small teams
- Fast iteration
```

## Changelog Practices

### Why Maintain a Changelog

- Users can see what changed
- Helps with upgrade decisions
- Provides historical context
- Required for semantic versioning

### Changelog Format

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New authentication documentation
- OAuth 2.0 integration guide

### Changed
- Updated API endpoints to v2
- Improved Quick Start section

### Deprecated
- Old authentication methods (remove in v3.0)

### Removed
- Legacy API endpoints (v1)

### Fixed
- Broken link in Configuration section
- Incorrect example in Usage guide

## [2.1.0] - 2026-03-15

### Added
- Pagination guide for API endpoints
- Rate limiting documentation

### Changed
- Updated Node.js version requirement to 18+

## [2.0.0] - 2026-02-01

### Added
- Complete rewrite with new architecture
- Migration guide from v1.x

### Changed
- New URL structure for all endpoints

### Removed
- Deprecated v1 endpoints

## [1.5.0] - 2025-12-01

[...]
```

### Automated Changelogs

```bash
# Using conventional commits
git log --pretty=format:"- %s" $(git describe --tags --abbrev=0)..HEAD

# Generate from commit messages
conventional-changelog -p angular -i CHANGELOG.md -s

# Using release notes generator
gren release
```

## Documentation Deprecation

### When to Deprecate

```markdown
## Deprecation Criteria

Documentation should be deprecated when:
- The feature is removed from the product
- A better alternative exists
- Security vulnerabilities exist
- The approach is no longer recommended

## Deprecation Timeline

1. Announce deprecation (3-6 months before removal)
2. Mark as deprecated in documentation
3. Add migration guide
4. Remove in next major version
```

### Deprecation Notice Template

```markdown
> ⚠️ **Deprecated**
>
> This feature is deprecated and will be removed in version 3.0.
> Use [New Feature](new-feature.md) instead.
>
> **Migration Guide:** See [Migrating from Legacy Auth](migration-auth.md)

## Legacy Authentication (Deprecated)

This authentication method is deprecated. Please migrate to OAuth 2.0.

[... content remains for reference ...]
```

## Version Selection UI

Help users find the right documentation version.

```markdown
## Version Selector Component

```html
<div class="version-selector">
  <label for="version">Select Version:</label>
  <select id="version">
    <option value="latest">v2.1 (Current)</option>
    <option value="2.0">v2.0</option>
    <option value="1.8">v1.8 (LTS)</option>
    <option value="1.7">v1.7 (Maintenance)</option>
  </select>
  <a href="/docs/migration">Migration Guide</a>
</div>
```

## Version Banner

```markdown
## Banner for Older Versions

```html
<div class="version-banner warning">
  You're viewing documentation for v1.8.
  <a href="/docs/latest">View latest documentation (v2.1)</a>
</div>
```

## Banner for Pre-Release

```html
<div class="version-banner info">
  You're viewing pre-release documentation.
  Features may change before release.
</div>
```
```

## Migration Guides

### Writing Migration Guides

```markdown
## Migration Guide Template

# Migrating from v1.x to v2.0

## Overview

Version 2.0 includes breaking changes. This guide helps you migrate.

## What Changed

### Breaking Changes
1. Authentication now uses OAuth 2.0
2. API base URL changed
3. Response format updated

### New Features
- Improved error handling
- Better performance
- Enhanced security

## Migration Steps

### 1. Update Authentication

**Old way:**
\`\`\`javascript
const client = new Client({ apiKey: 'xxx' });
\`\`\`

**New way:**
\`\`\`javascript
const client = new Client({
  clientId: 'xxx',
  clientSecret: 'xxx'
});
\`\`\`

### 2. Update Base URL

**Old:** `https://api.example.com/v1`
**New:** `https://api.example.com/v2`

### 3. Update Response Handling

**Old response:**
\`\`\`json
{
  "data": { ... },
  "success": true
}
\`\`\`

**New response:**
\`\`\`json
{
  "data": { ... }
}
\`\`\`

Success is indicated by HTTP status code instead.

## Rollback Plan

If issues occur:
1. Revert to v1.x client
2. Use old API base URL
3. Contact support for assistance

## Need Help?

- [Troubleshooting](troubleshooting.md)
- [Support](https://example.com/support)
- [Community Forum](https://forum.example.com)
```

## Release Documentation

### Pre-Release Checklist

```markdown
## Documentation Release Checklist

### Content Review
- [ ] All new features documented
- [ ] All breaking changes noted
- [ ] Migration guide completed
- [ ] Screenshots updated
- [ ] Code examples tested
- [ ] Links verified

### Version Updates
- [ ] Version numbers updated
- [ ] Changelog completed
- [ ] Release notes written
- [ ] Deprecated content marked

### Publication
- [ ] Built successfully
- [ ] Deployed to staging
- [ ] Tested on staging
- [ ] Deployed to production
- [ ] Version switcher updated
- [ ] Announcement prepared
```

### Release Notes Template

```markdown
# [Version] Release Notes

## Highlights

[Brief summary of major changes - 2-3 sentences]

## What's New

- [Feature 1] - [Brief description]
- [Feature 2] - [Brief description]
- [Feature 3] - [Brief description]

## Breaking Changes

### [Change 1]
[Explanation of breaking change]
**Impact:** [Who is affected]
**Migration:** [Link or steps]

### [Change 2]
[Explanation of breaking change]
**Impact:** [Who is affected]
**Migration:** [Link or steps]

## Deprecated Features

The following features are deprecated and will be removed in [future version]:
- [Feature 1] - Use [alternative] instead
- [Feature 2] - Use [alternative] instead

## Bug Fixes

- [Bug 1] - [Impact]
- [Bug 2] - [Impact]

## Known Issues

- [Issue 1] - [Workaround]
- [Issue 2] - [Workaround]

## Upgrade Instructions

[Link to migration guide]

## Documentation

- [Full Documentation](https://docs.example.com)
- [API Reference](https://docs.example.com/api)
- [Migration Guide](https://docs.example.com/migration)
```

## Tools

### Version Control Tools

```bash
# Git worktrees for parallel versions
git worktree add ../docs-v1.8 origin/v1.8

# Semantic release
npm install semantic-release -D

# Conventional commits
npm install commitizen -D

# Changelog generation
npm install conventional-changelog-cli -D
```

### Documentation Platforms

| Platform | Versioning Support | Best For |
|----------|-------------------|----------|
| Docusaurus | Built-in versions | React-based docs |
| GitBook | Multiple versions | Team collaboration |
| VuePress | Version branches | Vue ecosystem |
| MkDocs | Versioned builds | Python projects |
| Hugo | Version branches | Static sites |

## Best Practices

```markdown
## Do's and Don'ts

✅ DO
- Tag releases in git
- Write clear commit messages
- Maintain a changelog
- Provide migration guides
- Document breaking changes prominently
- Keep older versions accessible
- Set clear deprecation timelines

❌ DON'T
- Make breaking changes silently
- Delete old documentation without warning
- Mix versions in one document
- Ignore semantic versioning
- Skip the changelog
- Remove migration paths
- Leave deprecated content indefinitely
```

## See Also

- [Documentation Review](08-review-process.md) - Quality assurance
- [Style Guide](07-style-guide.md) - Writing conventions
- [README Documentation](02-readme.md) - Project documentation

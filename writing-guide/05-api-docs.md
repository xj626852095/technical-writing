# API Documentation

Writing clear, complete API documentation.

## Purpose

Good API documentation:
- Reduces support questions
- Accelerates integration
- Reduces integration errors
- Enables independent development

## API Document Structure

```markdown
# API Reference

## Overview
[Brief description of what this API does]

## Authentication
[How to authenticate requests]

## Base URL
```
https://api.example.com/v1
```

## Endpoints
[Detailed endpoint documentation]

## Error Codes
[Common errors and resolutions]

## Rate Limits
[Rate limiting information]
```

## Endpoint Documentation

### Essential Elements

Each endpoint must include:

```markdown
### Create User

Creates a new user account.

**Request:**
```http
POST /api/users
Content-Type: application/json
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User's email address |
| password | string | Yes | Password (min 8 characters) |
| name | string | No | User's display name |

**Response (201 Created):**
```json
{
  "id": "usr_123abc",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Error Responses:**

400 Bad Request
```json
{
  "error": "INVALID_EMAIL",
  "message": "Email address is invalid"
}
```

409 Conflict
```json
{
  "error": "USER_EXISTS",
  "message": "A user with this email already exists"
}
```

**Example:**
```bash
curl -X POST https://api.example.com/v1/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }'
```
```

## Request/Response Documentation

### ✅ Good: Complete Examples

```markdown
**Request:**
```http
GET /api/users?page=1&limit=10
Authorization: Bearer {token}
```

**Response:**
```json
{
  "data": [
    {
      "id": "usr_001",
      "name": "Alice",
      "email": "alice@example.com"
    },
    {
      "id": "usr_002",
      "name": "Bob",
      "email": "bob@example.com"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```
```

### ❌ Bad: Incomplete Examples

```markdown
**Request:**
GET /api/users

**Response:**
Returns a list of users with pagination info.
```

## Error Documentation

Document common errors clearly:

```markdown
## Error Codes

| Code | Status | Description | Resolution |
|------|--------|-------------|------------|
| INVALID_TOKEN | 401 | JWT token is invalid or expired | Refresh your access token |
| MISSING_SCOPE | 403 | Token lacks required scope | Request additional scope |
| NOT_FOUND | 404 | Resource doesn't exist | Verify the resource ID |
| RATE_LIMITED | 429 | Too many requests | Wait and retry |
| SERVER_ERROR | 500 | Internal server error | Contact support |

## Error Response Format

All errors follow this structure:
```json
{
  "error": "ERROR_CODE",
  "message": "Human-readable description",
  "details": {
    "field": "email",
    "reason": "already_exists"
  }
}
```
```

## Authentication Section

```markdown
## Authentication

This API uses Bearer token authentication.

### Getting a Token

```bash
curl -X POST https://api.example.com/v1/auth/token \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_SECRET"
```

### Using the Token

Include the token in the Authorization header:
```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Token Expiration

Access tokens expire after 1 hour. Refresh tokens expire after 30 days.
```

## Rate Limiting

```markdown
## Rate Limits

| Tier | Requests | Time Window |
|------|----------|-------------|
| Free | 100 | 1 hour |
| Pro | 1,000 | 1 hour |
| Enterprise | Unlimited | - |

Rate limit headers are included in every response:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642234567
```

When rate limited:
```json
{
  "error": "RATE_LIMITED",
  "retryAfter": 3600
}
```
```

## Code Examples

Provide examples in multiple languages:

```markdown
## Code Examples

### JavaScript
```javascript
const client = require('api-client');

const result = await client.users.create({
  email: 'user@example.com',
  password: 'securepassword',
  name: 'John Doe'
});
```

### Python
```python
import api_client

result = api_client.users.create(
    email='user@example.com',
    password='securepassword',
    name='John Doe'
)
```

### cURL
```bash
curl -X POST https://api.example.com/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }'
```
```

## See Also

- [Creating Diagrams](06-diagrams.md) - Sequence diagrams for API flows
- [Style Guide](07-style-guide.md) - Writing conventions
- [Complex Project Example](../examples/complex-project/docs/api/)

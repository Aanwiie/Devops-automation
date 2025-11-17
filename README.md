# MCP Hub Prototype (Real Command Runner)

This prototype runs real shell commands inside the agent container using `child_process.spawn`.
Be careful what commands you enqueue — they run inside the container environment.

## Quick start

1. Build and start:
```
docker-compose up --build
```

2. Open dashboard: http://localhost:3000/

3. Trigger builds via dashboard or POST /trigger:
```
POST /trigger
Content-Type: application/json
{
  "name": "demo-build",
  "repo": "https://example.com/repo.git",
  "commit": "abcdef",
  "commands": ["echo hello", "node -v"]
}
```

## Notes
- Commands run inside the `agent` Docker container (based on `node:18-alpine`).
- If you need additional build tools (e.g., python, docker-cli), modify the Dockerfile.

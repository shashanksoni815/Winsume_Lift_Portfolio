# Docker deployment (VPS + Nginx)

## Prerequisites

- Docker + Docker Compose v2
- DNS `winsumelift.com` and `www.winsumelift.com` → your VPS public IP
- MongoDB Atlas (or other) reachable from the VPS

## Quick start

```bash
cd Winsume_Lift_Portfolio
cp .env.example .env
# Edit .env — set MONGODB_URI, JWT_SECRET, JWT_REFRESH_SECRET

docker compose up --build
```

- Site: `http://winsumelift.com` (port **80**)
- API: `http://winsumelift.com/api/...`
- Uploads: `http://winsumelift.com/uploads/...`
- Health: `http://winsumelift.com/health`

## Architecture

| Service   | Role |
|-----------|------|
| `nginx`   | Public reverse proxy (`/` → frontend, `/api` + `/uploads` → backend) |
| `frontend`| `nginx:alpine` serving Vite `dist` (internal) |
| `backend` | Express on `:5000` (internal) |

Frontend is built with `VITE_API_URL=/api` and `REACT_APP_API_URL=/api` so the browser calls same-origin `/api`.

## Updates (git pull)

```bash
git pull
docker compose up --build -d
```

Uploaded files persist in the `backend_uploads` volume.

## HTTPS (later)

1. Obtain certificates (e.g. Certbot / Let’s Encrypt).
2. Add a `server { listen 443 ssl http2; ... }` block in `nginx/nginx.conf`.
3. Expose `443:443` in `docker-compose.yml` and mount certs into the nginx container.

## Local smoke test (no domain)

Add to your hosts file: `127.0.0.1 winsumelift.com` then open `http://winsumelift.com`.

Or temporarily change `server_name` in `nginx/nginx.conf` to `_` for any hostname (dev only).

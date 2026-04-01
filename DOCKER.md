# Docker deployment (VPS + Nginx)

## Prerequisites

- Docker + Docker Compose **v2** (`docker compose`, not only legacy `docker-compose`)
- DNS `winsumelift.com` and `www.winsumelift.com` → your VPS public IP (optional for IP-only tests)

## Why “Can’t find docker-compose.yml”?

You must run commands **inside the project folder** (where `docker-compose.yml` lives), not in `/root` after SSH. Clone the repo first, then `cd` into it.

## Quick start (VPS Ubuntu)

```bash
# 1) Install Docker (once per server)
apt update && apt install -y ca-certificates curl
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${VERSION_CODENAME:-jammy}") stable" > /etc/apt/sources.list.d/docker.list
apt update && apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 2) Get code (replace with your Git URL)
cd /opt
git clone https://github.com/YOUR_USER/YOUR_REPO.git winsume
cd winsume/Winsume_Lift_Portfolio   # or cd winsume if compose is at repo root

# 3) Start (Mongo runs inside Docker; no .env required for first run)
docker compose up --build -d
```

Optional: create `.env` in the **same folder as** `docker-compose.yml` to set `MONGODB_URI` (Atlas), `JWT_SECRET`, `JWT_REFRESH_SECRET` — Compose reads it for variable substitution. **Change default JWT strings before real production.**

## Quick start (local / copy-paste)

```bash
cd path/to/Winsume_Lift_Portfolio
docker compose up --build -d
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

## HTTPS / Let’s Encrypt (Docker uses port 80)

**Problem:** `certbot --nginx` installs **host** Nginx and tries to bind **:80**, but your site is already on **:80** from the **Docker** Nginx container → `Address already in use`.

**Fix:** Get certificates with **standalone** (brief downtime), then run the stack with the **SSL overlay** that mounts certs into **Docker** Nginx.

### 1) Stop site + free port 80

```bash
cd ~/Winsume_Lift_Portfolio
docker-compose stop nginx
```

(Optional) Disable host Nginx so it never fights Docker again:

```bash
systemctl disable nginx --now 2>/dev/null || true
```

### 2) Issue certificate (standalone — Certbot uses :80 for a minute)

```bash
certbot certonly --standalone -d winsumelift.com -d www.winsumelift.com
```

### 3) Start stack with SSL

`docker-compose.yml` in this repo includes **HTTPS** (mounts `nginx/nginx.ssl.conf` + `/etc/letsencrypt`). After `git pull`:

```bash
cd ~/Winsume_Lift_Portfolio
docker-compose up --build -d
```

Open **https://winsumelift.com**. HTTP **:80** redirects to HTTPS (except `/.well-known/acme-challenge/` for renewals).

Avoid **`docker-compose -f docker-compose.yml -f docker-compose.ssl.yml`** on **docker-compose 1.29** + new Docker (can cause `KeyError: 'ContainerConfig'`). Use a **single** `docker-compose.yml` only.

### `KeyError: 'ContainerConfig'`

If you still see this when **recreating** containers: install **`docker-compose-plugin`** from Docker’s official apt repo, then use **`docker compose`** (space, v2), or run `docker-compose down` and `docker-compose up --build -d` once.

### 4) Renewal (cron example — short downtime)

```bash
0 4 * * * cd /root/Winsume_Lift_Portfolio && docker-compose stop nginx && certbot renew --standalone --non-interactive && docker-compose start nginx
```

(Adjust path to match your server.)

### HTTP-only mode (no TLS yet)

Edit `docker-compose.yml`: remove nginx line **`443:443`** and the **three** `volumes` under `nginx`, then `docker-compose up --build -d` (uses default HTTP config from the image).

## Local smoke test (no domain)

Add to your hosts file: `127.0.0.1 winsumelift.com` then open `http://winsumelift.com`.

Or temporarily change `server_name` in `nginx/nginx.conf` to `_` for any hostname (dev only).

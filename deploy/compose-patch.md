# prijsprofeet docker-compose change

Add one volume to the `prijsprofeet-nginx` service in
`/opt/prijsprofeet/docker-compose.yml` so the nginx container can serve
TARIDE static files alongside prijsprofeet.

```diff
   prijsprofeet-nginx:
     image: nginx:alpine
     volumes:
       - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
       - ./nginx/ssl:/etc/nginx/ssl:ro
       - ./nginx/www:/var/www/html:ro
       - /etc/letsencrypt:/etc/letsencrypt:ro
+      - /srv/taride:/var/www/taride:ro
```

After editing:

```
cd /opt/prijsprofeet
docker compose up -d prijsprofeet-nginx
```

The container restarts with the new mount visible. Existing prijsprofeet
serving is unaffected because the mount is additive.

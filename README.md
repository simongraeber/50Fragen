# 50Fragen
A quiz game in the making.

Try it on the [Dev server](https://dev.50fragen.com)

## Run on you own server
You need docker and docker-compose installed on your server.

See [docker.com](https://docs.docker.com/engine/install/ubuntu/) for installation instructions.
Here is a quick guide for Ubuntu 24.04:
```bash
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
Test the installation:
```bash
sudo docker run hello-world
```
Now you just need the docker-compose.yml file from this repository.
```bash
curl -O https://raw.githubusercontent.com/simongraeber/50Fragen/refs/heads/main/docker-compose.yml
sudo docker compose up -d
```
call the server in your browser: http://your-server-ip:8080

#### Optional: Add a reverse proxy and SSL
If you want to run the server on port 80, you can use a reverse proxy like nginx.
```bash
sudo apt install nginx
sudo apt install certbot python3-certbot-nginx
```

```
sudo certbot --nginx -d dev.50fragen.com # Change this to your domain
```
Create a new file in /etc/nginx/sites-available/50fragen.conf with the following content:
```nginx
server {
    listen 80;
    server_name dev.50fragen.com; # Change this to your domain

    location / {
        proxy_pass http://127.0.0.1:8080/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Host $host;
    }
}
```
and enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/50fragen.conf /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```
Now you can access the server via https://dev.50fragen.com or your domain.

## Development

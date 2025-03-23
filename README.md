# 50Fragen
A service based quiz game.
Read more and try it at [50Fragen.com](https://50fragen.com).

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
allow for larger file uploads: `/etc/nginx/nginx.conf`
```nginx
...
http {
    ...
    client_max_body_size 50M;
    ...
}
```
and enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/50fragen.conf /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```
Now you can access the server via https://dev.50fragen.com or your domain.

## Development
run docker-compose with the development file:
```bash
docker-compose -f docker-compose.yml up -d
```

## Run servies individually
You need a postgres database running
```bash
docker run --name pgdev \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=test \
  -e POSTGRES_DB=quiz \
  -p 5432:5432 \
  -d postgres
 ````
then you can run the services individually:
```bash
cd eureka
mvn spring-boot:run
```
```bash
cd quiz-database
mvn spring-boot:run
```
```bash
cd quiz-session
npm install
npm run build
npm run start
```
```bash
cd frontend
mvn spring-boot:run
```
#### For the AI-Quiz
You need to set a [Open AI API key](https://platform.openai.com/account/api-keys)
```bash
export OPENAI_API_KEY="your_api_key_here"
```
Then you can run the AI-Quiz service:
```bash
cd ai-quiz
npm install
npm run build
npm run start
```

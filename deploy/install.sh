#!/bin/bash
set -e

# Variables
DOMAIN="999leads.com"
IP="153.92.208.206"
APP_DIR="/var/www/app"

# Update system
echo "Updating system..."
apt-get update && apt-get upgrade -y

# Install dependencies
echo "Installing dependencies..."
apt-get install -y \
  curl \
  git \
  nginx \
  certbot \
  python3-certbot-nginx \
  nodejs \
  npm \
  build-essential

# Configure firewall
echo "Configuring firewall..."
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable

# Setup project
echo "Setting up project..."
mkdir -p $APP_DIR
cd $APP_DIR

# Install project
echo "Installing project..."
npm install --production

# Build project
echo "Building project..."
npm run build

# Configure Nginx
echo "Configuring Nginx..."
cat > /etc/nginx/sites-available/app <<EOL
server {
    listen 80;
    server_name $DOMAIN $IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

ln -sf /etc/nginx/sites-available/app /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Setup HTTPS
echo "Setting up HTTPS..."
certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN

# Configure systemd service
echo "Configuring systemd service..."
cat > /etc/systemd/system/app.service <<EOL
[Unit]
Description=App Service
After=network.target

[Service]
User=root
WorkingDirectory=$APP_DIR
ExecStart=/usr/bin/node $APP_DIR/dist/main.js
Restart=always

[Install]
WantedBy=multi-user.target
EOL

systemctl daemon-reload
systemctl enable app
systemctl start app

# Restart Nginx
echo "Restarting Nginx..."
systemctl restart nginx

# Run tests
echo "Running tests..."
npm run test

echo "Installation complete! Visit https://$DOMAIN"

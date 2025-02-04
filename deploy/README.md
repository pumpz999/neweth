# Single Command Deployment

## Features
- Fully automated installation
- HTTPS setup with Let's Encrypt
- Firewall configuration
- Systemd service setup
- Automated testing
- Blockchain integration
- Admin fee management

## Deployment Instructions

1. SSH into your Hostinger VPS:
   ```bash
   ssh root@153.92.208.206
   ```

2. Navigate to root directory:
   ```bash
   cd /
   ```

3. Create deployment directory:
   ```bash
   mkdir -p /deploy
   cd /deploy
   ```

4. Copy deployment files:
   ```bash
   scp -r ./deploy/* root@153.92.208.206:/deploy
   ```

5. Make installer executable:
   ```bash
   chmod +x install.sh
   ```

6. Run the installer:
   ```bash
   sudo ./install.sh
   ```

7. Access the application:
   - Main site: https://999leads.com
   - Admin panel: https://999leads.com/admin

## Admin Panel Features

### Fee Management
- Set trading fees for ETH/BNB chains
- Configure escrow release conditions
- Adjust marketplace fees
- Manage service charges

### Transaction Monitoring
- View all P2P trades
- Monitor escrow status
- Track fee collection

### Security Settings
- Configure encryption
- Manage admin privileges
- Set up 2FA

## Troubleshooting
- Check application status:
  ```bash
  systemctl status app
  ```
- View logs:
  ```bash
  journalctl -u app.service
  ```
- Check Nginx status:
  ```bash
  systemctl status nginx
  ```

## Maintenance
- Update application:
  ```bash
  cd /var/www/app && git pull && npm install && npm run build
  ```
- Renew SSL certificate:
  ```bash
  certbot renew
  ```

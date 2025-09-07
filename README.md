# DSA Websheet App

A full-stack MERN (MongoDB, Express, React, Node.js) application for tracking and practicing Data Structures & Algorithms (DSA) problems.

## Features

- User authentication (JWT)
- DSA sheet with chapters, topics, and problems
- Progress tracking for each problem
- Responsive Material-UI frontend
- RESTful API backend
- Error handling with toasts
- Static frontend build served by backend

## Folder Structure

```
backend/      # Express API, MongoDB models, seed scripts
frontend/     # React app, Material-UI, API integration
```

## Getting Started (Local Development)

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB

### 1. Clone the repository

```
git clone https://github.com/<your-username>/dsa_websheet.git
cd dsa_websheet_app
```

### 2. Install dependencies

```
cd backend
npm install
cd ../frontend
npm install
```

### 3. Set up environment variables

- Copy `.env.example` to `.env` in both `backend` and `frontend` folders.
- Fill in values (e.g., MongoDB URI, JWT secret, API URL).

### 4. Seed the database (optional)

```
cd backend
node seed.js
```

### 5. Run the app

- Backend:
  ```
  npm run dev
  ```
- Frontend:
  ```
  npm start
  ```

## Production Deployment (AWS EC2)

### 1. Build the frontend

```
cd frontend
npm run build
```

### 2. Serve frontend from backend

- Already configured in `backend/app.js` to serve `frontend/build`.

### 3. Launch EC2 instance

- Ubuntu recommended
- Open ports 22 (SSH), 80 (HTTP), 443 (HTTPS), 5000 (API)

### 4. SSH into EC2

```
ssh -i <your-key.pem> ubuntu@<your-ec2-ip>
```

### 5. Install Node.js & MongoDB

```
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y mongodb
```

### 6. Clone repo & install dependencies

```
git clone https://github.com/<your-username>/dsa_websheet.git
cd dsa_websheet_app/backend
npm install
cd ../frontend
npm install
npm run build
```

### 7. Set up .env files

- Use `nano .env` or `vi .env` to create and edit environment variables.

### 8. Start MongoDB

```
sudo service mongodb start
```

### 9. Start backend server

```
cd backend
npm start
```

- Or use PM2 for process management:
  ```
  npm install -g pm2
  pm2 start app.js
  pm2 save
  pm2 startup
  ```

### 10. (Optional) Set up Nginx & HTTPS

- Install Nginx:
  ```
  sudo apt-get install nginx
  ```
- Configure reverse proxy to backend (see deployment instructions above)
- Use Certbot for SSL (requires domain name)

## API Endpoints

- `/api/users/register` - Register user
- `/api/users/login` - Login user
- `/api/dsa` - Get DSA sheet
- `/api/dsa/progress` - Get/set progress

## Environment Variables

- `backend/.env`: `MONGO_URI`, `JWT_SECRET`, etc.
- `frontend/.env`: `REACT_APP_API_URL`

## License

MIT

## Author

lovin123

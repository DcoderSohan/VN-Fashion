# How to Start the Backend Server

## The Error
`ERR_CONNECTION_REFUSED` means the backend server is not running. The frontend and admin are trying to connect to `http://localhost:5000` but nothing is listening.

## Solution

### 1. Start the Backend Server

Open a terminal in the `backend` folder and run:

```bash
cd backend
npm run dev
```

Or if you don't have nodemon:
```bash
cd backend
node server.js
```

### 2. Verify Server is Running

You should see:
```
✅ MongoDB Connected: ...
📊 Database: vnfashion
🚀 Server is running on port 5000
📦 Environment: development
```

### 3. Test the API

Open your browser and go to:
```
http://localhost:5000
```

You should see: "API is running"

### 4. Check MongoDB

Make sure MongoDB is running on your system. The server will use:
- Default: `mongodb://localhost:27017/vnfashion`
- Or set `MONGO_URI` in `.env` file

### 5. Environment Variables (Optional)

Create a `.env` file in the `backend` folder:

```env
JWT_SECRET=your-secret-key-change-in-production
MONGO_URI=mongodb://localhost:27017/vnfashion
PORT=5000
NODE_ENV=development
```

**Note:** The server now has fallback values, so it will work without `.env` file for development.

## All API Endpoints Should Work

Once the server is running, all these endpoints will be available:

### Public Endpoints (No Auth Required):
- `GET /api/content/public/about`
- `GET /api/content/public/gallery`
- `GET /api/content/public/services`
- `GET /api/content/public/categories`
- `GET /api/content/public/bookings` (POST for creating)
- `GET /api/content/public/contacts` (POST for creating)
- `GET /api/content/public/settings`

### Admin Endpoints (Auth Required):
- `GET /api/content/gallery`
- `GET /api/content/bookings`
- `GET /api/content/contacts`
- `GET /api/admin/profile`

## Quick Fix

1. **Open a new terminal**
2. **Navigate to backend folder:**
   ```bash
   cd "D:\Project\VN Fashion\backend"
   ```
3. **Start the server:**
   ```bash
   npm run dev
   ```
4. **Keep this terminal open** - the server must keep running
5. **Refresh your frontend/admin pages** - they should now connect!

## Troubleshooting

- **Port 5000 already in use?** Change `PORT` in `.env` or `backend/config/constants.js`
- **MongoDB not running?** Start MongoDB service or use MongoDB Atlas
- **Still getting errors?** Check the terminal where the server is running for error messages


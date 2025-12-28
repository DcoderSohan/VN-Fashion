# 🚆 Railway Deployment Guide for VN Fashion

## 📁 Project Structure

```
VN Fashion/
├── backend/        ← Express server
│   ├── server.js
│   ├── package.json
│
├── frontend/       ← User frontend (React + Vite)
│   ├── dist/       ← Build output
│   ├── package.json
│
├── admin/          ← Admin frontend (React + Vite)
│   ├── dist/       ← Build output
│   ├── package.json
│
└── README.md
```

## 🎯 Deployment URLs

- **Client App**: `https://your-app.up.railway.app/`
- **Admin Panel**: `https://your-app.up.railway.app/admin`
- **API**: `https://your-app.up.railway.app/api/*`

## 🔹 STEP 1: Build Both Frontends

### 1️⃣ Build Frontend (Client)
```bash
cd frontend
npm install
npm run build
```
This creates: `frontend/dist/`

### 2️⃣ Build Admin
```bash
cd ../admin
npm install
npm run build
```
This creates: `admin/dist/`

## 🔹 STEP 2: Verify Backend Configuration

The backend (`backend/server.js`) is already configured to:
- ✅ Serve frontend from `frontend/dist/` at root `/`
- ✅ Serve admin from `admin/dist/` at `/admin`
- ✅ Handle SPA routing for both apps
- ✅ Serve API routes at `/api/*`

## 🔹 STEP 3: Update API URLs (Already Done ✅)

Both frontends are configured to:
- Use relative paths (`/api`) in production
- Use `http://localhost:5000/api` in development

No changes needed!

## 🔹 STEP 4: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (username/password)
4. Network Access → Add IP Address → `0.0.0.0/0` (allow all)
5. Copy connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/vnfashion?retryWrites=true&w=majority
   ```

## 🔹 STEP 5: Commit Build Folders to GitHub

**Important**: The `dist/` folders are currently in `.gitignore`. For Railway deployment, you need to commit them.

### Option A: Temporarily Remove from .gitignore (Recommended)

1. **Frontend**: Comment out `dist` in `frontend/.gitignore`:
   ```
   # dist
   ```

2. **Admin**: Comment out `dist` in `admin/.gitignore`:
   ```
   # dist
   ```

3. **Add and commit**:
   ```bash
   git add frontend/dist admin/dist
   git commit -m "Add build folders for Railway deployment"
   git push origin main
   ```

4. **After deployment**, you can uncomment `dist` in `.gitignore` again.

### Option B: Force Add (Alternative)

```bash
git add -f frontend/dist admin/dist
git commit -m "Add build folders for Railway deployment"
git push origin main
```

**Note**: You'll need to do this every time you rebuild the frontends.

## 🔹 STEP 6: Deploy on Railway 🚆

1. Go to [Railway](https://railway.app)
2. Sign up/Login with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Select your repository
6. Railway will auto-detect Node.js

## 🔹 STEP 7: Configure Railway

### Set Root Directory ⚠️ IMPORTANT
- Railway → Settings → **Root Directory**: Leave EMPTY (or set to `.`)
- **DO NOT** set it to `backend` - this prevents Railway from accessing `frontend/` and `admin/` folders
- Railway needs access to the project root to find the `frontend/dist` and `admin/dist` folders

### Set Start Command
- Railway → Settings → Deploy
- **Start Command**: `npm start` (or leave empty for auto-detection)
- The root `package.json` now has a start script that runs the backend server
- Railway will automatically run `npm start` from the project root

### Port Configuration
When Railway asks **"Enter the port your app is listening on"**:

**Option 1 (Recommended)**: Leave it blank or use Railway's auto-detected port
- Railway usually auto-detects the port from your `package.json` start script
- Your app uses `process.env.PORT || 5000`, so it will automatically use Railway's PORT

**Option 2**: Enter the PORT from environment variables
- Check Railway → Variables → Look for `PORT` variable
- If PORT is set (e.g., `5000`), enter that number
- If not set, Railway will auto-assign one

**Option 3**: Enter `5000` explicitly
- You can set `PORT=5000` in environment variables and enter `5000` here
- But Railway's auto-detection usually works fine

**Note**: Your app code already handles this with `process.env.PORT || 5000`, so Railway's automatic PORT assignment will work.

### Add Environment Variables
Railway → Variables → Add:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/vnfashion?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

**Note**: Railway automatically provides `PORT`, but you can set it explicitly. If you set `PORT=5000`, then enter `5000` when Railway asks for the port.

## 🔹 STEP 8: Build Configuration

### ⚠️ Important: Build Locally (Recommended)

**The build script has been removed** because:
- Railway's build context doesn't allow accessing `../frontend` from the backend directory
- Building locally is faster and more reliable
- Avoids build timeouts on Railway

### ✅ Solution: Build and Commit Locally

1. **Build frontend locally**:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Build admin locally**:
   ```bash
   cd ../admin
   npm install
   npm run build
   ```

3. **Commit the dist folders**:
   ```bash
   git add frontend/dist admin/dist
   git commit -m "Add build files for Railway deployment"
   git push origin main
   ```

### 🔧 Configure Railway Commands ⚠️ CRITICAL

**Install Command** (for dependencies):
- Railway → Settings → Deploy
- **Install Command**: Leave EMPTY (auto-detection) OR set to `npm install`
- The root `package.json` has a `postinstall` script that automatically installs backend dependencies
- When Railway runs `npm install`, it will:
  1. Install root dependencies (none, so it completes quickly)
  2. Run `postinstall` script → `cd backend && npm install` → Installs all backend dependencies ✅

**Alternative (if postinstall doesn't work):**
- **Install Command**: `cd backend && npm install`
- This directly installs backend dependencies

**Build Command**:
- Railway → Settings → Deploy
- **Build Command**: Leave EMPTY (we build locally and commit dist folders)

**Start Command**:
- Railway → Settings → Deploy
- **Start Command**: `npm start` (or leave empty - it will run `cd backend && npm start` from root package.json)

**Complete Railway Configuration Summary:**
1. **Root Directory**: Empty (project root)
2. **Install Command**: Empty (auto) OR `npm install` - postinstall script handles backend deps
3. **Build Command**: Empty
4. **Start Command**: `npm start` (or empty)

**How it works:**
- Railway runs `npm install` from root → triggers `postinstall` script
- `postinstall` runs `cd backend && npm install` → installs all backend dependencies ✅
- Then Railway runs `npm start` → runs `cd backend && npm start` → starts server ✅

This ensures:
- ✅ Railway installs backend dependencies automatically via postinstall
- ✅ Railway can access frontend/dist and admin/dist folders
- ✅ Railway starts the server from backend directory

## 🔹 STEP 9: Deploy

1. Click **"Deploy"** or **"Redeploy"**
2. Wait for deployment to complete
3. Railway will provide a URL like: `https://your-app.up.railway.app`

## 🔗 How to Get Your Railway Project URL

After your deployment is complete, follow these steps to get your project URL:

### Method 1: From the Service Dashboard (Easiest)

1. **Go to Railway Dashboard**: [https://railway.app](https://railway.app)
2. **Click on your project** (VN Fashion or your project name)
3. **Click on your service** (usually named "backend" or your repo name)
4. **Click on the "Networking" tab** (in the right sidebar)
5. **Look for "Public Networking" section**
6. **If you see "Generate Domain" button** (with lightning bolt icon):
   - **Click "Generate Domain"** - Railway will create a public URL for you
   - Wait a few seconds for the domain to be generated
   - Your URL will appear, something like: `https://your-app-name.up.railway.app`
7. **If a domain already exists**, you'll see it listed under "Public Networking"
8. **Copy the URL** - this is your project's public URL!

**Important Notes:**
- The domain under "Private Networking" (`vn-fashion.railway.internal`) is **NOT** your public URL
- You **MUST** click "Generate Domain" to get a public URL
- The public URL format is: `https://[random-name].up.railway.app`

### Method 2: From the Deployments Tab

1. **Go to your service** in Railway
2. **Click on "Deployments" tab**
3. **Click on the latest deployment** (the most recent one)
4. **Look at the deployment logs** - Railway often shows the URL in the logs
5. Or check the **"Domains"** section in the deployment details

### Method 3: Custom Domain (Optional)

1. **In Settings → Domains**
2. **Click "Custom Domain"** if you want to use your own domain
3. **Add your domain** (e.g., `yourdomain.com`)
4. **Follow Railway's DNS instructions** to point your domain to Railway

### 📍 Quick Access Tips

- **Bookmark your Railway dashboard** for easy access
- **The URL format is always**: `https://[random-name].up.railway.app`
- **Your URL is permanent** unless you delete the service
- **You can regenerate the domain** in Settings if needed

## 🔹 STEP 10: Test Your Deployment

Now that you have your Railway URL, test each part of your application:

### ✅ Step 1: Test Client App (Frontend)
1. **Open your browser**
2. **Visit**: `https://f2j8a6jl.up.railway.app/` (or your Railway URL)
3. **Expected Result**: 
   - Your frontend should load
   - You should see your VN Fashion website
   - Navigation should work

### ✅ Step 2: Test Admin Panel
1. **Visit**: `https://f2j8a6jl.up.railway.app/admin`
2. **Expected Result**:
   - Admin login page should load
   - You should be able to access the admin panel

### ✅ Step 3: Test API Endpoints
1. **Test Public API**:
   - Visit: `https://f2j8a6jl.up.railway.app/api/content/public/settings`
   - **Expected Result**: Should return JSON data (settings)
   
2. **Test API Health**:
   - Visit: `https://f2j8a6jl.up.railway.app/api/content/public/settings`
   - Should see JSON response, not HTML error page

### ✅ Step 4: Test SPA Routing (Important!)
1. **Navigate to a route** (e.g., `/about`, `/contact`)
2. **Refresh the page** (F5 or Ctrl+R)
3. **Expected Result**: Page should still load (not show 404)
   - This confirms SPA routing is working correctly

### ✅ Step 5: Test Image Loading
1. **Check if images load** from Cloudinary
2. **Expected Result**: Images should display correctly

### 🎯 Your Railway URLs:
- **Frontend**: `https://f2j8a6jl.up.railway.app/`
- **Admin Panel**: `https://f2j8a6jl.up.railway.app/admin`
- **API Base**: `https://f2j8a6jl.up.railway.app/api`

## ✅ Features Working

- ✅ Client app at root `/`
- ✅ Admin panel at `/admin`
- ✅ API routes at `/api/*`
- ✅ SPA routing (refresh works on all routes)
- ✅ Cloudinary image uploads
- ✅ MongoDB connection
- ✅ Authentication

## 🚨 Common Issues & Fixes

### ⚠️ npm warn config production Use `--omit=dev` instead
**Status**: This is a **harmless deprecation warning** from npm.
- Railway automatically uses `npm install --production` which triggers this warning
- The app works perfectly fine despite this warning
- This is just npm informing that `--production` is deprecated in favor of `--omit=dev`
- **No action needed** - you can safely ignore this warning

### ❌ Admin page 404 on refresh
**Fixed**: The server handles `/admin/*` routes correctly.

### ❌ Client build not found
**Fix**: Make sure `frontend/dist/` is committed to GitHub.

### ❌ Admin build not found
**Fix**: Make sure `admin/dist/` is committed to GitHub.

### ❌ API routes return 404
**Fix**: Check that routes are registered BEFORE static file serving in `server.js`.

### ❌ CORS errors
**Not needed**: Everything is on the same domain in production.

### ❌ MongoDB connection failed
**Fix**: 
- Check MongoDB Atlas network access (0.0.0.0/0)
- Verify MONGO_URI in Railway variables
- Check username/password are correct

### ❌ Cloudinary upload fails
**Fix**: Verify all three Cloudinary environment variables are set in Railway.

## 📝 Notes

- The app uses **Vite** (not Create React App), so build output is in `dist/` not `build/`
- Both frontends are configured to use relative API paths in production
- All images are stored in Cloudinary (no local file storage)
- The backend serves both frontends only in production mode

## 🎉 Success!

Your app should now be live on Railway! 🚀


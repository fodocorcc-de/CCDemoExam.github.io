# 🚀 Deployment Guide - Open Exam Application

This guide will help you deploy the Open Exam Application to GitHub Pages.

## 📋 Prerequisites

- A GitHub account
- Git installed on your computer
- Basic knowledge of Git commands

## 🎯 Deployment Methods

### Method 1: Direct GitHub Upload (No Git Required)

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name your repository (e.g., `Open-Exam-Application`)
   - Make it **Public**
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Upload files**
   - On your repository page, click "uploading an existing file"
   - Drag and drop all files from this folder
   - Scroll down and click "Commit changes"

3. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Under **Source**, select `main` branch
   - Select `/ (root)` folder
   - Click **Save**
   - Wait 2-3 minutes for deployment

4. **Access your site**
   - Your site will be live at: `https://yourusername.github.io/Open-Exam-Application/`

---

### Method 2: Using Git Command Line

1. **Initialize Git repository** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Open Exam Application v2.0"
   ```

2. **Create repository on GitHub**
   - Go to https://github.com/new
   - Create your repository (don't initialize with any files)

3. **Link and push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/Open-Exam-Application.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Follow steps 3-4 from Method 1

---

### Method 3: Fork and Deploy

1. **Fork this repository** on GitHub
2. **Go to Settings → Pages** in your fork
3. **Select `main` branch** and save
4. **Your site is live!**

---

## 🔧 Configuration

### Custom Domain (Optional)

1. In your repository, go to **Settings → Pages**
2. Under **Custom domain**, enter your domain (e.g., `exam.yourdomain.com`)
3. Create a CNAME record in your domain DNS:
   ```
   Type: CNAME
   Name: exam (or your subdomain)
   Value: yourusername.github.io
   ```

### Update Repository Links

After deployment, update these files with your actual GitHub URLs:

**index.html** (line ~249):
```html
💾 <a href="https://github.com/YOURUSERNAME/Open-Exam-Application">View on GitHub</a>
```

**README.md**:
Update the clone URL with your actual repository URL.

---

## 📁 File Structure for Deployment

All these files are required for GitHub Pages:

```
✅ index.html              # Landing page (entry point)
✅ exam.html               # Main exam application
✅ dashboard.html          # Performance dashboard
✅ dashboard.css           # Dashboard styling
✅ Dashboard.jsx           # Dashboard component
✅ DashboardCards.jsx      # Cards component
✅ DashboardCharts.jsx     # Charts component
✅ mockData.js             # Mock data
✅ useDashboardData.js     # Custom hook
✅ bank/                   # Question banks folder
   ✅ *.json               # All JSON exam files
   ✅ README.md            # Bank documentation
✅ README.md               # Main documentation
✅ CHANGES.md              # Changelog
✅ .gitignore              # Git ignore rules
```

**Not needed for deployment:**
- `NUL` (removed)
- `exam-next.html` (development file)
- `.DS_Store` (macOS metadata)
- Node modules (if any)

---

## ✅ Verify Deployment

1. **Check homepage**: `https://yourusername.github.io/Open-Exam-Application/`
2. **Test exam page**: Click "Launch Exam"
3. **Test dashboard**: Click "View Dashboard"
4. **Test demo exam**: Click "Run Demo Exam"
5. **Test file upload**: Try uploading a JSON file from `bank/` folder

---

## 🐛 Troubleshooting

### Issue: 404 Page Not Found
- **Solution**: Make sure GitHub Pages is enabled with `main` branch
- Wait 2-3 minutes for deployment to complete
- Check that `index.html` exists in the root

### Issue: Styles not loading
- **Solution**: All CSS is embedded or linked relatively, should work fine
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Exam banks not loading
- **Solution**: Use the file upload feature or URL loading
- For default banks, ensure `bank/` folder is uploaded
- Check browser console for errors (F12)

### Issue: Dashboard not working
- **Solution**: Check browser console for React/Babel errors
- Make sure all `.jsx` files are uploaded
- Try the diagnostic test: `dashboard-test.html`

---

## 🔄 Updating Your Deployment

### Using Git:
```bash
git add .
git commit -m "Update: Description of changes"
git push origin main
```

### Using GitHub Web:
1. Go to your repository
2. Click on the file to update
3. Click the pencil icon (Edit)
4. Make changes
5. Commit changes

GitHub Pages will automatically redeploy within 2-3 minutes.

---

## 🌐 Browser Compatibility

The application works on all modern browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Note**: Internet Explorer is not supported.

---

## 📊 Monitoring

### GitHub Pages Status
- Check deployment status: Repository → **Actions** tab
- View live site: Repository → **Settings** → **Pages**

### Analytics (Optional)
You can add Google Analytics or other tracking by adding the tracking code to `index.html`, `exam.html`, and `dashboard.html`.

---

## 🎨 Customization After Deployment

### Change Colors:
Edit the CSS variables in:
- `exam.html` (lines 6-630)
- `dashboard.css`
- `index.html` (style section)

### Add More Exam Banks:
1. Create JSON files following the schema in `bank/README.md`
2. Upload to `bank/` folder
3. Users can load them via file upload or URL

### Modify Features:
All JavaScript is in the HTML files - search for the relevant section and modify.

---

## 🔒 Security Notes

- This is a **client-side only** application
- No data is sent to any server
- Exam results are stored in browser's localStorage/sessionStorage
- Safe to deploy publicly

---

## 📝 License

Make sure to include a LICENSE file if you want to specify usage terms.

---

## 🆘 Support

If you encounter issues:
1. Check the browser console (F12) for errors
2. Verify all files are uploaded correctly
3. Check GitHub Pages deployment logs
4. Open an issue on GitHub

---

## 🎉 Success!

Once deployed, share your exam application:
- `https://yourusername.github.io/Open-Exam-Application/`

Happy examining! 🚀

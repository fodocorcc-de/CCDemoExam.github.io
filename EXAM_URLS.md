# Exam Question Bank URLs

Quick reference for loading exams from URLs.

## 🔗 GitHub Raw URLs (Recommended)

Copy and paste these URLs into the "Load from URL" field in exam.html

### CISSP (Certified Information Systems Security Professional)
```
https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/CISSP1.json
https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/CISSP2.json
https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/CISSP3.json
https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/CISSP4.json
https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/CISSP-AIO1.json
https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/CISSP-NCSA.json
https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/CISSP-Zero-to-Hero.json
```

### CC (Certified in Cybersecurity)
```
https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/CC1.json
https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/CC2.json
```

### PDPA (Personal Data Protection Act)
```
https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/PDPA1.json
```

### Networking
```
https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/basicnetwork.json
```

### Test/Demo Exams
```
https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/test.json
https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/test_json_v2.json
```

---

## 🌐 GitHub Pages URLs (Alternative)

These also work:
```
https://fodocorcc-de.github.io/CCDemoExam.github.io/bank/CISSP1.json
https://fodocorcc-de.github.io/CCDemoExam.github.io/bank/CC1.json
https://fodocorcc-de.github.io/CCDemoExam.github.io/bank/test.json
... (follow same pattern)
```

---

## 📝 How to Use

1. **Open exam.html** in your browser
   - Local: `file:///path/to/exam.html`
   - Online: `https://fodocorcc-de.github.io/CCDemoExam.github.io/exam.html`

2. **Copy one of the URLs above**

3. **Paste into "Load from URL" field**

4. **Click "Load from URL" button**

5. **Configure your exam** (questions, time, etc.)

6. **Click "Start Exam"**

---

## ✅ Quick Test

To verify a URL works:
1. Copy URL
2. Paste in new browser tab
3. Should see JSON code (not HTML page)

---

## 🔧 Creating Your Own Exam URLs

### Option 1: Add to this repository
1. Create new JSON file in `bank/` folder
2. Commit and push to GitHub
3. URL will be:
   ```
   https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/YOUR_FILE.json
   ```

### Option 2: Use another service
- **Pastebin**: Paste JSON → Get raw URL
- **Gist**: Create gist → Click "Raw" → Copy URL
- **Your own server**: Upload JSON → Get direct URL

---

## 🎯 URL Format Rules

✅ **Must be:**
- Public (no login required)
- Direct JSON file (not webpage)
- HTTPS (recommended)
- Accessible from browser

❌ **Cannot be:**
- Local file paths (`file:///...`)
- GitHub repo pages (`/blob/main/...`)
- Password-protected
- Requires special headers

---

## 📚 Example: Share Your Exam

To share an exam with someone:

1. **Send them this:**
   ```
   Exam URL: https://raw.githubusercontent.com/fodocorcc-de/CCDemoExam.github.io/main/bank/CISSP1.json

   Instructions:
   1. Go to: https://fodocorcc-de.github.io/CCDemoExam.github.io/exam.html
   2. Paste the URL above in "Load from URL"
   3. Click "Load from URL"
   4. Start the exam!
   ```

2. **They can take the exam without downloading anything!**

---

**Last Updated:** 2025-10-06
**Repository:** https://github.com/fodocorcc-de/CCDemoExam.github.io

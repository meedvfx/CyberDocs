# 📚 CyberDocs

<p align="center">
  <strong>A quiet place to study the digital world.</strong><br>
  A simple, browser-based library for cybersecurity and technical knowledge.
</p>

<p align="center">
  <a href="https://github.com/meedvfx/CyberDocs/actions/workflows/pages.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/meedvfx/CyberDocs/pages.yml?branch=main&style=flat-square&label=GitHub%20Pages" alt="GitHub Pages deployment status">
  </a>
  <img src="https://img.shields.io/badge/documents-99-2b6cb0?style=flat-square" alt="99 documents">
  <img src="https://img.shields.io/badge/HTML-CSS-JavaScript-172d4b?style=flat-square" alt="HTML CSS JavaScript">
  <img src="https://img.shields.io/badge/Git%20LFS-required-f4b942?style=flat-square" alt="Git LFS required">
</p>

## ✨ About the library

CyberDocs is a curated digital library designed for students, learners, practitioners, and anyone interested in the digital world. It brings together **99 cybersecurity and technical books** in a clean interface that works directly in the browser.

The collection covers topics such as:

- 🔐 Security foundations and cryptography
- 🕸️ Web application security
- 🧪 Penetration testing
- 🌐 Network security
- 🦠 Malware and threats
- 💻 Programming and operating systems
- 🔎 Digital forensics

## 🚀 Features

- 🔍 Search documents by title
- 🗂️ Filter the catalog by category
- ↕️ Sort by number, title, or category
- 📖 Read PDFs in the built-in browser reader
- 🔎 Change PDF zoom and page
- ⬇️ Download any PDF
- 📱 Responsive layout for desktop and mobile
- 🌐 Automatic deployment with GitHub Pages

## 🛠️ Technologies

| Technology | Use |
| --- | --- |
| HTML5 | Page structure and accessible markup |
| CSS3 | Responsive visual design |
| Vanilla JavaScript | Catalog, search, filters, and PDF reader |
| Git LFS | Storage of large PDF files |
| GitHub Actions | Automated GitHub Pages deployment |

## 📁 Project structure

```text
CyberDocs/
├── .github/workflows/pages.yml  # GitHub Pages deployment
├── pdfs/                        # Library documents
├── app.js                       # Catalog and reader behavior
├── catalog.js                   # Document catalog data
├── favicon.svg                  # CyberDocs browser icon
├── index.html                   # Main page
├── styles.css                   # Site styles
└── README.md                    # Project documentation
```

## 💻 Run locally

Because browsers may restrict local PDF loading, use a small local web server instead of opening `index.html` directly.

### With Python

```bash
git clone https://github.com/meedvfx/CyberDocs.git
cd CyberDocs
git lfs pull
python -m http.server 8000
```

Then open <http://localhost:8000>.

### With VS Code

Open the project in VS Code and start any local static server extension, such as **Live Server**.

## 🌍 Deployment

Every push to `main` triggers the workflow in [`.github/workflows/pages.yml`](.github/workflows/pages.yml). The workflow:

1. Checks out the repository with Git LFS files.
2. Verifies that all 99 PDFs are available.
3. Uploads the website to GitHub Pages.
4. Publishes the latest version automatically.

In the repository settings, configure **Pages → Source** to use **GitHub Actions**.

## 👤 About the author

CyberDocs is created and maintained by **Mohamed ZAHZOUH**.

- GitHub: [@meedvfx](https://github.com/meedvfx)
- Project: [github.com/meedvfx/CyberDocs](https://github.com/meedvfx/CyberDocs)

---

<p align="center">
  Made with ❤️ for learning, curiosity, and better security.
</p>

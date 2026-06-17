# IAM Tech Lab

A simple, static website for "IAM Tech Lab," built with plain **HTML, CSS, and JavaScript** only — no frameworks, build tools, or backend required.

## File structure

```
iam-tech-lab/
├── index.html     # Page structure and content
├── style.css      # All styling (colors, layout, responsiveness)
├── script.js      # Interactive features (tip button + form validation)
└── README.md      # This file
```

## Sections included

- **Hero / Homepage** – Welcome banner with the site name, tagline, and two buttons.
- **About** – A short description of IAM Tech Lab plus a few highlight stats.
- **Services** – Four service cards (Web Development, Tech Training, IT Support, Consulting).
- **Contact** – A contact form with name, email, and message fields.

## JavaScript features

1. **"Get a Quick Tech Tip" button** — Clicking it shows a new tech tip each time, cycling through a small list of tips defined in `script.js`.
2. **Contact form validation** — When the form is submitted, JavaScript checks that:
   - Name is not empty
   - Email is not empty and matches a basic email pattern (`something@something.com`)
   - Message is not empty and is at least 10 characters long

   If anything is missing or incorrect, an error message appears under that field. If everything looks good, a "Thanks! Your message has been received." message appears and the form resets. (There's no backend yet, so no data is actually sent or stored.)

## How to view the website

You don't need to install anything:

1. Download/copy the `iam-tech-lab` folder to your computer.
2. Double-click `index.html`, or right-click it and choose "Open with" your browser.

If you're using a code editor like VS Code, the "Live Server" extension also works well and will auto-refresh the page as you edit files.

## Design notes

- Colors and fonts are defined as CSS variables at the top of `style.css` (look for `:root`), so you can change the site's whole color scheme by editing a few lines.
- The layout uses CSS Flexbox and Grid, and switches to a single-column layout on smaller screens (see the `@media` rules near the bottom of `style.css`) so the site stays usable on phones and tablets.
- Code comments are included throughout `index.html`, `style.css`, and `script.js` to explain what each part does, so it's easy to learn from or modify.

## Possible next steps

This project intentionally avoids React, Vite, npm, a backend, or a database to keep things beginner-friendly. If you want to grow this project later, some natural next steps would be:

- Connect the contact form to a real backend or email service (e.g., Formspree, Netlify Forms, or a custom server) so messages are actually sent somewhere.
- Add more pages (like a blog or portfolio) and link them from the navigation.
- Rebuild the site using a framework like React once you're comfortable with plain HTML/CSS/JS fundamentals.

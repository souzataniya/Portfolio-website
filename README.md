# Taniya Souza

A personal portfolio website for showcasing projects, work experience, skills, and achievements. Built with **Next.js 16**, **React 19**, and **TypeScript**, featuring scroll-driven animations and interactive WebGL effects.

🔗 **Live:** [taniyasouza.vercel.app](https://taniyasouza.vercel.app)

## Features

- Modern, fully responsive single-page design with a mobile navigation overlay
- Scroll-triggered animations and parallax effects powered by GSAP
- Interactive WebGL visuals (Aurora background and Splash Cursor) rendered with OGL
- Animated text reveals via `motion` and a custom `BlurText` component
- Sections for About, Skills, Experience, Achievements, Projects, and Contact
- Downloadable resume and direct email/social links
- SEO-friendly metadata with Open Graph and Twitter card support

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript
- **UI:** React 19
- **Animation:** [GSAP](https://gsap.com/) + [motion](https://motion.dev/)
- **Graphics:** [OGL](https://github.com/oframe/ogl) (WebGL)
- **Linting:** ESLint (`eslint-config-next`)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server (with Turbopack):
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server with Turbopack  |
| `npm run build` | Create an optimized production build |
| `npm start`     | Run the production build             |
| `npm run lint`  | Run ESLint                           |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout and site metadata
│   ├── page.tsx          # Main portfolio page and section logic
│   └── globals.css       # Global styles
└── components/
    └── reactbits/        # Aurora, BlurText, and SplashCursor components
public/                   # Images, resume PDF, and static assets
```

## Build for Production

```bash
npm run build
npm start
```

## License

This project is for personal portfolio use.

Hi! 👋

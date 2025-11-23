# Modern Personal Portfolio

A modern, responsive personal portfolio website built with React, Vite, and Tailwind CSS v4. Designed to be easily configurable and hosted on Cloudflare Pages or Workers.

## Features

- 🎨 **Modern Design**: Dark mode, glassmorphism, and smooth animations using Framer Motion.
- 📱 **Responsive**: Fully responsive layout for all device sizes.
- ⚡ **Fast**: Built with Vite for lightning-fast development and production builds.
- 🔧 **Configurable**: All content (profile, experience, skills, projects) is driven by JSON files.
- ☁️ **Cloudflare Ready**: Optimized for deployment on Cloudflare Pages or Workers.

## Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository (if you haven't already):
   ```bash
   git clone <repository-url>
   cd slod-service/portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the site.

## Configuration

You can customize the content of the portfolio by editing the JSON files in `src/data/`:

- `profile.json`: Name, title, bio, and about text.
- `experience.json`: Work history and achievements.
- `skills.json`: Technical skills categorized by type.
- `projects.json`: List of projects with descriptions and links.
- `socials.json`: Social media profile links.

## Building for Production

Create a production-ready build:

```bash
npm run build
```

The output will be generated in the `dist` directory.

## Deployment

### Option 1: Cloudflare Pages (Recommended)

Cloudflare Pages is the easiest way to host this application.

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Go to **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. Configure the build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**.

### Option 2: Cloudflare Workers

If you prefer to deploy as a Worker (or if you are using the `wrangler` CLI):

1. Install Wrangler globally (if not installed):
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Deploy the `dist` folder as a static site (Pages):
   ```bash
   wrangler pages deploy dist --project-name slod-portfolio
   ```

   *Note: Ensure you have run `npm run build` first.*

## API Configuration (Contact Form)

The contact form uses a Cloudflare Pages Function to send emails via SMTP. You need to configure the following environment variables in your Cloudflare Pages project settings:

- `SMTP_HOST`: Your SMTP server host (e.g., `smtp.gmail.com`)
- `SMTP_PORT`: Your SMTP server port (e.g., `587`)
- `SMTP_SECURE`: `true` for port 465, `false` for other ports
- `SMTP_USER`: Your email address
- `SMTP_PASS`: Your email password or app-specific password

### Local Development with API

To test the API locally, create a `.env` file in the root directory (copy from `.env.example`) and fill in your SMTP credentials. Note that `npm run dev` uses Vite and proxies API requests, but for full function emulation you might need to use `wrangler pages dev`.

## Hosting

### Cloudflare Pages (Recommended)

1. **Push to Git**: Ensure your code is pushed to a GitHub/GitLab repository.
2. **Connect to Cloudflare**: Go to Cloudflare Dashboard > Workers & Pages > Create Application > Connect to Git.
3. **Select Repository**: Choose your portfolio repository.
4. **Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
5. **Environment Variables**: Add the SMTP variables listed above in the "Environment variables" section.
6. **Deploy**: Click "Save and Deploy".

### Static Hosting (No API)

If you don't need the contact form, you can host the `dist` folder on any static site host (Netlify, Vercel, GitHub Pages). However, the contact form will not work without the backend function.

```
portfolio/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── data/        # JSON content files
│   ├── App.jsx      # Main application component
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles (Tailwind)
├── index.html       # HTML template
├── package.json     # Dependencies and scripts
└── vite.config.js   # Vite configuration
```

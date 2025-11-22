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

## Project Structure

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

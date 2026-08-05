# Echoes of Independence

An immersive, cinematic React experience telling the story of Pakistan — from the Pakistan Movement to a call for youth to build the nation's future.

## Stack

- React + Vite
- Tailwind CSS v4
- Framer Motion
- GSAP (available for extended timelines)
- Lenis smooth scroll
- React Router
- React Icons

## Run

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/   # layout, ui, effects
  sections/     # 12 storytelling chapters
  data/         # curated historical content
  hooks/        # Lenis, ambient audio
  context/      # theme, sound, progress
  pages/        # journey route
```

## Features

- Premium dark night-sky hero with flag, particle crescent & star, fog
- Scroll storytelling across 12 sections
- Smooth Lenis scrolling + progress indicator
- Dark/light theme toggle
- National anthem (`public/audio/anthem.mp3`) with fade play/pause & mute
- Interactive 3D Minar-e-Pakistan (React Three Fiber)
- Interactive Digital Pakistan province map
- Custom cursor, loader, contribution pledges
- Responsive, SEO meta tags, accessible controls

## Assets

Place provided media under:

- `public/audio/anthem.mp3` — national anthem
- `public/images/logo.png` — footer / brand logo
- `public/models/minar-e-pakistan/` — GLTF + textures (Sketchfab CC-BY)
- `src/data/pakistan.geo.json` — province boundaries
- `src/data/provinces.js` — editable province facts

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Jekyll-based academic website using the Minimal Mistakes theme. Use these commands for development:

### Local Development
```bash
bundle exec jekyll serve
```
Builds and serves the site locally at `http://localhost:4000` with live reload.

### Building for Production
```bash
bundle exec jekyll build
```
Generates static site files in the `_site` directory for deployment.

### Installing Dependencies
```bash
bundle install
```
Installs Ruby gems defined in the Gemfile.

## Architecture Overview

### Site Structure
- **Jekyll Static Site Generator**: Uses Minimal Mistakes remote theme
- **Content Types**: Academic posts, publications, resources, and password-protected research notes
- **Password Protection System**: Custom client-side protection for sensitive academic content

### Key Components

#### Password Protection System
- **Layout**: `_layouts/protected.html` - Custom layout for password-protected posts
- **JavaScript**: `assets/js/password-protection.js` - Client-side protection with SHA-256 hashing
- **Generator**: `_pages/password-generator.md` - Administrative tool for creating password hashes
- **Security Features**: 
  - Session-based unlocking
  - Failed attempt tracking with lockout (5 attempts, 15-minute lockout)
  - Timing-safe password comparison
  - No server-side storage of passwords

#### Content Organization
- **Posts**: `_posts/` - Blog posts with academic categories (Physics, Math, GNN, LLM, Private)
- **Pages**: `_pages/` - Static pages (about, publications, resources, etc.)
- **Data**: `_data/navigation.yml` - Site navigation configuration
- **Assets**: `assets/` - Documents (CV), images, presentations, and JavaScript

### Blog Management

#### Public Posts
Standard Jekyll posts with front matter:
```yaml
---
title: "Post Title"
date: YYYY-MM-DD
categories: [Physics|Math|GNN|LLM|General]
tags: [relevant, tags]
excerpt: "Brief description"
---
```

#### Protected Posts
Private academic content using custom protection:
```yaml
---
title: "Private Research Notes" 
date: YYYY-MM-DD
categories: [Private, Physics]
layout: protected
protected: true
password_hash: "sha256_hash_here"
password_hint: "Optional hint"
excerpt: "Public description"
---
```

**Important**: Always use the password generator at `/admin/password-generator/` to create secure hashes. Never store plain passwords in files.

### Theme Configuration
- **Remote Theme**: `mmistakes/minimal-mistakes`
- **Configuration**: `_config.yml` - Site settings, author info, analytics, plugins
- **Gemfile**: Defines Jekyll dependencies including GitHub Pages compatibility

### Security Considerations
- Password protection is client-side and suitable for academic/personal use
- All password hashing uses SHA-256 with timing-safe comparison
- Protected content includes lockout mechanisms to prevent brute force
- Use HTTPS in production for password transmission security

## Content Guidelines

### File Naming
- Posts: `YYYY-MM-DD-title-with-hyphens.md`
- Pages: `descriptive-name.md`
- Keep consistent naming conventions for maintainability

### Categories for Academic Content
- **Physics**: Theoretical physics, research, experiments
- **Math**: Mathematical concepts, proofs, tutorials
- **GNN**: Graph Neural Networks research
- **LLM**: Large Language Models research  
- **Private**: Password-protected research notes
- **General**: Other academic topics

### When Adding Protected Content
1. Use the password generator tool first
2. Never commit plain passwords to git
3. Test password protection before publishing
4. Consider using different passwords for different sensitivity levels
5. Document password hints that authorized users will understand

## Image Management

### Image Organization
Images are stored in `/assets/images/` with organized subdirectories:
- `physics/` - Physics-related diagrams, equations, experimental setups
- `math/` - Mathematical illustrations, proofs, diagrams
- `research/` - Research-specific images, graphs, results, plots
- `general/` - General blog post images, screenshots, photos

### Adding Images to Posts

#### Basic Image Inclusion
```markdown
![Alt text description](/assets/images/category/your-image.jpg)
```

#### HTML with Size Control
```html
<img src="/assets/images/category/your-image.jpg" alt="Description" width="600">
```

#### Images with Captions
```html
<figure>
  <img src="/assets/images/math/proof-diagram.png" alt="Mathematical proof diagram" class="img-medium">
  <figcaption>Figure 1: Visual proof of the Pythagorean theorem</figcaption>
</figure>
```

#### Image Size Classes
- `img-small` - Max width 300px (inline diagrams)
- `img-medium` - Max width 500px (standard figures)
- `img-large` - Max width 800px (detailed charts)

#### Image Alignment
- `img-left` - Float left with text wrap
- `img-right` - Float right with text wrap  
- `img-center` - Center-aligned (default for figures)

### File Naming Conventions
- Use lowercase with hyphens: `string-theory-diagram.png`
- Be descriptive: `groebner-basis-example.jpg`
- Include category if helpful: `physics-particle-collision.svg`

### Recommended Formats
- **PNG**: Diagrams, math expressions, screenshots
- **JPG**: Photographs, complex images
- **SVG**: Vector graphics, simple diagrams, mathematical plots
- **GIF**: Small animations only

### Size Guidelines
- Keep images under 1MB when possible
- Optimize for web display
- Use appropriate resolution (usually 72-150 DPI for web)
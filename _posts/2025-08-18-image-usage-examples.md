---
title: "How to Include Images in Jekyll Blog Posts"
date: 2025-08-18
categories:
  - General
tags:
  - jekyll
  - images
  - tutorial
  - web development
excerpt: "A practical guide showing different ways to include and style images in Jekyll blog posts."
---

This post demonstrates various methods for including images in your Jekyll blog posts, showcasing the different styling options available.

## Basic Image Inclusion

The simplest way to include an image is using standard Markdown syntax:

```markdown
![Sample diagram](/assets/images/general/sample-diagram.jpg)
```

This creates a responsive image that will automatically scale on different screen sizes.

## HTML with Size Control

For more control over image dimensions, use HTML:

```html
<img src="/assets/images/math/equation-example.png" alt="Mathematical equation" width="400">
```

## Images with Captions

For academic posts, you'll often want to include captions:

```html
<figure>
  <img src="/assets/images/physics/wave-function.svg" alt="Wave function visualization" class="img-medium">
  <figcaption>Figure 1: Quantum wave function showing probability amplitude over time</figcaption>
</figure>
```

## Size Classes

You can use predefined CSS classes to control image sizes:

### Small Images (300px max)
```html
<img src="/assets/images/research/small-chart.png" alt="Small data chart" class="img-small">
```

### Medium Images (500px max)
```html
<img src="/assets/images/general/medium-diagram.jpg" alt="Medium diagram" class="img-medium">
```

### Large Images (800px max)
```html
<img src="/assets/images/physics/large-experiment.png" alt="Large experimental setup" class="img-large">
```

## Image Alignment

### Left-aligned with Text Wrap
```html
<img src="/assets/images/math/small-proof.png" alt="Mathematical proof" class="img-small img-left">
```

Lorem ipsum dolor sit amet, consectetur adipiscing elit. The image floats to the left while this text wraps around it. This is useful for integrating smaller diagrams or illustrations directly into your text flow.

<div class="clear"></div>

### Right-aligned with Text Wrap
```html
<img src="/assets/images/general/side-note.jpg" alt="Side illustration" class="img-small img-right">
```

This text will wrap around the right-aligned image. This technique works well for supplementary illustrations or side notes that relate to but don't interrupt the main text flow.

<div class="clear"></div>

### Center-aligned (Default)
```html
<img src="/assets/images/research/main-result.png" alt="Main research result" class="img-center">
```

Center alignment is the default for most images and works best for important figures that deserve their own space.

## Special Styling for Academic Content

### Mathematical Diagrams
```html
<div class="math-diagram">
  <img src="/assets/images/math/proof-visualization.svg" alt="Proof visualization" class="img-medium">
</div>
```

This adds a subtle background and border, perfect for mathematical content.

### Research Images
```html
<img src="/assets/images/research/experimental-data.png" alt="Experimental data" class="research-image img-large">
```

Research images get a special blue border to highlight important findings.

## Image Galleries

For multiple related images, you can create a gallery:

```html
<div class="image-gallery">
  <img src="/assets/images/physics/experiment-1.jpg" alt="Experiment setup 1">
  <img src="/assets/images/physics/experiment-2.jpg" alt="Experiment setup 2">
  <img src="/assets/images/physics/experiment-3.jpg" alt="Experiment setup 3">
  <img src="/assets/images/physics/experiment-4.jpg" alt="Experiment setup 4">
</div>
```

## Best Practices

1. **Always include alt text** for accessibility
2. **Use descriptive file names** like `groebner-basis-example.png`
3. **Optimize image sizes** - keep under 1MB when possible
4. **Choose appropriate formats**:
   - PNG for diagrams and mathematical expressions
   - JPG for photographs
   - SVG for vector graphics and simple diagrams
5. **Organize by category** in the `/assets/images/` subdirectories

## File Organization

Your images should be organized in the following structure:

```
/assets/images/
├── physics/          # Physics-related images
├── math/            # Mathematical diagrams
├── research/        # Research results and data
├── general/         # General blog images
└── bio-photo.jpg    # Site-wide images
```

This organization makes it easy to find and manage your images as your blog grows.

Remember to test your images on different screen sizes to ensure they display well on both desktop and mobile devices!
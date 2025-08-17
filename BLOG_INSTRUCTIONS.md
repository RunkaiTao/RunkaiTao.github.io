# Blog Management Instructions

This guide explains how to add both public and private (password-protected) blog posts to your Jekyll website.

## Adding Public Blog Posts

### 1. Create a New Post File

Create a new file in the `_posts` directory with the naming format:
```
YYYY-MM-DD-post-title.md
```

**Example:** `2024-08-17-my-research-update.md`

### 2. Add Front Matter for Public Posts

At the top of your post file, add the front matter:

```yaml
---
title: "Your Post Title"
date: 2024-08-17
categories:
  - Physics    # Choose from: Physics, Math, GNN, LLM, Private, etc.
tags:
  - research
  - experiment
  - your-tags
excerpt: "Brief description that appears in blog listings"
---
```

### 3. Write Your Content

After the front matter, write your blog content in Markdown:

```markdown
# Your Blog Post Content

This is where you write your actual blog post content using Markdown syntax.

## Sections
- Use headers to organize content
- Add lists, links, images, code blocks, etc.

```

### 4. Available Categories

Your website supports these main categories:
- **Physics** - Physics research, theories, experiments
- **Math** - Mathematical concepts, proofs, tutorials  
- **GNN** - Graph Neural Networks research
- **LLM** - Large Language Models research
- **Private** - For password-protected content
- **General** - General academic topics

## Adding Private (Password-Protected) Blog Posts

### 1. Generate a Password Hash

**Option A: Use the Password Generator (Recommended)**
1. Visit your website at `/admin/password-generator/`
2. Enter your desired password OR generate a random one
3. Copy the generated hash

**Option B: Manual Generation**
1. Open your browser's developer console (F12)
2. Run: `PasswordUtils.showPasswordGenerator()`
3. Copy the generated password and hash

### 2. Create the Protected Post File

Create your post file as normal: `_posts/YYYY-MM-DD-post-title.md`

### 3. Add Front Matter for Protected Posts

Use this front matter template:

```yaml
---
title: "Your Private Post Title"
date: 2024-08-17
categories:
  - Private
  - Physics    # Add other relevant categories
tags:
  - confidential
  - research-notes
layout: protected
protected: true
password_hash: "paste_your_generated_hash_here"
password_hint: "Optional hint for users (e.g., 'Contact me for access')"
excerpt: "Brief public description - this will be visible to everyone"
---
```

### 4. Write Protected Content

After the front matter, write your private content:

```markdown
# Private Research Notes

This content will only be visible after entering the correct password.

## Confidential Information
- Grant details
- Unpublished results
- Collaboration notes
- Private thoughts

```

## Example Files

### Public Post Example

**File:** `_posts/2024-08-17-quantum-computing-basics.md`

```yaml
---
title: "Introduction to Quantum Computing"
date: 2024-08-17
categories:
  - Physics
tags:
  - quantum computing
  - tutorial
excerpt: "A beginner's guide to understanding quantum computing principles"
---

# Introduction to Quantum Computing

Quantum computing represents a revolutionary approach to information processing...

## Key Concepts

### Qubits
Unlike classical bits that are either 0 or 1, qubits can exist in superposition...

### Quantum Gates
Quantum gates are the building blocks of quantum circuits...
```

### Private Post Example

**File:** `_posts/2024-08-17-confidential-research-update.md`

```yaml
---
title: "Research Progress - Confidential"
date: 2024-08-17
categories:
  - Private
  - Physics
tags:
  - research notes
  - confidential
layout: protected
protected: true
password_hash: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"
password_hint: "Lab meeting password"
excerpt: "Weekly research progress update with confidential details"
---

# Weekly Research Update

## Grant Application Status
- NSF proposal submitted
- Budget: $XXX,XXX over 3 years
- Decision expected: March 2025

## Unpublished Results
Our latest experiments show...
```

## File Organization

```
_posts/
├── 2024-08-17-public-post-1.md
├── 2024-08-17-private-research.md
├── 2024-08-16-math-tutorial.md
└── 2024-08-15-gnn-overview.md
```

## Password Management Best Practices

### For Password Security:
1. **Use strong passwords** for sensitive content
2. **Use different passwords** for different posts
3. **Never store plain passwords** in your files
4. **Share passwords securely** with authorized readers

### For Password Organization:
1. Keep a secure record of which passwords go with which posts
2. Consider using a password manager
3. Document password hints that make sense to authorized users

## Blog Categories and Organization

### How Categories Work:
- Posts appear on the main `/blogs/` page organized by category
- Each category shows up to 5 recent posts
- "View All" buttons link to dedicated category pages like `/blogs/physics/`
- Protected posts show with lock icons and "Protected" badges

### Category Pages:
- `/blogs/physics/` - All Physics posts
- `/blogs/math/` - All Math posts  
- `/blogs/gnn/` - All GNN posts
- `/blogs/llm/` - All LLM posts
- Additional categories create automatic pages

## Testing Your Posts

### For Public Posts:
1. Save your file
2. Build your site locally: `bundle exec jekyll serve`
3. Visit `http://localhost:4000/blogs/` to see your post listed
4. Click through to verify formatting

### For Protected Posts:
1. Save your file with the generated hash
2. Build your site locally
3. Visit your post URL
4. Test the password protection:
   - Try wrong passwords (should fail)
   - Enter correct password (should unlock)
   - Refresh page (should stay unlocked during session)

## Troubleshooting

### Common Issues:

**Post not appearing:**
- Check file naming format: `YYYY-MM-DD-title.md`
- Ensure front matter has proper YAML format
- Verify categories are spelled correctly

**Password protection not working:**
- Verify you're using `layout: protected`
- Check that `protected: true` is set
- Ensure password hash is correct (64 characters, lowercase hex)

**Formatting issues:**
- Check that front matter ends with `---`
- Ensure proper indentation in YAML
- Verify Markdown syntax

### Getting Help:

1. Check the browser console for error messages
2. Test with the sample protected post (password: "test")
3. Verify your password hash using the generator tool
4. Ensure all file paths and naming conventions are correct

## Security Notes

⚠️ **Important Security Considerations:**

1. **Client-side protection**: This system provides client-side password protection suitable for academic/personal use, not military-grade security
2. **HTTPS recommended**: Use HTTPS in production for password transmission security
3. **No server logs**: Passwords are processed entirely in the browser
4. **Session-based**: Unlocked content stays accessible during browser session
5. **Lockout protection**: Automatic lockout after 5 failed attempts

---

This password protection system provides a good balance of security and usability for academic blogs, personal research notes, and collaborative content that needs access control.
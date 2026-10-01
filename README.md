# makabaka

A low-key, Hyde-inspired resume-style Hugo theme with tree-structured tags, a bilingual About page, and an interactive "By Topic" explorer.

- Sidebar profile (avatar, title, bio, resume link, social links) on the left, recent posts on the right.
- Posts organized by **folder hierarchy** (tree-structured categories) and by **flat tags** (cross-filterable on `/tags/`).
- Interactive "By Topic" explorer with search/reset on the Posts page.
- Bilingual (English/Chinese) About page toggle.
- No sidebar on individual post pages — full-width reading.

## Requirements

- Hugo **extended** v0.112.0 or later (uses Hugo Pipes for SCSS).

## Installation

Add this theme as a git submodule in your Hugo site:

```bash
git submodule add https://github.com/Rexturnull/hugo-theme-makabaka.git themes/makabaka
```

Then set it in your site config (`hugo.toml`):

```toml
theme = "makabaka"
```

To pin to the original clean release instead of tracking the latest commit:

```bash
cd themes/makabaka
git checkout v1.0.0
cd ../..
git add themes/makabaka
git commit -m "Pin makabaka theme to v1.0.0"
```

## Configuration

In your site's `hugo.toml`:

```toml
[params.author]
    name = "Your Name"
    title = "Your Title"
    bio = "A one-line description of yourself"
    avatar = "/img/avatar.svg"
    resume = "/files/resume.pdf"

[params.social]
    github = "https://github.com/your-handle"
    email = "you@example.com"
    linkedin = "https://www.linkedin.com/in/your-handle"
    twitter = "https://x.com/your-handle"
```

## Writing posts

Create a page bundle under `content/posts/`:

```
content/posts/tech/my-new-post/index.md
```

```toml
+++
title = "My New Post"
date = 2026-10-01T09:00:00+08:00
tags = ["go", "notes"]
cover = "cover.svg"
summary = "A one-line summary of what this post is about"
+++

Write your content here (Markdown supported).
```

- Cover image and body images live in the **same folder** as `index.md`.
- Folder structure drives the tree/category hierarchy (browsable under "By Topic"); `tags` are flat, cross-cutting keywords.

## License

MIT

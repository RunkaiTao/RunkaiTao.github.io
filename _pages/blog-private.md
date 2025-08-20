---
permalink: /blogs/private/
title: "Private Research Notes"
layout: single
author_profile: true
classes: wide
---

This page contains password-protected research notes and private academic content.

<p style="margin-bottom: 2em;">
  <a href="{{ '/blogs/' | relative_url }}" class="btn btn-outline">&larr; Back to All Blogs</a>
</p>

{% assign protected_posts = site.posts | where: "protected", true | sort: 'date' | reverse %}

{% for post in protected_posts %}
  <article class="post-item protected-post">
    <h3>
      <i class="fas fa-lock protected-icon"></i>
      <a href="{{ post.url | relative_url }}" rel="permalink">{{ post.title }}</a>
      <span class="protected-badge">Protected</span>
    </h3>
    <p class="post-meta">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
      {% if post.categories.size > 0 %}
        • Categories: 
        {% for category in post.categories %}
          {% unless category == "Private" %}
            <span class="category">{{ category }}</span>{% unless forloop.last %}, {% endunless %}
          {% endunless %}
        {% endfor %}
      {% endif %}
      {% if post.tags.size > 0 %}
        • Tags: 
        {% for tag in post.tags %}
          <span class="tag">{{ tag }}</span>{% unless forloop.last %}, {% endunless %}
        {% endfor %}
      {% endif %}
    </p>
    {% if post.excerpt %}
      <p class="post-excerpt">
        {{ post.excerpt | strip_html | truncate: 150 }}
        <span class="protected-notice">This post requires a password to view.</span>
      </p>
    {% endif %}
    {% if post.password_hint %}
      <p class="password-hint">
        <i class="fas fa-info-circle"></i> Hint: {{ post.password_hint }}
      </p>
    {% endif %}
    <p>
      <a href="{{ post.url | relative_url }}" class="read-more">
        Enter password to read &rarr;
      </a>
    </p>
    <p class="license-info">
      <i class="fab fa-creative-commons"></i>
      <i class="fab fa-creative-commons-by"></i>
      <i class="fab fa-creative-commons-sa"></i>
      Licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a>
    </p>
  </article>
{% endfor %}

{% if protected_posts.size == 0 %}
  <p class="no-posts">No protected posts found.</p>
{% endif %}

<style>
.post-item {
  margin-bottom: 3em;
  padding-bottom: 2em;
  border-bottom: 1px solid #eee;
}

.post-item h3 {
  margin-bottom: 0.5em;
  color: #333;
}

.post-item h3 a {
  text-decoration: none;
  color: inherit;
}

.post-item h3 a:hover {
  color: #007bff;
}

.post-meta {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 1em;
}

.tag, .category {
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.8em;
}

.post-excerpt {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1em;
}

.password-hint {
  color: #666;
  font-size: 0.9em;
  font-style: italic;
  margin-bottom: 1em;
  padding: 0.5em;
  background-color: #f8f9fa;
  border-left: 3px solid #007bff;
  border-radius: 0 4px 4px 0;
}

.password-hint i {
  color: #007bff;
  margin-right: 0.5em;
}

.read-more {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}

.btn {
  display: inline-block;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9em;
  transition: all 0.3s;
}

.btn-outline {
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
}

.btn-outline:hover {
  background-color: #007bff;
  color: white;
}

.no-posts {
  text-align: center;
  color: #666;
  font-style: italic;
  margin: 2em 0;
}

/* Protected post styles */
.protected-post {
  background: linear-gradient(135deg, #fff 0%, #fff8e1 100%);
  border-left: 4px solid #ffb300;
  padding: 1.5em;
  border-radius: 0 8px 8px 0;
}

.protected-icon {
  color: #ff8f00;
  margin-right: 0.5rem;
  font-size: 0.9rem;
}

.protected-badge {
  display: inline-block;
  background: #fff3e0;
  color: #e65100;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 0.5rem;
  border: 1px solid #ffcc02;
}

.protected-notice {
  color: #bf360c;
  font-style: italic;
  font-weight: 500;
  margin-left: 0.5rem;
}

.protected-post h3 a {
  color: #5d4037;
}

.protected-post h3 a:hover {
  color: #3e2723;
}

.license-info {
  color: #888;
  font-size: 0.8em;
  margin-top: 1em;
  margin-bottom: 0.5em;
  padding-top: 0.5em;
  border-top: 1px solid #f0f0f0;
}

.license-info i {
  margin-right: 0.25em;
  color: #666;
}

.license-info a {
  color: #666;
  text-decoration: none;
}

.license-info a:hover {
  color: #007bff;
  text-decoration: underline;
}
</style>
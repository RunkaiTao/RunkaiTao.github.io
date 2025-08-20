---
permalink: /blogs/gnn/
title: "GNN Posts"
layout: single
author_profile: true
classes: wide
---

All blog posts in the **GNN** category, listed in chronological order (newest first).

<p style="margin-bottom: 2em;">
  <a href="{{ '/blogs/' | relative_url }}" class="btn btn-outline">&larr; Back to All Blogs</a>
</p>

{% assign gnn_posts = site.categories.GNN | sort: 'date' | reverse %}

{% for post in gnn_posts %}
  {% unless post.protected %}
  <article class="post-item">
    <h3><a href="{{ post.url | relative_url }}" rel="permalink">{{ post.title }}</a></h3>
    <p class="post-meta">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
      {% if post.tags.size > 0 %}
        • Tags: 
        {% for tag in post.tags %}
          <span class="tag">{{ tag }}</span>{% unless forloop.last %}, {% endunless %}
        {% endfor %}
      {% endif %}
    </p>
    {% if post.excerpt %}
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 300 }}</p>
    {% endif %}
    <p><a href="{{ post.url | relative_url }}" class="read-more">Read more &rarr;</a></p>
    <p class="license-info">
      <i class="fab fa-creative-commons"></i>
      <i class="fab fa-creative-commons-by"></i>
      <i class="fab fa-creative-commons-nc"></i>
      <i class="fab fa-creative-commons-nd"></i>
      Licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener">CC BY-NC-ND 4.0</a>
    </p>
  </article>
  {% endunless %}
{% endfor %}

{% if gnn_posts.size == 0 %}
  <p class="no-posts">No posts found in the GNN category.</p>
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

.tag {
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
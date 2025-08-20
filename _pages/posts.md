---
permalink: /blogs/
title: "Blogs"
layout: single
author_profile: true
classes: wide
---

Welcome to my blog! Here I share thoughts on research, tutorials, and insights from my academic journey.

## Posts by Category

<!-- Filter out 'Hide' category from public blog display -->
{% assign categories = site.categories | sort %}
{% for category in categories %}
  {% unless category[0] == 'Hide' %}
    {% assign posts_in_category = category[1] | sort: 'date' | reverse %}
    {% assign category_slug = category[0] | downcase | replace: ' ', '-' %}
    
### {{ category[0] }}

{% for post in posts_in_category limit:5 %}
  {% unless post.protected %}
  <article class="post-item">
    <h4>
      <a href="{{ post.url | relative_url }}" rel="permalink">{{ post.title }}</a>
    </h4>
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
      <p class="post-excerpt">
        {{ post.excerpt | strip_html | truncate: 200 }}
      </p>
    {% endif %}
    <p class="license-info">
      <i class="fab fa-creative-commons"></i>
      <i class="fab fa-creative-commons-by"></i>
      <i class="fab fa-creative-commons-sa"></i>
      Licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a>
    </p>
  </article>
  {% endunless %}
{% endfor %}

{% if posts_in_category.size > 5 %}
  <p class="view-all-link">
    <a href="{{ '/blogs/' | append: category_slug | append: '/' | relative_url }}" class="view-all-btn">View All {{ category[0] }} Posts ({{ posts_in_category.size }})</a>
  </p>
{% elsif posts_in_category.size > 1 %}
  <p class="view-all-link">
    <a href="{{ '/blogs/' | append: category_slug | append: '/' | relative_url }}" class="view-all-btn">View All {{ category[0] }} Posts ({{ posts_in_category.size }})</a>
  </p>
{% endif %}

  {% endunless %}
{% endfor %}


<style>
.post-item {
  margin-bottom: 2em;
  padding-bottom: 1em;
  border-bottom: 1px solid #eee;
}

.post-item h4 {
  margin-bottom: 0.5em;
}

.post-meta {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 0.5em;
}

.tag, .category {
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.8em;
}

.post-excerpt {
  color: #555;
  line-height: 1.5;
}

.view-all-link {
  text-align: center;
  margin: 2em 0;
}

.view-all-btn {
  display: inline-block;
  padding: 0.5em 1em;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #495057;
  text-decoration: none;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.15s ease-in-out;
}

.view-all-btn:hover {
  background-color: #e9ecef;
  border-color: #adb5bd;
  color: #212529;
  text-decoration: none;
  transform: translateY(-1px);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
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
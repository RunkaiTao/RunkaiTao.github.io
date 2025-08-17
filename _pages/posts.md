---
permalink: /blogs/
title: "Blogs"
layout: single
author_profile: true
classes: wide
---

Welcome to my blog! Here I share thoughts on research, tutorials, and insights from my academic journey.

## Posts by Category

{% assign categories = site.categories | sort %}
{% for category in categories %}
  {% assign posts_in_category = category[1] | sort: 'date' | reverse %}
  
### {{ category[0] }}

{% for post in posts_in_category %}
  <article class="post-item">
    <h4><a href="{{ post.url | relative_url }}" rel="permalink">{{ post.title }}</a></h4>
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
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 200 }}</p>
    {% endif %}
  </article>
{% endfor %}

{% endfor %}

## All Posts (Chronological)

{% assign posts = site.posts | sort: 'date' | reverse %}
{% for post in posts %}
  <article class="post-item">
    <h4><a href="{{ post.url | relative_url }}" rel="permalink">{{ post.title }}</a></h4>
    <p class="post-meta">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
      {% if post.categories.size > 0 %}
        • Categories: 
        {% for category in post.categories %}
          <span class="category">{{ category }}</span>{% unless forloop.last %}, {% endunless %}
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
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 200 }}</p>
    {% endif %}
  </article>
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
</style>
---
layout: page
title: Scripts
permalink: /blog/
---

<ul>
  {% for post in site.posts %}
    {% if post.category == scripts %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        {{ post.excerpt }}
      </li>
    {% endif %}
  {% endfor %}
</ul>

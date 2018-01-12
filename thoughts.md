---
layout: page
title: Thoughts
permalink: /thoughts/
---

{% for post in site.categories.thoughts %}
 <h3> [{{ post.title }}]({{ page.url }}) <\h3>
 
 {{ post.excerpt }}
{% endfor %}

---
layout: page
title: Thoughts
permalink: /thoughts/
---

{% for post in site.categories.thoughts %}
 + [{{ post.title }}]({{ page.url }})
 
 {{ post.excerpt }}
{% endfor %}

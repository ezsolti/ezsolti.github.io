---
layout: page
title: Scripts
permalink: /scripts/
---

{% for post in site.categories.scripts %}
+ ** [{{ post.title }}]({{ page.url }}) **
 
 {{ post.excerpt }} 
{% endfor %}

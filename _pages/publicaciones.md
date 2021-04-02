---
layout: archive
title: "Publicaciones"
permalink: /publicaciones/
author_profile: true
---

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publicaciones reversed %}
  {% include archive-single.html %}
{% endfor %}
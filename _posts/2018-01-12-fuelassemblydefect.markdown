---
layout: post
title:  "Fuel Assembly defecter"
date:   2018-01-11 14:00:00 +0100
categories: scripts
---

I wrote a previous post about creating [random defects for MCNP input]({{ site.baseurl }}{% post_url 2018-01-11-randomdefect %}) with a python function. However I don't necessarily want to have always random defects, sometimes I would like to define given structures in my input. Let say, I am reading a paper, where the authors investigated a given defect scenario, which I would like to include in the computations. The simple solution is to look at the Figure in the given paper, and count it with my fingers, which coordinates are needed to be replaced, then include that in my python function and set only the control rod inserts randomly. This is a tedious task already for one exotic geometry... So I wanted to have a tool which faciliates this. Of course ideally I could write a program, which analyses the included figure and based on the different shades it will tell me where are the dummy rods. The problem, that such tool should be always recalibrated if I come across a new paper and a new structure.

So, instead I was thinking to make a small application where I can just click on the rods, which should be dummies, and get he coordinates. Surely, I still do it manually, but it is way less tedious, then writing the coordinates by hand. And this is much more fun.

Few years back I took a course on Coursera (Introduction to Computational Arts), where the first few tasks were done in Processing. I took the course only for fun, didn't think that it may help me sometime in my professional life. But now when I started to think about how the application would look like and work, the Processing knowledge immedietly came back to me, and I realized it would be a piece of cake to make it in Processing. Of course now I found that the language evolved quite a bit since I last used it, and most of the help found by google is outdated, so I finally used some mixture of Processing and p5.js, and even I don't really know when I'm using which one, but I cared only about the end product.

I developed the application on [openprocessing.org](https://www.openprocessing.org/). Probably the easiest way to discuss how it works is to include it here at the beginning:

<iframe src="https://www.openprocessing.org/sketch/495110/embed/" width="720" height="720"></iframe>

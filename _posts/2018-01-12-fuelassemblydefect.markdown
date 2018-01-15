---
layout: post
title:  "Fuel Assembly defecter"
date:   2018-01-11 14:00:00 +0100
categories: scripts
---

I wrote a previous post about creating [random defects for MCNP input]({{ site.baseurl }}{% post_url 2018-01-11-randomdefect %}) with a python function. However I don't necessarily want to have always random defects, sometimes I would like to define given structures in my input. Let say, I am reading a paper, where the authors investigated a given defect scenario, which I would like to include in the computations. The simple solution is to look at the Figure in the given paper, and count it with my fingers, which coordinates are needed to be replaced, then include that in my python function and set only the control rod inserts randomly. This is a tedious task already for one exotic geometry... So I wanted to have a tool which faciliates this. Of course ideally I could write a program, which analyses the included figure and based on the different shades it will tell me where are the dummy rods. The problem, that such tool should be always recalibrated if I come across a new paper and a new structure.

So, instead I was thinking to make a small application where I can just click on the rods, which should be dummies, and get he coordinates. Surely, I still do it manually, but it is way less tedious, then writing the coordinates by hand. And this is much more fun.

Few years back I took a course on Coursera (Introduction to Computational Arts), where the first few tasks were done in Processing. I took the course only for fun, didn't think that it may help me sometime in my professional life. But now when I started to think about how the application would look like and work, the Processing knowledge immedietly came back to me, and I realized it would be a piece of cake to make it in Processing. Of course now I found that the language evolved quite a bit since I last used it, and most of the help found by google is outdated, so I finally used some mixture of Processing and p5.js, and even I don't really know when I'm using which one, but I cared only about the end product.

I developed the application on [openprocessing.org](https://www.openprocessing.org/). Probably the easiest way to discuss how it works is to include it here at the beginning. Nevertheless, the application can be found on [here](https://www.openprocessing.org/sketch/495110). It is way faster when not embedded, and the embedded version is not able to print the results (which was kind of the goal for me)

<iframe src="https://www.openprocessing.org/sketch/495110/embed/" width="750" height="750"></iframe>

Quick overview what is this, and what one can do: as default the app shows a 17x17 PWR assembly structure, grey circles are the fuel pins, and black circles are the control rods. If the user clicks on any of the circles, it becomes red, and the coordinates (from 1 to 289 - that is 17x17) of the selected rods are printed (this is what doesn't show in the embedded version). Hitting 'z' will undo the last selection, and hitting 'delete' removes all the selections. I set some default partial defects as well: hitting 'i' results in a case when some of the rods in the center region are selected (actually this case motivated the whole tool), 'e' belongs to a case when some peripheral rods are selected, 'c' belongs to a corner selection, and finally hitting 'r' will generate a random defect (same as discussed in the above mentioned post). 

So let us just quickly review how a Processing application looks like code-wise: one needs two functions usally: a setup() which sets up the default canvas, and a draw() function, which will bring in any functionality, transients of the canvas etc. 

{% highlight python %}
function setup() {
	createCanvas(170*4, 170*4);
	background(255);
	DummyPos=[]
	/*historyPos=[]*/
	DummyPosDummy=[];
  CrPos=[40,43,46,55,65,88,91,94,97,100,139,142,145,148,151,190,193,196,199,202,225,235,244,247,250];
	k=1;
	for(i=0;i<17;i++){
		for(j=0;j<17;j++){
			fill(100);
			rect(40*i,40*j,40,40);
			fill(200);
			for(jj=0;jj<25;jj++){
				if(CrPos[jj]==k){
					fill(50)
				}
			}
			ellipse(40*i+20,40*j+20,35,35);
			k++;
		}
	}
}
{% endhighlight %}

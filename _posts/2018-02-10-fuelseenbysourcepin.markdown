---
layout: post
title:  "Fuel seen by source pin"
date:   2018-02-10 18:00:00 +0100
categories: scripts
tags: nuclear scripts
---

Not surprisingly this post is also related to fuel assemblies and their geometries. Namely, I'm planning to give a presentation and I'd like to say few words about the challange in performing Monte Carlo gamma-transport simulations in large fuel assemblies. The main challange is obviously the large amount UO2 between the detector and the source. Nevertheless, this "large amount" varies quite a lot from pin to pin. Clearly, if a detector is facing one of the corners of a 17x17 assembly, then gamma rays emitted towards the detector by the pin in the corner will see on average one pin radius thick UO2 (4.1mm), whereas gamma rays emitted from the opposite corner will see around (16*2+1) pin radius thick UO2 (135.3mm). In my presentation I'd like to give an average thickness, or well, a more reasonable average than (135.3+4.1)/2. So I was thinking about calculating the thickness seen by each pin. Anyhow, the contrubiton made by a pin to the detector signal is related to the this fuel thickness seen by a pin, so this can be a nice quantity to know. And calculating this thickness has to be way easier then estimating the contribution, right?



Ok, let's do it. Preliminaries: I made some approximations in the geometry compared to a real fuel assembly: I consider only fuel pins in a water-filled lattice (ie. no cladding), the lattice is 17x17, the pitch size is 12.6mm, which makes the assembly 214.2 mm wide. The fuel pins have radii of 4.1mm. I place the origo in the central pin. I consider that every lattice position is filled with fuel (ie. no control rods, to keep the script cleaner). The detector point is 55cm from the origo, facing the upper right corner, ie its location is (388.9,388.9). The fuel is surrounded by water (since I also want to quantify the "water seen" by the pin, this is important). Clearly, the problem has a symmetry, so one can just compute the thicknesses for the upper or the lower triangle (disclaimer, I didn't do this, since I though run time won't be a problem).

I actually had two solution to calculate the thickness of the fuel seen. The first one was the lazy way of doing it, and it turned out to be slow as well, so I just quickly summarize it, and at the end of the post I will keep the script anyhow, since it contained some nice ideas. Since I thought, I am lazy to check analytically where a line would cut a circle, my first idea was to do this numerically. That is, I created a mesh over the fuel (in 2D), and when creating the mesh I immedietly kept track of which meshpoint is located in fuel region and which one is in the surrounding water. Then I iterated through the centers of each pin: I draw a line between the pins' center and the detector point, calculate the slope and the intercept of the line, and then I numerically run through this line, and check whether the given meshpoint is in fuel region or not. If yes, then I will calculate the distance between the current meshpoint on the line and the previous one, and sum it to a variable accounting for the thickness of the fuel seen. One can immedietly see the drawbacks of such solution: 1, One will just estimate this thickness, and the accuracy of the estimation depends on the size amount of mesh points. 2, And still, when the line crosses the boundary between a fuel and water region, one either tries to handle this correctly, or has a bias. 3, The more meshpoints one has, the longer it will take to check whether a meshpoint is in a fuel or water region. Well, in deed I did this, with a meshsize of 0.1 mm, and well, I was actually a bit surprised how slow this is, I assumed this will be slow, but didn't think this will take hours.

So I finally decided to do this the right way: iterate through the centers of each pin, draw a line between the pins' center and the detector point, calculate the slope and the intercept of the line, and then iterate through the pins between the detector and the actual pin, and calculate where the line intersects the pins, and sum up the distances between the intersections.

Actually it turns out the this way is way simpler that my first idea. There are two functions which are handy to have.

First the distance between two points

{% highlight python %}
def distance(p1,p2):
    return np.sqrt((p2[0]-p1[0])**2+(p2[1]-p1[1])**2)
{% endhighlight %}

Second, the intersections between a line and circle (the line is defined by the slope _m_ and the intercept _a_, and the circle is defined by the center _c_ and the radius _r_). Interestingly I haven't got a formula after quick googling, so [here][1] one can find the quadratic equation after plugging the line equation into the circle equation. One just needs to solve this, and since  

{% highlight python %}
def circlelineintersect(m, a, c, r):
    A=1+m**2
    B=(2*(a-c[1])*m-2*c[0])
    C=(c[0]**2+(a-c[1])**2-r**2)
    D = B**2-4*A*C
    if D < 0:
        return []
    elif D == 0:
        return []
    else:
        x1 = (-B+np.sqrt(B**2-4*A*C))/(2*A)
        x2 = (-B-np.sqrt(B**2-4*A*C))/(2*A)
        y1 = a + m*x1
        y2 = a + m*x2
        return [[x1,y1],[x2,y2]]
{% endhighlight %}

[1]: https://latex.codecogs.com/gif.latex?\center&space;(x-x_c)^2&plus;(y-y_c)^2=r^2&space;\newline&space;\center&space;a&plus;mx=y&space;\newline&space;\center&space;(x-x_c)^2&plus;(a&plus;mx-y_c)^2=r^2&space;\newline&space;\center&space;(1&plus;m^2)x^2&plus;\Big(2(a-y_c)m-2x_c)\Big

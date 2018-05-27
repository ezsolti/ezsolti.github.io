---
layout: post
title:  "Running XCOM with input?"
date:   2018-05-27 22:00:00 +0100
categories: scripts
tags: nuclear scripts
---

 [XCOM](https://physics.nist.gov/PhysRefData/Xcom/Text/download.html) is "a web database is provided which can be used to calculate photon cross sections for scattering, photoelectric absorption and pair production, as well as total attenuation coefficients, for any element, compound or mixture". XCOM has a handy web interface to the database and one can quickly generate gamma cross section tables, what can be further used for codes or to compare measurement data. XCOM also has a Fortran code, thus the user can type inputs from the command line. Nevertheless, it doesn't allow inputs from text files. To be fair, the gamma energies of interest can be read from a file, however (and i really don't understand the reason for that), the description of the compound cannot be read from an input. Some time ago I wanted to investigate the burnup dependence of the total attenuation coefficents of spent nuclear fuel. I need this for an other work. Well, when it comes to spent nuclear fuel, I really didn't want to type in the elements, and anyhow I should have done this for various burnups, so manual input typing is not way. Up to now I decided to neglect the effect of burnup on the gamma transport for a while (mainly because of the lack of input for XCOM), but recently we got a master student who was spending few weeks on investigating the same, and it turned out that the total attenuation coefficient depending on the gamma energy decrease with 1-3% between 0 and 110 MWd/kgU burnup. Which is certainly not huge, nevertheless not negligible. The student was using some matlab script called [xraymu.m](http://www.aprendtech.com/blog/Post3/xraymu2.html) for this, however since for my program, where I need to use these coefficients, is done in python, I would have prefered using XCOM directly from python.
 
Since it was at least 2 years ago that I used Fortran last time, I kept pushing this task ahead, but today I decided that I will look into the code, find out where to implement the input reader and do it. Just in case I googled again (I have done it once before already:)): how to type input in command line with python. Once again I have gotten pygui as a choice (which is powerful, but I used it for some other tasks, it is slow, you need long pauses to make sure every operation is done, so that is really a last resort for some things, but not for this task), and otherwise the keyword "input" just hijacked the query and pointed me to other topics. So yepp, I swallowed and opened the code, and after 5 minutes of trying to find the right variables around 'go to'-s and unindented lines, it just hit me all of a sudden... i want to pipeline a sequence of strings (ie the element and their weight fractions) into XCOM, and that's it. Bash...

For some ad hoc composition the script would look like this

{% highlight bash %}
printf 'spentfuel\n4\n2\nH\n0.1\nO\n0.9\n1\n3\n1\n3\n0.6\n0.8\n0.9\nN\ntest.out\n1\n' | ./XCOM
#4  - want a composition
#2  - number of components, in this case the composition is 10% H, 90% O
#H
#0.1
#O
#0.9  
#1  - accept this
#3  - want own gamma energy list
#1  - typed in from keyboard
#3  - number of lines
#0.6 - in MeV
#0.8
#0.9
#N  - don't save this into file
#test.out - name of the output table
#1 - bye bye
{% endhighlight %}

To interface eg. Serpent burnup data with XCOM, basically one only needs to update the string in printf according to the fuel inventory. I may write about that an other time.

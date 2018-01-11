---
layout: post
title:  "Opening"
date:   2018-01-11 14:00:00 +0100
categories: nuclear python
---

Currently I'm working with methods to identify partial defects in nuclear fuel assemblies. Long story short, partial defect means that some parts of a spent nuclear fuel assembly are removed or replaced with some dummies (may be a steel rod, or a fresh fuel rod), and we are planning to do gamma spectroscopy measurements in order to detect such replacements. Currently, I am running [MCNP](https://mcnp.lanl.gov/) simulations to compute the gamma particle transport from a spent fuel source. MCNP is a particle transport code, which allows the user to define generic geometries in which the particle transport takes place. Since I have to run a large amount of simulations (for different Burnup and Cooling times of the spent fuel), I usually use python to script my MCNP inputs and the calls to the code.

Currently I would like to run simulations for random partial defect patterns as well in 17x17 type PWR assemblies. In MCNP the user can define "universes" (which basically mean a well defined structure, which one can fill to any container, this facilitates the definition of repeated structures). In my case the fuel rods are assigned with "1", the dummy rods are "2", and the control rod positions are either "4" or "6" (depending whether the control rod is inserted or not in that position). Then in the MCNP input one needs to define the pin-wise structure of the assembly. For example for an assembly, which only contains 25 control rod positions which are randomly inserted or not inserted (the location of these positions is defined by the manufacturer) and 17x17-25 fuel pins, the related part of the input would look like this:

         1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
         1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
         1 1 1 1 1 4 1 1 6 1 1 6 1 1 1 1 1
         1 1 1 4 1 1 1 1 1 1 1 1 1 4 1 1 1
         1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
         1 1 4 1 1 6 1 1 6 1 1 6 1 1 4 1 1
         1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
         1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
         1 1 4 1 1 4 1 1 6 1 1 4 1 1 6 1 1
         1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
         1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
         1 1 6 1 1 6 1 1 6 1 1 4 1 1 6 1 1
         1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
         1 1 1 4 1 1 1 1 1 1 1 1 1 4 1 1 1
         1 1 1 1 1 4 1 1 4 1 1 6 1 1 1 1 1
         1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
         1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1

Now, I wanted to have a python function which can create such strings what I can later on replace into some reference input file. I define the positions of each pin with one number (from 1 to 289 -that is 17X17-). The function below calculates the number of pins to be replaced with dummies from the size of the defect (in percentage), then creates a list to hold all the possible fuel rod positions (based on the 25 given control rod positions). Then it creates a random sample of them with random.sample() (keep in mind that the python2 version of this function requires an intager as the size of the random subset), then finally it builds up a string to match the above given input structure (the control rod insert is decided with random.choice()).

{% highlight python %}
def createRandomDefect(perc):
    #universe numbers:
    #1: Fuel
    #2: Dummy
    #4: CR Insert
    #6: CR Guide
    import random
    import math
    ND=int(math.ceil((17*17-25)*(perc/100.0))) #number of dummies int() is needed for python2
    SubAsStr=''
    CrPos=[40,43,46,55,65,88,91,94,97,100,139,142,145,148,151,190,193,196,199,202,225,235,244,247,250]
    FuelPos=[]
    for i in range(17*17):
        j=i+1
        if j not in CrPos:        
            FuelPos.append(j)
    DummyPos=random.sample(FuelPos,ND)
    col=1
    for i in range(17*17):
        j=i+1
        if col==1:
            SubAsStr=SubAsStr+'        '
        if j in CrPos:
            SubAsStr=SubAsStr+' '+str(random.choice([4,6]))
        elif j in DummyPos:
            SubAsStr=SubAsStr+' '+str(2)
        else:
            SubAsStr=SubAsStr+' '+str(1)
        if col==17:
            SubAsStr=SubAsStr+'\n'
            col=0
        col=col+1
    SubAsStr=SubAsStr[:-1]
        
    return SubAsStr,17*17-25-ND   #N of source pins
{% endhighlight %}


Usage is straightforward:

{% highlight python %}
pattern,NRod=createRandomDefect(30)
print(pattern)
{% endhighlight %}

         1 2 1 1 1 1 2 2 1 1 2 2 1 2 1 2 1
         1 1 2 1 1 1 2 2 1 1 2 1 1 1 1 1 1
         2 1 1 2 1 6 2 1 6 2 1 4 1 1 1 1 1
         2 1 1 4 2 2 1 2 1 1 1 1 2 4 2 1 1
         1 1 2 1 2 1 1 1 1 1 1 1 1 1 2 1 1
         1 1 6 2 1 4 1 1 4 2 1 6 1 1 6 1 1
         2 1 1 2 2 2 1 1 1 1 1 2 1 2 2 2 2
         2 1 1 1 1 1 2 2 1 1 1 1 1 1 1 1 1
         2 2 6 1 1 4 1 2 6 1 1 6 1 1 6 1 1
         1 2 1 1 2 1 2 1 1 2 1 1 1 2 2 1 2
         1 1 1 2 1 1 2 1 1 1 2 1 1 1 1 1 2
         2 2 4 1 1 6 2 1 6 2 1 6 2 1 4 1 1
         2 1 1 1 1 1 1 1 1 1 1 2 1 2 1 2 1
         1 2 2 6 2 1 1 1 1 1 1 1 1 6 1 2 1
         1 1 1 1 1 4 1 2 4 1 1 6 1 2 1 1 2
         1 1 1 1 2 1 1 1 1 1 2 2 2 1 2 2 1
         2 1 1 1 2 1 1 2 1 1 2 1 1 2 1 2 1

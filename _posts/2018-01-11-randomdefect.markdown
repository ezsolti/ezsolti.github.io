---
layout: post
title:  "Opening"
date:   2018-01-11 14:00:00 +0100
categories: nuclear python
---

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

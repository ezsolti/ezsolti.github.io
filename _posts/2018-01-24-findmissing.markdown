---
layout: post
title:  "Find where my computations stopped"
date:   2018-01-11 14:00:00 +0100
categories: scripts
tags: nuclear scripts
---

I am running most of my heavy computations on a cluster, which sometimes gets rebooted due to various reasons. This posts summarizes the method to find which computations weren't done at the time of the rebooting.

When I'm creating some synthetic data for multi variate analysis, usually I try to follow some simple pattern to create input names for MCNP. I have some tagging for the type of the computations (eg. 'm5' for mcnpx with F5 tally), then a tag for the case I'm running (eg. 'O' for the original or reference case), and then finally some iteration number. So finally I end up having input file names like 'm5O115' and the corresponding mcnpx output would be 'm5O115o'. Then I have some main python script to iterate through a set of parameters to be modified in the input. This script creates the files in a loop, then connects through ssh to one of the computing nodes on the cluster, runs the computations, exctracts the output, and goes to the next parameter to create the next input etc. We have several nodes, so let's say I want to run 120 inputs, then I would run the same script slightly modified by changing the name of the node to which I want to connect and by including a conditional (if i=>20 and i<40:). In this example I would run the script 6 times, and since other people may use the node as well, the progress of my computations varies from node to node. If the cluster shuts down or reboots, it is not the most pleasant thing to 'ls' the folder where the inputs, outputs and run tape files are stored and try to see which inputs were created and which weren't.

So I would see after 'ls' a bunch of file names, usually not well ordered, like.
m5O0     m5O102   m5O105r  m5O109o  m5O112   m5O115r  m5O14r  m5O18o  m5O21   m5O24r  m5O28o  m5O31   m5O34r  m5O38o  m5O4o   m5O60r  m5O64o  m5O68   m5O70r  m5O82o  m5O86   m5O89r  m5O92o  m5O9o...

Of course I could set the handles neatly, but who keeps in mind 'ls' handles? Not me:) And still, my eyes would tear looking through the list...

Honestly, I have done it two times, and I am not proud of myself. But today I got fed up, so I decided to take that few minutes to write a neat script, and save the tears for future reboots.

path='/run/user/1000/gvfs/sftp:host=galactica.physics.uu.se/home/elter/mcnp_comp/04_SAGE_Clab-like/finalize11_partialdef_Randomize'

{% highlight python %}
import os
import re
os.chdir(path)
os.chdir(path+'/mcnpf5_files/Orig')

files=os.listdir()
indices=[]
for file in files:
    index=int(re.findall(r'\d+', file)[1])
    if index not in indices:
        indices.append(index)
        indices.sort()

missing=[]
for i in range(120):
    if i not in indices:
        missing.append(i)

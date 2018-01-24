---
layout: post
title:  "Find where my computations stopped"
date:   2018-01-24 20:00:00 +0100
categories: scripts
tags: file handling
---

I am running most of my heavy computations on a cluster, which sometimes gets rebooted due to various reasons. This posts summarizes the method to find which computations haven't been finished yet when the cluster rebooted.

### Short background

When I'm creating some synthetic data for multi variate analysis, usually I try to follow some simple pattern to create input names for MCNP (the software I use). In the name I have some tag for the type of the computations (eg. 'm5' for MCNP computation with F5 tally), then a tag for the case I'm running (eg. 'O' for the original or reference case), and then finally some iteration number. So finally I end up having input file names like 'm5O115' and the corresponding MCNP output and run tape file would be 'm5O115o' and 'm5O115r', respectively. 
For running the computations, I have some main python script to iterate through a set of parameters to be modified in the input. This script creates the files in a loop, then connects through ssh to one of the computing nodes on the cluster, runs the computations, exctracts the output, and goes to the next parameter to create the next input etc. Several nodes are available for me, so let's say I want to run 120 inputs, then I would run the same script slightly modified by changing the name of the node to which I want to connect and by including a conditional (`if i=>20 and i<40:`). Then, I would run the script 6 times for 6 different nodes and conditions (0-20, 20-40, 40-60, you get it), and since other people may use the nodes as well, the progress of my computations varies from node to node. If the cluster shuts down or reboots, it is not the most pleasant thing to 'ls' the folder where the inputs, outputs and run tape files are stored and try to see which inputs were created and which weren't.

### Actual task

So I would see after 'ls' a bunch of file names, usually not well ordered, like this:

m5O0     m5O102   m5O105r  m5O109o  m5O112   m5O115r  m5O14r  m5O18o  m5O21   m5O24r  m5O28o  m5O31   m5O34r  m5O38o  m5O4o   m5O60r  m5O64o  m5O68   m5O70r  m5O82o  m5O86   m5O89r  m5O92o  m5O9o...

From which I should spot whether m5O37, m5O37o and m5O37r are also there.

Of course I could set the options of 'ls' neatly, but who keeps in mind those options? Not me:) And still, my eyes would be filled with tears looking through the list...

Honestly, I have done this two times, and I am not proud of myself. But today I got fed up, so I decided to take that few minutes to write a neat script, and save the tears in case there will be some reboots in future. And actually, this few lines of code demonstrates so nicely why I like to work with python.


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

missing=[i for i in range(120) if i not in indices]
print(missing)
{% highlight python %}

(Note: for the given task actually there was some extra checks needed: check whether for a given index all the three files - ie. input, output, runtape - were created, and if yes check whether the output was actually fully completed, nevertheless I skipped that part here.)

### Explanation

There is not much to explain here. Because the code explains itself. Maybe I would only highlight the line

{% highlight python %}
index=int(re.findall(r'\d+', file)[1])
{% highlight python %}

So again file can be for example 'm5O115o', the regexp will find all the numbers in the string, and gives back ['5','115'], out of which I need the second element (since the first element '5' is irrelevant), what I want to convert into an integer. 

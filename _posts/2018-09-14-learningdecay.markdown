---
layout: post
title:  "Decay of learning"
date:   2018-03-21 11:00:00 +0100
categories: scripts
---

I usually find myself becoming quite enthusiastic about something quickly, then looking up tutorials, starting them, and stopping it after a while. Just to give an example, I have much more unfinished coursera courses than finished ones.  I guess this behaviour is not characterisitc only for me. Nevertheless, there are some tutorials one "needs" to finish, ones what you actually plan to use on a daily basis. Yesterday I went through [Dan Becker's machine learning tutorial on kaggle](https://www.kaggle.com/learn/machine-learning). Well, I have an interesting relationship with machine learning and sklearn... I am fiddling around with it almost a year ago now, I did parts of Andrew Ng's coursera course to help me understand the underlying theory, but then I started using scikit-learn on my own. Then I got this mail from kaggle that they gonna have some advanced course, and one should know things what are in the basic course. So well, I figured, maybe it is worth checking what is in the basic course:)

Nevertheless, after a while I started to read the number of views on each chapter, and I observed that there is a real decay there. Which was kind of surprising, since this is an extremely short tutorial, literally just few hours. 

![useful image]({{ site.url }}/assets/learningdecay.png)

{% highlight python %}
data=[[1, 282405,  'How Models Work'],
[2, 227382,  'Explore your data'],
[4, 108933,  'Your first machine learning model'],
[6, 78478,  'Model Validation'],
[8, 63490,   'Under and overfitting'],
[10, 59584,  'Random Forests'],
[13, 81739,  'Handling missing values'],
[14, 57043,  'Using Categorical Data with One Hot Encoding'],
[15, 48362,  'XGBoost'],
[16, 29441,  'Partial Dependence Plots'],
[17, 20600,  'Pipelines'],
[18, 22662,  'Cross-Validation'],
[19, 23557,  'Data Leakage']]

data=pd.DataFrame(data,columns=['ex','views','exnames'])

ax =plt.subplot()
ax.plot(data.ex,data.views,'ko--')
ax.set_xlabel('exercise')
ax.set_ylabel('views')
ax.set_xticks(data.ex)
ax.set_xticklabels(data.exnames, rotation=90)
plt.savefig('learningdecay.png',dpi=300,bbox_inches='tight')
{% endhighlight %}



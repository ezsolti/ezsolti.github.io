---
layout: post
title:  "Duolingo API"
date:   2018-03-21 11:00:00 +0100
categories: scripts
---

I am an enthusiastic swedish learner on Duolingo. It is far not the best way to practice a language,  rather just a piece in the puzzle, however most of the days I don't have time or strength to listen to the swedish radio or read news, and I am really bad at sustaining a conversation in swedish (everybody speaks english, why should I limit myself in experssing my thoughts?). Nevertheless, Duolingo provides a way to force me for a daily practice of few minutes, and at least my vocabulary gets strengthened, which is definitely useful for everyday life in Sweden (reading documents etc). That said, I have a 679 day streak on Duolingo currently, and I am afraid that if I'm loosing it, I will loose my motivation to keep at least these few minutes of daily practice as well. Duolingo has one option to keep up the streak on days, when one cannot do the daily practice: the streak freeze. However, this option gives only one extra day buffer, since one needs to buy a new streak freeze (fortunately, not for real money) after using one. Hence, if the user is unable to login for two consecutive days, the streak is gone. Interestingly, with my soon 2 years long streak, there was only one day when I used a streak freeze (and even that was due to a server failure of Duolingo, when my daily XP didn't get registered), which seems crazy; this basically means that for 2 years every day I had possibility to login, regardless whether I was travelling somewhere or not.

Since I am planning to go on a longer trip to Mexico, I was wondering what if I won't be able to login for two days. The chance for that is slim, but still I started to wonder, and anyhow, if not this time, maybe for another trip I can end up in that situation. I know, I know, this is a real first world problem, loosing a duolingo streak, big deal:)

I quickly googled Duolingo API, and luckily in every community nowadays you can find at least one geek, who already provided a solution to your worries. There is an unoffical [Duolingo API](https://github.com/KartikTalwar/Duolingo), which allows you to buy streaks from python. Perfect. It is anyhow worth playing with it, since one can get control over the learnt words etc, so certainly some nice applications could be built around it. However for me the important thing is that with three lines I can buy the streak freeze. Nothing else to do just put the script in crontab to be launched every morning from a computer which will be connected to the network for the days I'm abroad (and make sure that I have enough Duolingo toy-money to purchase the streak, but this doesn't really concern me).

{% highlight python %}
import duolingo
lingo = duolingo.Duolingo('username',password='*******')
lingo.buy_streak_freeze()
{% endhighlight %}

Note: when installing it with `$ pip install duolingo-api`, some old version gets installed, which does not contain the buy_streak_freeze() method for the Duolingo object, so I would advice downloading the source from the github link above.

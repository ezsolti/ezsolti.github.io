---
layout: post
title:  "Compile ENDF decay data for Serpent2"
date:   2018-09-21 11:00:00 +0100
categories: scripts
---

I am using ENDF-B-VI.8 decay data in Serpent2 depletion calculations. The reason is simply because that is what we have on our cluster. Lately, I wanted to make some studies on air activation next to a neutron generator, and I found that several, possibly important nuclides are not included in the decay data file (eg. N-13, which decays quickly, nevertheless has a quite strong gamma energy, and a nonnegligible amount is produced from N14(n,2n) reactions). So I figured it is time to download newer data. Decay data is available from [IAEA](https://www-nds.iaea.org/public/download-endf/ENDF-B-VIII.0/decay/), unfortunately not as a neat file  how I expected... each nuclide has its info in a separate file, zipped, just in case.

I wrote a quick script, which parses for the links of the zips, unzips them, and puts everything in one .dat file. Later I found there is an index page as well, which would have made the script a bit simpler (no need for the condition to check whether the link ends with 'zip'), but well, this works.


{% highlight python %}
iaeaurl='https://www-nds.iaea.org/public/download-endf/ENDF-B-VIII.0/decay/'
path='/home/zsolt/Documents/useful_misc/endfdata/'

import requests
r = requests.get(iaeaurl) 
data = r.content  
data = data.decode('UTF-8')

from bs4 import BeautifulSoup as Soup
html = Soup(data, 'html.parser')
zips=[a['href'] for a in html.find_all('a')]

ziptodown=[]
for z in zips:
    if z[-3:]=='zip':
        ziptodown.append(z)
        
import zipfile

mainstr=''
for z in ziptodown:
    print('downloading... '+z)
    r = requests.get(iaeaurl+z, allow_redirects=True)
    print('done')
    open(path+z, 'wb').write(r.content)
    zip_ref = zipfile.ZipFile(path+z, 'r')
    zip_ref.extractall(path)
    zip_ref.close()
    endfnuc=open(path+z[:-3]+'dat').read()
    mainstr=mainstr+endfnuc

open('endfdecay.dat','w').write(mainstr)
{% endhighlight %}

I did some tests on an infinite PWR depletion problem, to see the impact of the new library. It is actually not negligble. Also, now I will have quite a few new nuclides in my inventories, for example thorium isotopes (L):) Also, I got my stuffs for the air activation study.

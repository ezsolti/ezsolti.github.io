Getting started
===============

Below you can find a basic example and the working principle of ``tkgeom``.

Units
-----

All length is in cm, densities in g/cm3, energy in MeV.

Usage
-----

First, one needs to import the feign modules.

.. code-block:: python

   from tkgeom.geometry import *

Then one can define Points, Segments, Circles, Rectangles.

.. code-block:: python

   p=Point(3,4)
   q=Point(5,6)
   p.distance(q)

which will calculate the distance

.. math::
   d=\sqrt{(x_p-x_q)^2+(y_p-y_q)^2}

where :math:`x_p` and :math:`x_q` are the ``x`` coordinates and :math:`y_p` and :math:`y_q` are the ``y`` coordinates. 

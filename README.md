Collaborative Filtering 
============================================

A node module, that uses Collaborative filtering for the use of recommendations, it allows you out of the box,
to use distance similarity / pearson/ others or custom one [depending on the need]

It is also provided with a full example of usage and dataset creation.
I hope to provide a working stack [FE + BE] to use this with real-time and cache capabilities

using jSHint, matchdep , stream, grunt.js 

Use this with my permission only

ToC
---------------------

1. [Main app](#main)


<a name="main">Main app</a>
---------------------



points over map:

![](https://raw.githubusercontent.com/xmen4u/dbscan/master/img1.png)

![](https://raw.githubusercontent.com/xmen4u/dbscan/master/img2.png)


Install
```
npm install collaborative_filtering
```

place the ```distance.js``` where ever you want and include it, i've used an iOc style 
so you could adjust it and plug-it in the module


Initialization

we need to initialize the distance object, you can add any distance metric you wish 
to distance.js
```
var readers = require('./recommendations.js'), // creation of the dataset
	Collaborative = require('../lib/collaborative'),
	Distance = require('../lib/distance'),
	collab = new Collaborative(new Distance()),
```
after initialization, you need to create a multi-dimensional vector, an array of arrays:
```[[1,2],[1,4],[2,5],[5,9],...,[10,12]]```
just like the "creation of the data set line", you can find the model inside /models , it looks like:

```


in code we grab it via stream from a line-by-line [newline] structured flat file [so we won't have limit on memory space]
```
// people
	person1 = readers[0],
	person2 = readers[1],
	person7 = readers[6]

console.log('comparing ' + person1.getName() + ' and ' + person2.getName())
console.log('Distance correlation: ' + collab.simDistance(person1,person2))
console.log('Pearson correlation: ' + collab.simPearson(person1,person2))

console.log(collab.getSimiliarItems(readers, person1, 5))
console.log(collab.getRecommendations(readers,person7))

```
finally we run the collaborative filtering, for example "item-based":
```
	[ { rating: 3.4682459444748344, id: 'And Then There Were None' },
	  { rating: 3, id: 'A Tale of Two Cities' },
	  { rating: 2.319573433326274, id: 'The Hobbit' } ]
```
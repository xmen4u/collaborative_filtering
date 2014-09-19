/**
********************************************************************************************
* name:     Main 
********************************************************************************************
* This module is responsible for examples of use
********************************************************************************************
* desc:   using collaborative filtering on a made up books dataset
********************************************************************************************
* code: written by Gil Tamari, you may not use it without my permission, BSD license
* date: oct-2012
********************************************************************************************
**/

var readers = require('./recommendations.js'),
	Collaborative = require('../lib/collaborative'),
	Distance = require('../lib/distance'),
	collab = new Collaborative(new Distance()),
// people
	person1 = readers[0],
	person2 = readers[1],
	person7 = readers[6]

console.log('comparing ' + person1.getName() + ' and ' + person2.getName())
console.log('Distance correlation: ' + collab.simDistance(person1,person2))
console.log('Pearson correlation: ' + collab.simPearson(person1,person2))

console.log(collab.getSimiliarItems(readers, person1, 5))


console.log(collab.getRecommendations(readers,person7))


/*
// beginning of a transformation function to achieve item-based recommendations
function transform(people){
	var items = [],
		temp_items = {},
		i,
		j,
		person_rating_list,
		len = people.length,
		items_len

	for(i = 0; i < len; i++){

		person_rating_list = people[i].getRatingList()
		tems_len = person_rating_list.length

		for(j = 0; j < items_len; j++){
			temp_items[person_rating_list[j].getId()] = {name: people[i].getName(), rating: person_rating_list[j].rating, id: }
		}// for
	}// for


}*/

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

var BookReader = require('../models/BookReader.js')
console.log('comparing ' + person1.getName() + ' and ' + person2.getName())
console.log('Distance correlation: ' + collab.simDistance(person1,person2))
console.log('Pearson correlation: ' + collab.simPearson(person1,person2))

console.log(collab.getSimiliarItems(readers, person1, 5))


console.log(collab.getRecommendations(readers,person7))
console.log(person7)

/// beginning of a transformation function to achieve item-based recommendations
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
		items_len = person_rating_list.length


		for(j = 0; j < items_len; j++){


			if (!temp_items.hasOwnProperty(person_rating_list[j].getId())){
				temp_items[person_rating_list[j].getId()] = new BookReader(person_rating_list[j].getName(),'',person_rating_list[j].getId() )

			}//else
			temp_items[person_rating_list[j].getId()].addBookRating(people[i].getName(), person_rating_list[j].rating)
		}// for
	}// for

	return temp_items

}// transform

var items_based = transform(readers),
		temp_arr = [],
		element

for(element in items_based){
	temp_arr.push(items_based[element])
}

//console.log(collab.getRecommendations(temp_arr,items_based['A Tale of Two Cities']))
console.log(collab.getSimiliarItems(temp_arr, items_based['A Tale of Two Cities']))

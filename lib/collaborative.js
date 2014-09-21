/**
********************************************************************************************
* name:     Collaborative
********************************************************************************************
* This module is responsible for collaborative filtering
********************************************************************************************
* desc:   using user-based filtering [item based can be achieved by flippig the users and their items],
*		  implemented both Distance, Pearson, Tanimoto (in the distance) similarity score
********************************************************************************************
* code: written by Gil Tamari, you may not use it without my permission, BSD license
* date: oct-2012
********************************************************************************************
**/
function Collaborative(distances_instance){
	this.distances = distances_instance

}

// we receive the list of people to compare to, the person to compare with, now many results to bring back
// the similarity function to use and the distance string
// we return a list of people with their score
// it's the "people who bought this also bought ... "
Collaborative.prototype.getSimiliarItems = function(people, person, top_matches_no, similarity_func, distance){
	var i,
		len = people.length,
		similar_people = []


		top_matches_no  = top_matches_no || 5
		similarity_func = similarity_func || this.simPearson
		distance        = distance || 'euclidean'

	if (typeof distance === 'string') {
		distance = this.distances[distance]
	}// if

	for(i = 0; i < len; i++){

		if (people[i].getId() !== person.getId()){
			similar_people.push({similarity_score: similarity_func.call(this,person,people[i],distance) , person: people[i] })
		}// if

	}// for
	// sorting in DESCENDING order
	similar_people.sort(function(a,b){ return b.similarity_score - a.similarity_score})

	return similar_people.slice(0,top_matches_no)
}

// getting recommendations using weighted average
// we multiply by the similarity score of each person the items he HAS that we don't, we sum that score for EACH ITEM
// we also sum for EACH ITEM the similarity score of all the people who owns that item. We then divide the sum of score with the latter sum of
// similarities, PER ITEM. Lastly, we push it to an array and sort it in DESCENDING order, so the best recommendations are at the top
// basically its a wegithed mean [of score] , per item
// so we not only get a list of recommendations, we also get a predicted RATING of the person asking for recommendations!
Collaborative.prototype.getRecommendations = function(people, person, recommendations_no, similarity_func, distance){
	var i,
		j,
		len = people.length,
		other_person_rating_list_len,
		similarity,
		total_similarities = {},
		similar_items = [],
		similar_item,
		other_person_rating_list

	recommendations_no = recommendations_no || 5
	similarity_func    = similarity_func || this.simPearson
	distance           = distance || 'euclidean'

 // running over the items
	for(i = 0; i < len; i++){
		similarity = 0

	  // if these two items aren't the same
		if (people[i].getId() !== person.getId()){
			// calculate the similarity between them!
			similarity = similarity_func.call(this,person,people[i],distance)
		}// if

		// similarity between 2 items
		// is > 0 , there's correlation
		if (similarity > 0){

			other_person_rating_list     = people[i].getRatingList()
			other_person_rating_list_len = other_person_rating_list.length

			// running over the users of the other item
			for(j = 0; j < other_person_rating_list_len; j++){

				// we want to calculate based only on the
				// users that aren't(!) in our current item's list => < 0
				if (person.getRating(other_person_rating_list[j]) < 0){

					// this total is PER ITEM! so even if the other person
					// has 600 other items i don't have, the sum and total, are per item, they won't be repeating themselves
					if (total_similarities.hasOwnProperty(other_person_rating_list[j].getId()) ){

						total_similarities[other_person_rating_list[j].getId()].total += other_person_rating_list[j].rating * similarity
						total_similarities[other_person_rating_list[j].getId()].sum_of_similarities += similarity

					}
					else{
						total_similarities[other_person_rating_list[j].getId()] = { total : 0, sum_of_similarities: 0}
					}// if

				}// if - item wasn't found in my collection
			}// for
		}// if
	}// for


	for(similar_item in total_similarities){
		similar_items.push({
								rating: total_similarities[similar_item].total / total_similarities[similar_item].sum_of_similarities,
								id: similar_item
		})
	}// for

	// sorting in DESCENDING order
	return similar_items.sort(function(a,b){ return b.rating - a.rating})

}

// we need to find the person with the bigger amount of items
// as we will run our checks AGAINST the person with the SMALLER list
Collaborative.prototype.getCurrentOtherPersonRatingAndRatingLists = function(options){
	var person1_rating_list = options.person1.getRatingList(),
		person2_rating_list = options.person2.getRatingList(),
		len = Math.max(person1_rating_list.length, person2_rating_list.length)

	if (person1_rating_list.length === len){
		options.current_person = options.person1
		options.current_person_rating_list = person1_rating_list
		options.other_person = options.person2
		options.other_person_rating_list = person2_rating_list
	}
	else{
		options.current_person = options.person2
		options.current_person_rating_list = person2_rating_list
		options.other_person = options.person1
		options.other_person_rating_list = person1_rating_list
	}// else
}


// returns the distance based similarity score for person 1 and person 2
// person1, person2 - Critic
Collaborative.prototype.simDistance = function(person1, person2, distance){
	// get the list of shared items
	var i,
		other_person_rating_index,
		distances = 0,
		len,
		current_person,
		current_person_rating_list,
		other_person,
		other_person_rating_list,
		options

	options = {person1: person1,
				person2: person2,
				current_person: current_person,
				current_person_rating_list: current_person_rating_list,
				other_person: other_person,
				other_person_rating_list: other_person_rating_list}

	this.getCurrentOtherPersonRatingAndRatingLists(options)
	current_person_rating_list = options.current_person_rating_list
	other_person               = options.other_person
	other_person_rating_list   = options.other_person_rating_list

	len = current_person_rating_list.length

	distance       = distance || 'euclidean'

	if (typeof distance === 'string') {
		distance = this.distances[distance]
	}// if

	for(i = 0; i < len; i++){

		other_person_rating_index = other_person.getRating(current_person_rating_list[i])

		// person2 also ranked that book! , the book has rating, isnt null
		if (other_person_rating_index >= 0){
			distances += distance([other_person_rating_list[other_person_rating_index].rating], [current_person_rating_list[i].rating], true)
		}// if
	}// for

	if (distances){
		// distances gives us the distance between 2 vectors [ratings],
		// we want people with SIMILAR taste, to get higher score, so we need to INVERT the distances (closer == bigger values)
		// in order not to have 1/0 , we add 1 to the denominator
		// thus:
		return 1 / (1 + Math.sqrt(distances)) // <== SIMILARITY SCORE
	}// if
	return 0
}

// a more sophisticated way of determining the similarity between people's interests
// is to use a Pearson correlation coefficient
// the coefficient is a measure of how well two sets of data fit on a single line
// the formula is more complicated than Euclid distance, for instance,  but it tends to give
// better results in situation when the data ISN'T well noramilzed , if ranks are routinely
// more harsh than average. It plots a "best-fit line" as it comes close to all the points as possible
// The Pearson correlation, also corrects for "Grade Inflation", which means that if someone tends to give
// higher ratings than someone else, there can still be perfect correlation if the difference between their
// scores is consistent (thus the de-normalization factor). The Distance Similarity Score would say they are
// dissimilar, because one is harsher than the other.
// 1 = pereft match => similar
// 0 = no correlation => dissimilar
// -1 = inverse correlation
Collaborative.prototype.simPearson = function(person1, person2, distance){
	var	i,
		other_person_rating_index,
		similiarity_vector = [],
		sum1 = 0,
		sum2 = 0,
		sum1_sq = 0,
		sum2_sq = 0,
		sum_prod = 0,
		nom,
		denom,
		len,
		current_person,
		current_person_rating_list,
		other_person,
		other_person_rating_list,
		options

	distance = distance || null // we don't use it here, not at this stage
	options = {person1: person1,
				person2: person2,
				current_person: current_person,
				current_person_rating_list: current_person_rating_list,
				other_person: other_person,
				other_person_rating_list: other_person_rating_list}

	this.getCurrentOtherPersonRatingAndRatingLists(options)
	current_person_rating_list = options.current_person_rating_list
	current_person             = options.current_person
	other_person               = options.other_person
	other_person_rating_list   = options.other_person_rating_list

	len = current_person_rating_list.length

	// running over the current person rating list
	for(i = 0; i < len; i++){

		other_person_rating_index = other_person.getRating(current_person_rating_list[i])

		// person2 also ranked that book! , the book has rating, isnt null
		if (other_person_rating_index >= 0){
			similiarity_vector.push({current: i, other: other_person_rating_index})
			// sum of the ratings of each vector
			//sum1 = this.distances.manhattan([current_person_rating_list[i].rating])
			//distances += distance([other_person_rating_list[other_person_rating_index].rating], [current_person_rating_list[i].rating], true)
		}// if
	}// for

	len = similiarity_vector.length

	if(len === 0){ return 0} // no common ratings => dissimilar

	// running over the similarities vector
	for(i = 0; i < len; i++){

		// add up all the preferences
		sum1     += this.distances.manhattan([current_person_rating_list[similiarity_vector[i].current].rating], [0])
		sum2     += this.distances.manhattan([other_person_rating_list[similiarity_vector[i].other].rating], [0])


		// sum up the squares
		sum1_sq  += this.distances.euclidean([current_person_rating_list[similiarity_vector[i].current].rating], [0], true)
		sum2_sq  += this.distances.euclidean([other_person_rating_list[similiarity_vector[i].other].rating], [0], true)

		// summing the products
		sum_prod += current_person_rating_list[similiarity_vector[i].current].rating * other_person_rating_list[similiarity_vector[i].other].rating
	}

	// calculating the Pearson correlation
	// http://en.wikipedia.org/wiki/Pearson_product-moment_correlation_coefficient
	// convenient single-pass algorithm for calculating sample correlation, but, depending on the numbers involved,
	//it can sometimes be numerically unstable.

	nom   = sum_prod - ( sum1 * sum2 / len)
	denom = Math.sqrt( ( sum1_sq - Math.pow(sum1,2) / len ) * ( sum2_sq - Math.pow(sum2,2) / len ) )

	return denom === 0? 0 : nom / denom

}

// Jaccard coefficient
//http://en.wikipedia.org/wiki/Jaccard_index

module.exports = Collaborative

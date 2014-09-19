/**
********************************************************************************************
* name:     Book Reader model
********************************************************************************************
* This module is responsible for general user [it can be changed to a parent object so book
*			reader would prototypical inherit it
********************************************************************************************
* desc:   a model of a user, that reads books and has a list of books [plain JSONs]
********************************************************************************************
* code: written by Gil Tamari, you may not use it without my permission, BSD license
* date: oct-2012
********************************************************************************************
**/
function BookReader(first_name, last_name, id, books_BookReader_list){
	this.first_name  = first_name
	this.last_name   = last_name
	this.name        = this.first_name + ' ' + this.last_name
	this.id          = id || 1
	this.books_list = books_BookReader_list || []
}
BookReader.prototype.getId = function(){ return this.id}
BookReader.prototype.getName = function(){ return this.name}
// book rating = 1..5
BookReader.prototype.addBookRating = function(book_name, book_rating){
	this.books_list.push({name: book_name, rating: book_rating, getId: function(){ return book_name} })
}
BookReader.prototype.getBookRatingsList = function(){
	return this.books_list
}
BookReader.prototype.getRatingList = function(){return this.getBookRatingsList()}

BookReader.prototype.getBookRating = function(book_name){
	var i
		len = this.books_list.length;

	for(i = 0; i < len; i++){
		if (this.books_list[i].name === book_name){
			return i
		}// if
	}// for
	return -1
}
BookReader.prototype.getRating = function(book){return this.getBookRating(book.name)}

module.exports = BookReader

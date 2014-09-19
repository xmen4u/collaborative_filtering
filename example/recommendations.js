/**
********************************************************************************************
* name:     BookReader 
********************************************************************************************
* This module is responsible for bookreader
********************************************************************************************
* desc:   using user-based filtering [item based can be achieved by flippig the users and their items],
*		  implemented both Distance, Pearson, Tanimoto (in the distance) similarity score
********************************************************************************************
* code: written by Gil Tamari, you may not use it without my permission, BSD license
* date: oct-2012
********************************************************************************************
**/
var BookReader = require('../models/BookReader.js')
var readers =[],
	temp_reader

temp_reader = new BookReader('Gil', 'Tamari',1)
temp_reader.addBookRating('A Tale of Two Cities', 2.5)
temp_reader.addBookRating('The Lord of the Rings', 3.5)
temp_reader.addBookRating('The Hobbit', 3.0)
temp_reader.addBookRating('The Catcher in the Rye', 3.5)
temp_reader.addBookRating('Harry Potter', 2.5)
temp_reader.addBookRating('And Then There Were None', 3.0)

readers.push(temp_reader)

temp_reader = new BookReader('Kanye', 'West',2)
temp_reader.addBookRating('A Tale of Two Cities', 3.0)
temp_reader.addBookRating('The Lord of the Rings', 3.5)
temp_reader.addBookRating('The Hobbit', 1.5)
temp_reader.addBookRating('The Catcher in the Rye', 5.0)
temp_reader.addBookRating('Harry Potter', 3.5)
temp_reader.addBookRating('And Then There Were None', 3.0)

readers.push(temp_reader)

temp_reader = new BookReader('Jay', 'Z',3)
temp_reader.addBookRating('A Tale of Two Cities', 2.5)
temp_reader.addBookRating('The Lord of the Rings', 3.0)
temp_reader.addBookRating('The Catcher in the Rye', 3.5)
temp_reader.addBookRating('And Then There Were None', 4.0)

readers.push(temp_reader)

temp_reader = new BookReader('Tupac', 'Shakur',4)
temp_reader.addBookRating('The Lord of the Rings', 3.5)
temp_reader.addBookRating('The Hobbit', 3.0)
temp_reader.addBookRating('The Catcher in the Rye', 4.0)
temp_reader.addBookRating('Harry Potter', 2.5)
temp_reader.addBookRating('And Then There Were None', 4.5)

readers.push(temp_reader)


temp_reader = new BookReader('Dr', 'Dre',5)
temp_reader.addBookRating('A Tale of Two Cities', 3.0)
temp_reader.addBookRating('The Lord of the Rings', 4.0)
temp_reader.addBookRating('The Hobbit', 2.0)
temp_reader.addBookRating('The Catcher in the Rye', 3.0)
temp_reader.addBookRating('Harry Potter', 2.0)
temp_reader.addBookRating('And Then There Were None', 3.0)

readers.push(temp_reader)


temp_reader = new BookReader('Eminem', '',6)
temp_reader.addBookRating('A Tale of Two Cities', 3.0)
temp_reader.addBookRating('The Lord of the Rings', 4.0)
temp_reader.addBookRating('The Catcher in the Rye', 5.0)
temp_reader.addBookRating('Harry Potter', 3.5)
temp_reader.addBookRating('And Then There Were None', 3.0)

readers.push(temp_reader)


temp_reader = new BookReader('Run the', 'Jewels',7)
temp_reader.addBookRating('The Lord of the Rings', 4.5)
temp_reader.addBookRating('The Catcher in the Rye', 4.0)
temp_reader.addBookRating('Harry Potter', 1.0)

readers.push(temp_reader)

module.exports = readers







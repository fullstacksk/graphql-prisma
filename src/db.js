//demo users
const users = [
	{
		id: '1',
		name: 'Shailendra Kumar',
		email: 'shailendra@example.com',
		location: 'Bengaluru, India',
		age: 23,
		totalBooks: 11
	},
	{
		id: '2',
		name: 'Rahul Kumar',
		email: 'Rahul@example.com'
	},
	{
		id: '3',
		name: 'Shabrish Kumar',
		email: 'Shabrish@example.com'
	}
];
//demo books data
const books = [
	{
		id: 'book1',
		title: 'Rich Dad Poor Dad',
		releaseYear: 2020,
		author: '2',
		inStock: true,
		published: true,
		rating: 4.8,
		price: 999.45
	},
	{
		id: 'book2',
		title: 'Javascript ES6',
		releaseYear: 2020,
		author: '2',
		inStock: false,
		published: false,
		rating: 4.8,
		price: 456
	},
	{
		id: 'book3',
		title: 'Datastructure with JS',
		releaseYear: 2020,
		author: '3',
		published: true,
		inStock: true,
		price: 999.45
	}
];
//demo reviews
const reviews = [
	{
		id: '10',
		text: 'Nice Book',
		author: '1',
		book: 'book1'
	},
	{
		id: '20',
		text: 'Nice Book',
		author: '1',
		book: 'book2'
	},
	{
		id: '30',
		text: 'Nice Book',
		author: '2',
		book: 'book1'
	},
	{
		id: '40',
		text: 'Nice Book',
		author: '3',
		book: 'book3'
	}
];

const db = { users, books, reviews };
export { db as default };

const Review = {
	author(parent, args, { db }, info) {
		return db.users.find((user) => {
			return user.id === parent.author;
		});
	},
	book(parent, args, { db }, info) {
		return db.books.find((book) => {
			return book.id === parent.book;
		});
	}
};

export { Review as default };

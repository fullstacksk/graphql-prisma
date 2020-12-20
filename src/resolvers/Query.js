const Query = {
	users(parent, args, { db }, info) {
		if (!args.query) {
			return db.users;
		}
		return db.users.filter((user) => {
			return user.name.toLowerCase().includes(args.query.toLowerCase());
		});
	},
	books(parent, args, { db }, info) {
		if (!args.query) {
			return db.books;
		}
		return db.books.filter((book) => {
			return book.title.toLowerCase().includes(args.query.toLowerCase());
		});
	},
	reviews(parent, args, { db }, info) {
		if (!args.query) {
			return db.reviews;
		}
		return db.reviews.filter((review) => {
			return review.text.toLowerCase().includes(args.query.toLowerCase());
		});
	}
};

export { Query as default };

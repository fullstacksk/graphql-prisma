const Subscription = {
	review: {
		subscribe(parent, { bookId }, { pubsub, db }, info) {
			const book = db.books.find((book) => book.id === bookId);
			if (!book) {
				throw new Error('Book not found');
			}

			return pubsub.asyncIterator(`review ${bookId}`);
		}
	},

	book: {
		subscribe(parent, { userId }, { db, pubsub }, info) {
			return pubsub.asyncIterator(`book`);
		}
	}
};

export { Subscription as default };

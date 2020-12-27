import getUserId from '../utils/getUserId';
const User = {
	email: {
		fragment: 'fragment userId on User {id}',
		resolve(parent, args, { request }, info) {
			const userId = getUserId(request, false);
			if (userId && userId === parent.id) return parent.email;
			else return null;
		}
	},
	posts: {
		fragment: 'fragment userId on User {id}',
		resolve(parent, args, { prisma, request }, info) {
			const userId = getUserId(request, false);
			return prisma.query.posts({
				where: {
					author: { id: parent.id },
					published: true
				}
			});
		}
	}
};

export { User as default };

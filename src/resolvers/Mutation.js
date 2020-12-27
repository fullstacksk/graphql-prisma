import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUserId from '../utils/getUserId';

const Mutation = {
	async loginUser(parent, args, { prisma }, info) {
		const [ user ] = await prisma.query.users({
			where: {
				email: args.data.email
			}
		});
		if (!user) throw new Error('Invalid credentials');

		const isMatch = await bcrypt.compare(args.data.password, user.password);
		if (!isMatch) throw new Error('Invalid credentials');
		return {
			user,
			token: await jwt.sign({ userId: user.id }, 'thisismysecret')
		};
	},
	async createUser(parent, args, { prisma }, info) {
		const emailTaken = await prisma.exists.User({ email: args.data.email });

		if (emailTaken) {
			throw new Error('Email taken');
		}

		if (args.data.password.length < 8) throw new Error('Password must be at least of 8 characters');

		const password = await bcrypt.hash(args.data.password, 10);

		const user = await prisma.mutation.createUser({
			data: {
				...args.data,
				password
			}
		});

		return {
			user,
			token: jwt.sign({ userId: user.id }, 'thisismysecret')
		};
	},
	async deleteUser(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const userExist = await prisma.exists.User({ id: userId });

		if (!userExist) {
			throw new Error('User not found');
		}

		return prisma.mutation.deleteUser(
			{
				where: { id: userId }
			},
			info
		);
	},
	async updateUser(parent, { data }, { prisma, request }, info) {
		const userId = getUserId(request);
		const userExists = await prisma.exists.User({ id: userId });

		if (!userExists) {
			throw new Error('User not found');
		}

		return prisma.mutation.updateUser(
			{
				where: { id: userId },
				data
			},
			info
		);
	},
	async createPost(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const userExists = await prisma.exists.User({ id: args.data.author });

		if (!userExists) {
			throw new Error('User not found');
		}

		return prisma.mutation.createPost(
			{
				data: {
					...args.data,
					author: {
						connect: {
							id: userId
						}
					}
				}
			},
			info
		);
	},
	async deletePost(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const postExists = await prisma.exists.Post({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!postExists) throw new Error('Unable to delete the post');

		return prisma.mutation.deletePost(
			{
				where: { id: args.id }
			},
			info
		);
	},
	async updatePost(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const { id, data } = args;
		const postExists = await prisma.exists.Post({
			id,
			author: {
				id: userId
			}
		});

		if (!postExists) {
			throw new Error('Unable to update the post');
		}

		const postPublished = await prisma.exists.Post({
			id,
			author: { id: userId },
			published: true
		});

		if (postPublished && data.published === false) {
			const comments = await prisma.mutation.deleteManyComments({
				where: {
					post: { id }
				}
			});
			console.log(JSON.stringify(comments));
		}

		return prisma.mutation.updatePost(
			{
				where: { id },
				data
			},
			info
		);
	},
	async createComment(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const postExists = await prisma.exists.Post({
			id: args.data.post,
			published: true
		});

		if (!postExists) {
			throw new Error('Unable to comment on this post');
		}

		return prisma.mutation.createComment(
			{
				data: {
					...args.data,
					author: {
						connect: { id: userId }
					},
					post: {
						connect: { id: args.data.post }
					}
				}
			},
			info
		);
	},
	async deleteComment(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const commentExist = await prisma.exists.Comment({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!commentExist) {
			throw new Error('Comment not found');
		}

		return prisma.mutation.deleteComment(
			{
				where: { id: args.id }
			},
			info
		);
	},
	async updateComment(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const { id, data } = args;
		const commentExist = await prisma.exists.Comment({
			id,
			author: {
				id: userId
			}
		});

		if (!commentExist) {
			throw new Error('Unable to update the comment');
		}

		return prisma.mutation.updateComment(
			{
				where: { id },
				data
			},
			info
		);
	}
};

export { Mutation as default };

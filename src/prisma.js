import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: 'http://localhost:4466/blogs/dev',
	secret: 'prismablogisthebestapi'
});

export { prisma as default };

// const createPostForUser = async (authorId, data) => {
// 	const userExists = await prisma.exists.User({ id: authorId });

// 	if (!userExists) throw new Error(`User with id ${authorId} doesn't exist`);

// 	const post = await prisma.mutation.createPost(
// 		{
// 			data: {
// 				...data,
// 				author: {
// 					connect: {
// 						id: authorId
// 					}
// 				}
// 			}
// 		},
// 		'{ author { id name email posts { id title body published comments { id text } } } }'
// 	);

// 	return post.author;
// };

// const updatePostForUser = async (postId, data) => {
// 	const postExists = await prisma.exists.Post({
// 		id: postId
// 	});

// 	if (!postExists) throw new Error(`No post found with id ${postId}`);

// 	const post = await prisma.mutation.updatePost(
// 		{
// 			where: {
// 				id: postId
// 			},
// 			data
// 		},
// 		'{ author { id name email posts { id title body published comments { id text } } } }'
// 	);

// 	return post.author;
// };

// createPostForUser('ckiwvns0u003e0976o5qskis9', {
// 	body: 'You should read this bestselling book.',
// 	title: 'Reach Dad & Poor Dad',
// 	published: false
// })
// 	.then((user) => {
// 		console.log(JSON.stringify(user, undefined, 2));
// 	})
// 	.catch((err) => console.log(err));

// updatePostForUser('ckiwvts2j004t09763f6j59cj', {
// 	published: true
// })
// 	.then((user) => {
// 		console.log(JSON.stringify(user, undefined, 2));
// 	})
// 	.catch((err) => console.log(err));

import jwt from 'jsonwebtoken';

const getUserId = (request, requiredAuth = true) => {
	const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization;

	if (header) {
		const token = header.replace('Bearer ', '');

		const decoded = jwt.verify(token, 'thisismysecret');
		return decoded.userId;
	}

	if (requiredAuth) throw new Error('Authentication required');
	return null;
};

export { getUserId as default };

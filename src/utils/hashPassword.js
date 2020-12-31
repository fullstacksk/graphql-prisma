import bcrypt from 'bcryptjs';

export default (password) => {
	if (password.length < 8) throw new Error('Password must be at least of 8 characters');

	return bcrypt.hash(password, 10);
};

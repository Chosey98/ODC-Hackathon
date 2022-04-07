import conn from '../conn';
const { ExpiredToken } = conn.models;

export default async (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	const query = await ExpiredToken.findOne({
		where: {
			token,
		},
	});
	if (query) {
		return res.status(400).send({
			success: false,
			message: 'Token is expired already',
		});
	}
	await ExpiredToken.create({
		token,
		type: 'access',
	});
	return res.status(200).send({
		success: true,
		message: 'Logout successfully',
	});
};

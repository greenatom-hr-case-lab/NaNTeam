import jwt from 'jsonwebtoken';

import config from '../config';

export default async (req,res,next) => {
	const token = req.headers['authorization'];//считывание токена из url "Authorization"
	
	if (!token) {
		return next({
			status: 403, 
			message: 'Forbidden. No token!'
		});
	}

	try {
		var tokenObj = jwt.verify( token, config.secret); // создание токена при помощи jsonwebtoken
	} catch ({ message }) {
		return next({
			status: 400,
			message
		});
	}
	
	req.token = tokenObj;//отправка токена в клиент
	next();

}
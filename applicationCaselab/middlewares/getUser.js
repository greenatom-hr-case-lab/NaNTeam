import * as UserService from '../services/UserService';

export default async function (req,res,next) {//  
	const { token } = req;// Получаем токен

	try {
		var user = await UserService.getUserByToken(token);// Получаем пользователя используя UserService
	} catch ({ message }) {
		return next({
			status: 500,
			message
		});
	}

	req.user = user;// возвращаем пользователя
	next();
}
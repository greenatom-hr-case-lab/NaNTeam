import * as UserService from '../services/UserService';

export async function getCurrentUser( req,res,next) {
	const { token } = req; //получение токена
	let user
	try {
		user = await UserService.getUserByToken(token);// поиск пользователя по токену
	} catch ({ message }) {
		return next({
			status: 500,
			message
		});	
	}
	
	return res.json(user);// возвращение пользователя
}
import User from '../models/user';

export async function getUserByToken(token) {// получение пользователя по токену
	const { _id } = token;
	try {
		var user = await User.findOne({ _id }, {password: 0});//поиск пользователя в базе по id
	} catch (e) {
		throw e;
	}
	
	return user;
}

export async function getUserInfo(token) {// получение пользователя по токену
	const { _id } = token;
	try {
		var user = await User.findOne({_id}, {email: 1, name: 1, patronymic: 1, birthDate: 1, role: 1})
	}
	catch (e) {
		throw e;
	}
	
	console.log('user', user)
	return user;
}
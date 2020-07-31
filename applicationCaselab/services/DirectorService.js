import User from '../models/user';

export async function getDirectors() {
	console.log('getDirectors')
	let directors
	try {
		directors = await User.find().where("role", "Руководитель")
			/*.exec(function(err, result){
				console.log(result)
			directors = result;
		})
		return directors*/
	} catch(e) {
		throw e;
	}
	console.log('directors = ', directors)
	return directors
}
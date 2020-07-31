import * as DirectorService from '../services/DirectorService';

export const Directors = async (req,res,next) => {
	console.log('directors')
	try {
		var directors = await DirectorService.getDirectors();
	} catch ({ message }) {
		return next({
			status: 500,
			message
		});
	}
	console.log('directors', directors)
	return res.json(directors);
}
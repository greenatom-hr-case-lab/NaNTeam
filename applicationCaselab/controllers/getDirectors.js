import * as DirectorService from '../services/DirectorService';

export const Directors = async (req,res,next) => {
	try {
		var directors = await DirectorService.getDirectors();
	} catch ({ message }) {
		return next({
			status: 500,
			message
		});
	}
	return res.json(directors);
}
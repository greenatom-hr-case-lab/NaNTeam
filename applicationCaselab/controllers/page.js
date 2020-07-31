import Plan from '../models/PlanandTask';

export async function create(req, res, next) {
	const pageData = req.body;
	//const userId = req.user._id;

	//pageData.FIOEmployee = userId;
	
	try {
		var page = await Plan.create(pageData);
		res.json(page);
	} catch ({ message }) {
		return next({
			status: 400,
			message: 'error'
		});
	}

	res.json(page);
}

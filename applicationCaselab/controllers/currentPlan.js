import * as CurrentPlanService from '../services/CurrentPlanService';

export async function getCurrentPlan( req,res,next){
	try {
 		var currentPlan = await CurrentPlanService.getPlanById(req.body._id);
	} catch ({ message }) {
		return next({
			status: 500,
			message
		});	
	}
	console.log('hi',currentPlan)
	return res.json(currentPlan);
}
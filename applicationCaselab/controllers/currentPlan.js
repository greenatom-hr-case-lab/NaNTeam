import * as CurrentPlanService from '../services/CurrentPlanService';
import User from "../models/user";

export async function getCurrentPlan( req,res,next){
	try {
 		var currentPlan = await CurrentPlanService.getPlanById(req.body._id);
	} catch ({ message }) {
		return next({
			status: 500,
			message
		});	
	}
	if (currentPlan) {
		currentPlan.directorEmployee = await User.findOne({_id: currentPlan.directorEmployee}, {name: 1})
		currentPlan.hrEmployee = await User.findOne({_id: currentPlan.hrEmployee}, {name: 1})
		console.log('currentPlan',currentPlan)
		return res.json(currentPlan)
	}
	else {
		console.log('no plan')
		return res.json(null)
	}
}

import Plan from '../models/PlanandTask';

export async function getPlanById(id) {
	try {
		var plan = await Plan.findOne({fioEmployee: id})
	} catch (e) {
		throw e;
	}	
	return plan;
}
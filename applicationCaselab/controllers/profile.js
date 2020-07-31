import * as UserService from '../services/UserService';
import Notification from '../models/notification';


export async function getUserInfo( req,res,next) {
	const { token } = req;
	console.log('req.body', req.headers.authorization);
	try {
		var user = await UserService.getUserInfo(token)
	} catch ({ message }) {
		return next({
			status: 500,
			message
		});
	}
	
	 return res.json(user);
}

export async function getNotifications(req, res, next) {
	const { token } = req.body;
	console.log(req.body);
	try {
		var user = await UserService.getUserInfo(token);
		Notification.find({User: user["_id"]},"Status Content",function (err,nots){
			if (err) return err;
			return nots;
		});
	} catch ({ message }) {
		return next({
			status: 500,
			message
		});	
	}
}


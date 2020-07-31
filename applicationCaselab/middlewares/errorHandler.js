export default function(err, req,res,next){//отлов ошибок
	let {status = 500, message = "Server Error" } = err;

	return res
		.status(status)
		.json({message});
};
import * as UserService from '../services/UserService';
import Plan from '../models/PlanandTask';
import User from '../models/user';

export async function plan( req,res,next) {
	const { token } = req;
	console.log('token', token);
	try {
		var user = await UserService.getUserByToken(token)
    console.log(user)
	} catch ({ message }) {
		return next({
			status: 500,
			message
		});	
	}
    if (user["role"].toLowerCase()==="сотрудник"){
        Plan.findOne({fioEmployee: user["_id"]},function (err,plan){
			if (err) return err;
			console.log(plan)
			return res.json(plan);
		});
    } else if (user["role"].toLowerCase()==="руководитель"){
        //не готово
      /*var array = await User.find().where("role", "Руководитель")*/
        /*User.find({},'name').lean().exec(function (err, docs) {
            var array = []
            docs.forEach(function(item){
                var doc = JSON.stringify(item);
                var docc = JSON.parse(doc);
                docc.Name = docc.Name.FirstName + " " + docc.Name.SecondName;
                array.push(docc);
            })
            return res.json(array);*/
      /*Plan.find({directorEmployee: user["_id"]},function (err,plans){
        if (err) return err;
        var array = plans.map(async function(plan, index) {
          console.log(plan)
          let user =  await User.findOne({_id: plan.fioEmployee}, {name: 1}, function (err,user){
            console.log('user', user)
            return user
          })
          console.log(user)
          return user
        })
      });
      console.log(array)
      return res.json(array);*/
      let array = []
      await Plan.find({directorEmployee: user["_id"]}, function (err,plans){
        plans.forEach((plan) => {
          console.log('plan')
          User.find({_id: plan.fioEmployee},'name').lean().exec(function (err, user) {
            console.log(user)
              array.push(user[0])
            })
        })
      })
      console.log('array',array)
    } else if(user["role"].toLowerCase()==="hr-сотрудник"){
      User.find({role: 'Сотрудник'}, "name", function (err,users){
			if (err) return err;
			console.log('users', users)
			return res.json(users);
		});
    } else{
        return next({
            status: 400,
            message: 'Incorrect role!'
        });
    }
}

export async function updatePlan( req,res,next) {
    console.log(req.body)
    const plan = await Plan.findOneAndUpdate({fioEmployee: req.body.fioEmployee}, req.body,{new: true})
    if (!plan){
      console.log('true')
        var newPlan = new Plan(req.body);
        await newPlan.save();
        console.log(newPlan)
        return res.json(newPlan);
    } else{
      console.log('else');
      const plan = await User.find().where("_id", plan._id)
      return res.json(plan)
    }
}

export async function addTask( req,res,next) {
  console.log('hi')
  console.log('req.body', req.body)
  const plan = await Plan.findOne({_id: req.body._id});
  plan.tasks.push({});
  plan.save();
  console.log(plan)
  return res.json(plan);
}

export async function updateTask( req,res,next) {
  const plan = await Plan.findOne({_id: req.body._id})
  delete req.body._id
  console.log(req.body._id)
  console.log(req.body)
  plan.tasks[req.body.index] = req.body
  await plan.save()
  console.log(plan)
  return res.json(plan)
}

export async function deleteTask( req,res,next) {
  const plan = await Plan.findOne({_id: req.body._id})
  console.log(typeof req.body.index )
  const deleteTasks = plan.tasks
  let tasks = deleteTasks.filter((task, index) => index != req.body.index);
  console.log(tasks)
  if (!tasks[0])
    plan.tasks = []
  else
    plan.tasks = tasks
  await plan.save()
  console.log(plan)
  return res.json(plan)
}

export async function updateStage( req,res,next) {
  console.log('hi')
  await Plan.findOneAndUpdate({_id: req.body._id},{stage: req.body.stage});
  const newPlan = await Plan.find().where("_id", req.body._id)
  console.log(newPlan)
  return res.json(newPlan);
}

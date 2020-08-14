import * as UserService from '../services/UserService';
import Plan from '../models/PlanandTask';
import User from '../models/user';

export async function plan( req,res,next) {
	const { token } = req;
	try {
		var user = await UserService.getUserByToken(token)
	} catch ({ message }) {
		return next({
			status: 500,
			message
		});	
	}
    if (user["role"].toLowerCase()==="сотрудник"){
      Plan.findOne({fioEmployee: user["_id"]},async function (err,plan){
			if (err) return err;
			if (plan) {
        plan.directorEmployee = await User.findOne({_id: plan.directorEmployee}, {name: 1})
        plan.hrEmployee = await User.findOne({_id: plan.hrEmployee}, {name: 1})
        console.log('plan', plan)
        return res.json(plan);
      }
			else
			  return res.json('');
		});
    } else if (user["role"].toLowerCase()==="руководитель"){
      console.log('руководитель')
      let array = []
      let employees = []
      const plans = await Plan.find({directorEmployee: user._id})
      console.log('plans', plans)
      plans.forEach( (plan) => {
        employees.push(plan.fioEmployee)
      })
      console.log('employees', employees)
      for (const employee of employees) {
        array.push(await User.findOne({_id: employee}, 'name'))
      }
      console.log('array', array)
      return res.json(array)
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
  console.log('req.body', req.body)
  let plan = await Plan.findOneAndUpdate({fioEmployee: req.body.fioEmployee}, req.body,{new: true})
  console.log('plan верху', plan)
  if (!plan){
    console.log('updatePlan true')
    let newPlan = new Plan(req.body);
    console.log('newPlan', newPlan)
    await newPlan.save();
    const plan = await Plan.findOne({fioEmployee: req.body.fioEmployee})
    console.log('plan', plan)
    plan.directorEmployee = await User.findOne({_id: plan.directorEmployee}, {name: 1})
    plan.hrEmployee = await User.findOne({_id: plan.hrEmployee}, {name: 1})
    console.log(plan)
    return res.json(plan);
  } else {
    console.log('updatePlan else');
    plan.directorEmployee = await User.findOne({_id: plan.directorEmployee}, {name: 1})
    plan.hrEmployee = await User.findOne({_id: plan.hrEmployee}, {name: 1})
    console.log('plan', plan)
    return res.json(plan)
  }
}

export async function addTask( req,res,next) {
  console.log('hi')
  console.log('req.body', req.body)
  const plan = await Plan.findOne({_id: req.body._id});
  plan.tasks.push({});
  plan.save();
  plan.directorEmployee = await User.findOne({_id: plan.directorEmployee}, {name: 1})
  plan.hrEmployee = await User.findOne({_id: plan.hrEmployee}, {name: 1})
  console.log(plan)
  return res.json(plan);
}

export async function updateTask( req,res,next) {
  const plan = await Plan.findOne({_id: req.body.plan_id})
  console.log(req.body)
  plan.tasks.forEach( (task) => {
    if (task._id == req.body._id ) {
      task.resultTask = req.body.resultTask
      task.taskPeriodStart = req.body.taskPeriodStart
      task.taskPeriodEnd = req.body.taskPeriodEnd
      task.bodyTask = req.body.bodyTask
      task.title = req.body.taskTitle
    }
  })
  await plan.save()
  plan.directorEmployee = await User.findOne({_id: plan.directorEmployee}, {name: 1})
  plan.hrEmployee = await User.findOne({_id: plan.hrEmployee}, {name: 1})
  console.log(plan)
  return res.json(plan)
}

export async function deleteTask( req,res,next) {
  console.log('deleteTask')
  const plan = await Plan.findOne({_id: req.body._id})
  console.log('req.body', req.body)
/*  console.log('plan', plan)
  const deleteTasks = plan.tasks
  console.log('deleteTasks', deleteTasks)
  console.log('req.body.index', req.body.index)*/
  plan.tasks = plan.tasks.filter((task) => task._id != req.body.index);
/*  console.log(tasks)
  if (!tasks[0])
    plan.tasks = []
  else
    plan.tasks = tasks*/
  await plan.save()
  const newPlan = await Plan.findOne({_id: req.body._id})
  newPlan.directorEmployee = await User.findOne({_id: newPlan.directorEmployee}, {name: 1})
  newPlan.hrEmployee = await User.findOne({_id: newPlan.hrEmployee}, {name: 1})
  console.log(newPlan)
  return res.json(newPlan);
}

export async function updateStage( req,res,next) {
  console.log('hi')
  await Plan.findOneAndUpdate({_id: req.body._id},{stage: req.body.stage});
  const newPlan = await Plan.findOne( {_id: req.body._id} )
  newPlan.directorEmployee = await User.findOne({_id: newPlan.directorEmployee}, {name: 1})
  newPlan.hrEmployee = await User.findOne({_id: newPlan.hrEmployee}, {name: 1})
  console.log(newPlan)
  return res.json(newPlan);
}

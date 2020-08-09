import mongoose, {Schema} from 'mongoose';

const date = new Date()
/*const TaskSchema = new Schema ({
	title: {type: String},
	bodyTask: {type: String},
	createdAt: { type: String, require: true, default: date.toLocaleDateString()},
	taskPeriodStart: { type: String},
	taskPeriodEnd: { type: String},
	resultTask: {type: Boolean}
})*/
const AdaptationPlanSchema = new Schema({
	fioEmployee: {type: Schema.Types.ObjectId, ref: 'User'},
	position: { type: String},
	dateCreate: {type: String, require: true, default: date.toLocaleDateString() },
	directorEmployee: {type: Schema.Types.ObjectId, ref: 'User'},
	hrEmployee: {type: Schema.Types.ObjectId, ref: 'User'},
	stage: {type: String},
	adaptationPeriodStart: { type: String},
	adaptationPeriodEnd: { type: String},
	mark: { type: String},
	tasks: [{
		title: {type: String},
		bodyTask: {type: String},
		createdAt: { type: String, require: true, default: date.toLocaleDateString()},
		taskPeriodStart: { type: String},
		taskPeriodEnd: { type: String},
		resultTask: {type: Boolean}
	}]
/*	tasks: { type: [TaskSchema], default: undefined}*/
});


const Plan = mongoose.model('Plan', AdaptationPlanSchema);
/*const Task = mongoose.model('Task', TaskSchema);*/
module.exports = Plan;

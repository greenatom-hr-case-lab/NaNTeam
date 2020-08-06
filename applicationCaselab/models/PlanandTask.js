import mongoose, {Schema} from 'mongoose';

const date = new Date()
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
});

const Plan = mongoose.model('Plan', AdaptationPlanSchema);

module.exports = Plan;
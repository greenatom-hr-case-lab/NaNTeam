import mongoose, {Schema} from 'mongoose';

const AdaptationPlanSchema = new Schema({
	fioEmployee: {type: Schema.Types.ObjectId, ref: 'User'},
	position: { type: String},
	dateCreate: {type: Date, require: true, default: Date.now },
	directorEmployee: {type: Schema.Types.ObjectId, ref: 'User'},
	hrEmployee: {type: Schema.Types.ObjectId, ref: 'User'},
	stage: {type: String},
	adaptationPeriodStart: { type: Date},
	adaptationPeriodEnd: { type: Date},
	mark: { type: String},
	tasks: [{
		title: {type: String},
		bodyTask: {type: String},
		createdAt: { type: Date, require: true, default: Date.now},
		taskPeriodStart: { type: Date, default: Date.now},
		taskPeriodEnd: { type: Date},
		resultTask: {type: Boolean}
	}]
});

const Plan = mongoose.model('Plan', AdaptationPlanSchema);

module.exports = Plan;
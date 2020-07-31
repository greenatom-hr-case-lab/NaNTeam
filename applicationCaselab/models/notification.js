const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
    Status: {type: String, default: "Active"},
    Content: String,
    User: {type: Schema.Types.ObjectId, ref: 'User', require: true}
});

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;
import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
    title: String,
    description: String,
    image: String,
    created_at: { type: Date, default: Date.now },
}, { toJSON: { virtuals: true } });   // virtuals 

postSchema.virtual('short_description').get(function () { return this.description.substr(0, 150) + '...' })  // extra dynamic feild
postSchema.virtual('date_of_publish').get(function () { return changeDateFormat(this.created_at) })   // extra dynamic feild

function changeDateFormat(date_str) {
    const date = new Date(date_str);
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

const postModel = models.Post || model('Post', postSchema);

export default postModel;

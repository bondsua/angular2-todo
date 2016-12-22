import mongoose from  'mongoose';
import _ from 'lodash';

const TodoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,

}, { timestamps: true });

/*
TodoSchema.methods.toJSON = function () {
    return _.pick(this, ['_id','userId','type', 'color', 'age']);
};
*/

export default mongoose.model('Todo', TodoSchema);
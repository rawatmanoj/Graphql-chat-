import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: {
         type: Schema.Types.ObjectId, ref: 'Users', required: [true, 'Please enter sender'],
    },
    text: {
        type: String,
        required: [true, 'Please enter text'],
        // validator: [Joi.string().email, 'Please enter a valid email'],
    },
    roomId:{
        type:String
    },
    messageType:{
        type:String
    }

},{timestamps: true});

export default mongoose.model('Messages', messageSchema);

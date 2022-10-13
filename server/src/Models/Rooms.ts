import mongoose from 'mongoose';
const { Schema } = mongoose;

const roomSchema = new Schema({
    lastMessage: {
        type: String,
    },
    participants:[ { type: Schema.Types.ObjectId, ref: 'Users'}],
    roomName:{
        type:String
    },
    roomtype:{
        type:String,
        default:'private'
    },

},{timestamps: true});

export default mongoose.model('Rooms', roomSchema,'Rooms');

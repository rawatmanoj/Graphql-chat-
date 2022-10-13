import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        maxLengthg: [40, 'Name length cant exceed 40 chars']
    },
    email: {
        type: String,
        required: [true, 'Please enter password'],
        // validator: [Joi.string().email, 'Please enter a valid email'],
        unique: true
    },
    friends:[{ id:{type: Schema.Types.ObjectId, ref: 'Users'},roomId:{type: Schema.Types.ObjectId, ref: 'Rooms'}}],
    imageUrl: {
            type: String,
    },
    mobile:{
        type:String,
        unique:true,
        default:""
    },
    rooms:[{ type: Schema.Types.ObjectId, ref: 'Rooms'}],
},{timestamps: true});

export default mongoose.model('Users', userSchema);

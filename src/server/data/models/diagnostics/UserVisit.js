import mongoose from 'mongoose';


const userVisitSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 1,
        required: true
    },
    locations: [{
        country: String,
        city: String
    }],
    date: {
        type: Date,
        default: Date.now
    },
    aggregated: Boolean
});

userVisitSchema.index({ date: 1 });

const UserVisit = mongoose.model('UserVisit', userVisitSchema);


export {
    UserVisit
};

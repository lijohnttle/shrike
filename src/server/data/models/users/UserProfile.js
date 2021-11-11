import mongoose from 'mongoose';


const userProfileSchema = new mongoose.Schema({
    goodReadsUserId: String
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);


export {
    UserProfile
};

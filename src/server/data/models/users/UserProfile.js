import mongoose from 'mongoose';


const userProfileSchema = new mongoose.Schema({
    goodReadsUserId: String,
    greetingsHeader: String,
    greetingsText: String,
    summary: String
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);


export {
    UserProfile
};

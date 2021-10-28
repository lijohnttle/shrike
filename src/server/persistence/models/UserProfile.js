import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
    goodReadsUserId: String
});

export default mongoose.model('UserProfile', userProfileSchema);

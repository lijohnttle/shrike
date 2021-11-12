import { UserProfile } from '../../../data/models/users/UserProfile.js';


class UserProfileRepository {
    /**
     * Loads the user profile details.
     * @returns {Promise<UserProfile>} User profile.
     */
    async find() {
        return await UserProfile.findOne().exec() || new UserProfile({ goodReadsUserId: '82436176' });
    }

    /**
     * Saves user profile changes.
     * @param {UserProfile} changes User profile.
     * @returns {Promise<UserProfile>} User profile.
     */
    async save(changes) {
        if (!changes) {
            return null;
        }
    
        // Update or insert user profile
        const query = { };
        const update = { $set: changes };
        const options = { upsert: true };
    
        const updateResult = await UserProfile.updateOne(query, update, options).exec();
    
        if (updateResult.modifiedCount > 0 || updateResult.upsertedCount > 0) {
            return await this.find().exec();
        }

        return null;
    }
};

class UserProfileCachedRepository {
    /**
     * @param {UserProfileRepository} userProfileRepository 
     */
    constructor(userProfileRepository) {
        this._userProfileRepository = userProfileRepository;
        this._userProfileCached = null;
    }

    /**
     * Loads the user profile details.
     * @returns {Promise<UserProfile>} User profile.
     */
    async find() {
        let userProfile = this._userProfileCached;

        if (!userProfile) {
            userProfile = await this._userProfileRepository.find();
            
            this._userProfileCached = userProfile;
        }
        
        return userProfile;
    }

    /**
     * Saves user profile changes.
     * @param {UserProfile} changes User profile.
     * @returns {Promise<UserProfile>} User profile.
     */
    async save(changes) {
        const userProfile = await this._userProfileRepository.save(changes);

        if (userProfile) {
            this._userProfileCached = userProfile;
        }

        return userProfile;
    }
};


export {
    UserProfileRepository,
    UserProfileCachedRepository,
};

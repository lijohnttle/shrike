import { UserProfileDto } from '../../../../contracts/users/UserProfileDto.js';
import { UserProfile } from '../../../data/models/users/UserProfile.js';
import { UserContext } from '../../entities/authentication/UserContext.js';


class UserProfileRepository {
    /**
     * Loads the user profile details.
     * @returns {Promise<UserProfileDto>} User profile.
     */
    async find() {
        var result = await UserProfile.findOne().exec();

        if (!result) {
            result = new new UserProfile();
            await UserProfile.create(result);
        }

        return result;
    }

    /**
     * Saves user profile changes.
     * @param {UserProfileDto} changes User profile.
     * @returns {Promise<UserProfileDto>} User profile.
     */
    async save(changes) {
        if (!changes) {
            return null;
        }
    
        // Update or insert user profile
        const query = { };
        const options = { upsert: true };

        const updateResult = await UserProfile.updateOne(query, changes, options).exec();
    
        if (updateResult.modifiedCount > 0 || updateResult.upsertedCount > 0) {
            return await this.find();
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
     * @returns {Promise<UserProfileDto>} User profile.
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
     * @param {UserProfileDto} changes User profile.
     * @param {UserContext} userContext User context.
     * @returns {Promise<UserProfile>} User profile.
     */
    async save(changes, userContext) {
        userContext.verifyAdminAccess();

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

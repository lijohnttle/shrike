import UserProfile from './models/UserProfile.js';

let cache = {
    userProfile: null
};


/**
 * @returns {UserProfile} User profile.
 */
function loadFromCache() {
    return cache.userProfile;
}

/**
 * @param {UserProfile} userProfile User profile. 
 */
function saveToCache(userProfile) {
    cache.userProfile = userProfile;
}

const loadFromDb = async () => await UserProfile.findOne() || new UserProfile({ goodReadsUserId: '82436176' });


/**
 * Loads the user profile details.
 * @returns {Promise<UserProfile>} User profile.
 */
export const get = async () => {
    let userProfile = loadFromCache();

    if (!userProfile) {
        userProfile = await loadFromDb();
        
        saveToCache(userProfile);
    }
    
    return userProfile;
};

/**
 * Saves user profile changes.
 * @param {UserProfile} changes User profile.
 * @returns {Promise<UserProfile>} User profile.
 */
export const save = async (changes) => {
    if (!changes) {
        return;
    }

    // Update or insert user profile
    const query = { };
    const update = { $set: changes };
    const options = { upsert: true };

    const updateResult = await UserProfile.updateOne(query, update, options);

    if (updateResult.modifiedCount > 1 || updateResult.upsertedCount > 1) {
        // Update cache
        const userProfile = await loadFromDb();

        saveToCache(userProfile);
    }
};

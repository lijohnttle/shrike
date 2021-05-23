const sharedConfig = require('./configs/shared.config');
const devConfig = require('./configs/dev.config');
const prodConfig = require('./configs/prod.config');

const combineConfigs = (env, options) => {
    const config = sharedConfig(env, options);

    const envConfig = options.mode == 'production'
        ? prodConfig(env, options)
        : devConfig(env, options);

    return { ...config, ...envConfig };
};

module.exports = combineConfigs;
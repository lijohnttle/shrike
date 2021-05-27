import sharedConfig from './configs/shared.config.js';
import devConfig from './configs/dev.config.js';
import prodConfig from './configs/prod.config.js';

export default (env, options) => {
    const config = sharedConfig(env, options);

    const envConfig = options.mode == 'production'
        ? prodConfig(env, options)
        : devConfig(env, options);

    return { ...config, ...envConfig };
};
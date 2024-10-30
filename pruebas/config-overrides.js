// config-overrides.js
module.exports = {
    webpack: function (config) {
        config.resolve.fallback = {
            fs: false,
            path: require.resolve('path-browserify'),
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
        };
        return config;
    },
};

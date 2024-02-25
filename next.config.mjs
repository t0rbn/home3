/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    distDir: 'build',

    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.node$/,
            use: [
                {
                    loader: 'node-loader',
                    options: {
                        name: '[name].[ext]',
                    },
                },
            ],
        })

        return config
    },
};

export default nextConfig;

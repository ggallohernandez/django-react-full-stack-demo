// Webpack uses this to work with directories
const path = require("path");
const OptimizeCSSAssetsPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { WebpackManifestPlugin }  = require("webpack-manifest-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MomentTimezoneDataPlugin = require("moment-timezone-data-webpack-plugin");

const prodPlugins = [
    new ForkTsCheckerWebpackPlugin({
        async: false,
        useTypescriptIncrementalApi: true,
        memoryLimit: 4096,
        tsconfig: path.resolve(process.cwd(), "tsconfig.json"),
    }),
];

const devPlugins = [
    new ForkTsCheckerWebpackPlugin({
        formatter: "codeframe",
        async: true,
        useTypescriptIncrementalApi: true,
        tsconfig: path.resolve(process.cwd(), "tsconfig.json"),
    }),
];

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        context: path.resolve(__dirname, "resources"),
        output: {
            publicPath: "/assets/",
            path: path.resolve(__dirname, "public", "assets"),
            filename: "[name].bundle.js",
            chunkFilename: "[name].chunk.js?c=[contenthash]",
        },
        entry: {
            "react-app": path.resolve(__dirname, "src"/*, "resources", "react-app"*/, "App.tsx"),
        },
        devtool: isProduction ? "cheap-source-map" : "inline-source-map",
        mode: isProduction ? "production" : "development",
        stats: isProduction ? "errors-only" : "minimal",
        module: {
            rules: [
                {
                    test: /\.(png|jp(e*)g|svg)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8000, // Convert images < 8kb to base64 strings
                                name: "images/[hash]-[name].[ext]",
                            },
                        },
                    ],
                },
                {
                    test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    include: [path.resolve(__dirname, "node_modules")],
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                // prevent name become hash
                                name: "[name].[ext]",
                                // move files
                                outputPath: "fonts",
                                // rewrite path in css
                                publicPath: "/assets/fonts",
                            },
                        },
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.scss$/,
                    exclude: [/\.module.scss$/, /\.inline.scss$/],
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: "sass-loader",
                        },
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.scss$/,
                    include: [/\.module.scss$/],
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                importLoaders: 1,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: "sass-loader",
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    include: [/\.inline.scss$/],
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                            },
                        },
                        "sass-loader",
                    ],
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx", "css", ".scss"],
            plugins: [new TsconfigPathsPlugin()],
            alias: {
                // Fix Module not found: Error: Can't resolve 'react/jsx-runtime'
                'react/jsx-runtime': require.resolve('react/jsx-runtime'),
                // Fix issue with double react when you try do yarn link
                react: require.resolve("./node_modules/react"),
                "react-dom": require.resolve("./node_modules/react-dom"),
            },
            modules: ["node_modules"],
        },
        optimization: {
            minimize: isProduction,
            minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
        },
        plugins: [
            new WebpackManifestPlugin({
                /// problem with CopyWebpackPlugin https://github.com/danethurber/webpack-manifest-plugin/issues/144
                seed: {
                    "/assets/media/favicon-16x16.png": "/assets/media/favicon-16x16.png",
                    "/assets/media/sprites/sprite.svg": "/assets/media/sprites/sprite.svg",
                },
                fileName: path.resolve(__dirname, "public/mix-manifest.json"),
                basePath: "/assets/",
                // exclude resources/fonts/ from manifest
                filter: (file) => (!/fonts\/(.*)$/.test(file.path) ? file : null),
                map: (file) => ({
                    ...file,
                    // Remove hash in manifest key if it exists (actual for copied files via webpack-copy-plugin)
                    name: file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, "$2"),
                }),
            }),
            /*new CopyWebpackPlugin({
                patterns: [
                    {
                        // copy images
                        from: path.resolve(__dirname, "resources/images"),
                        to: path.resolve(__dirname, "public/assets/media"),
                    },
                ],
            }),*/
            // To keep all zones but limit data to specific years, use the year range options
            new MomentTimezoneDataPlugin({
                startYear: new Date().getFullYear() - 5,
                endYear: new Date().getFullYear() + 5,
            }),
        ].concat(isProduction ? prodPlugins : devPlugins),
    };
};

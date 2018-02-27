const path = require('path')
const pxtorem = require('postcss-pxtorem')

const svgSpriteDirs = [
    // antd-mobile 内置svg
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),

    // 业务代码本地私有 svg 存放目录
    path.resolve(__dirname, 'src/svg/'),
]

export default {
    entry: 'src/app.js',
    env: {
        development: {
            extraBabelPlugins: [
                'dva-hmr',
                'transform-runtime'
            ]
        },
        production: {
            extraBabelPlugins: [
                'transform-runtime',
                'transform-remove-console'
            ]
        }
    },
    extraBabelPlugins: [
        'transform-runtime',
        [
            'import',
            {
                libraryName: 'antd-mobile',
                style: true
            }
        ]
    ],
    extraPostCSSPlugins: [
        pxtorem({
            rootValue: 100,
            propWhiteList: [],
        }),
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    define: {
        PRODUCTION: false
    },
    theme: './src/config/theme.js',
    svgSpriteLoaderDirs: svgSpriteDirs,
}

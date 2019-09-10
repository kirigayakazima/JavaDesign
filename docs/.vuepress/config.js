module.exports = {
    title: 'Java设计模式解读',
    description: '一个Java学习者的践行之路',
    base: '/JavaDesign/',
    head: [
        ['link', { rel: 'icon', href: '/logo1.jpg' }]
    ],
    serviceWorker: false,
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        repo: 'kirigayakazima/JavaDesign',
        editLinks: true,
        sidebarDepth: 2,
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新时间：',
        sidebar: {
            '/JavaBook/': [
                'about',
                'JavaDesign01'
            ],
            '/JavaBaseBook/': [
                    'JavaBase01',
                    'JavaBase02',
                    'JavaBase03',
                    'JavaBase04',
                    'JavaBase05',
                    'JavaBase06',
                    'JavaBase07'
                ]
        },
        nav: [
            {text: '首页',link:'/'},
            /*{text: '导航',link:'/'},
            {text: '前端',link:''},*/
            {text: 'Java基础',link:'/JavaBaseBook/JavaBase01'},
            {text: '关于',link:'/JavaBook/about'},
            {
                text: '分享',
                items:[
                    {text: '技术',link:''},
                    {text: '奇闻妙事',link:''},
                ]
            },
            //{text: 'Github',link:'https://github.com/kirigayakazima'}
        ]
    }
}

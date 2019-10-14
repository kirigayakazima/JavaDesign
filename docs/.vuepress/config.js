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
                ],
            '/DataBase/' : [
                'DataBase01',
                'DataBase02'
            ],
            '/ConstBook/' : [
                'Const01'
            ],
            '/ServletBook/': [
                'Servlet01',
                'JSP01',
                'Ajax01',
                'FilterAndListener',
                'EI'
            ],
            '/FrameBook/': [
                'Mybatis01'
            ]
        },
        nav: [
            {text: '首页',link:'/'},
            {text: '数据库',link:'/DataBase/DataBase01'},
            {text: '数据结构',link:'/ConstBook/Const01'},
            {text: 'Java之路',
                items:[
                    {text: 'Java基础',link:'/JavaBaseBook/JavaBase01'},
                    {text: 'Servlet',link: '/ServletBook/Servlet01'},
                    {text: '框架学习',link: '/FrameBook/Mybatis01'}
                ]
            },
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

({
    name: 'almond',
    include: ['../js/main'],
    baseUrl: '../js',
    out: 'output/js/main.js',
    findNestedDependencies: true,
    mainConfigFile: '../js/main.js',
    wrap: true,
    insertRequire: ['../js/main']
})

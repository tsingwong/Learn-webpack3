const entry = {};

entry.path = {
    one: './src/entry.js',
    two: './src/entry2.js',
    // jquery: 'jquery',
    // vue: 'vue'
    vendor: ['jquery', 'vue']
};

module.exports = entry;

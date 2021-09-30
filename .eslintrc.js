module.exports = {
    overrides: [
        {
            files: ['src/**/*.ts'],
            rules: {
                'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
            },
        },
    ],
}

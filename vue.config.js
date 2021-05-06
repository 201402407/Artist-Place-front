module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://13.124.3.122:8000",
            },
        },
    },
}

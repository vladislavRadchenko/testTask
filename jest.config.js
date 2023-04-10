module.exports = {
    reporters: [
        "default",
        ["./node_modules/jest-html-reporters", {
            "publicPath": "./test-reports",
            "filename": "report.html",
            "pageTitle": "Jest Test Report",
            "expand": true
        }]
    ]
};
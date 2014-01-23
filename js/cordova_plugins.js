cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.console/www/console-via-logger.js",
        "id": "org.apache.cordova.console.console",
        "clobbers": [
            "console"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.console/www/logger.js",
        "id": "org.apache.cordova.console.logger",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.PushPlugin/www/PushNotification.js",
        "id": "com.phonegap.plugins.PushPlugin.PushNotification",
        "clobbers": [
            "PushNotification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/InAppBrowser.js",
        "id": "org.apache.cordova.inappbrowser.InAppBrowser",
        "clobbers": [
            "window.open"
        ]
    },
    {
        "file": "plugins/org.transistorsoft.cordova.plugin.background.fetch/www/BackgroundFetch.js",
        "id": "org.transistorsoft.cordova.plugin.background.fetch.BackgroundFetch",
        "clobbers": [
            "plugins.backgroundFetch"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.device": "0.2.7",
    "org.apache.cordova.console": "0.2.6",
    "com.phonegap.plugins.PushPlugin": "2.1.1",
    "org.apache.cordova.inappbrowser": "0.3.0",
    "org.transistorsoft.cordova.plugin.background.fetch": "2.0.0",
    "com.red_folder.phonegap.plugin.backgroundservice": "2.0.0"
}
// BOTTOM OF METADATA
});
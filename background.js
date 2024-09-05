// when the extension is installed.
chrome.runtime.onInstalled.addListener(function (details) {

    const rule = {
        // id: "myrule",  // optional, will be generated if not set.
        // priority: 100,  // optional, defaults to 100.
        conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostSuffix: '.youtube.com', schemes: ['https'] },
            }),
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostSuffix: '.facebook.com', schemes: ['https'] },
            }),
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostSuffix: '.instagram.com', schemes: ['https'] },
            }),
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostSuffix: '.google.com', schemes: ['https'] },
            }),
        ],
        actions: [

            // show icon
            new chrome.declarativeContent.ShowAction(),

            // register content scripts
            new chrome.declarativeContent.RequestContentScript({ js: ["content.js"] })
        ]
    };

    // use undefine to remove all the rules else use an array of rule ids.
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        console.log('Rule Removed');

        // add rules
        chrome.declarativeContent.onPageChanged.addRules([rule], function (rules) {
            console.log('Rule Added', rules)
        });
    });

});
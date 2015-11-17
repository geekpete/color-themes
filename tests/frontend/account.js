var uniqueId = Date.now(),
    name = "name-" + uniqueId,
    email = uniqueId + "@color-themes.com",
    password = uniqueId,
    cookie;

module.exports = {
    "register": function(browser) {
        browser
            .url(browser.globals.url)
            .waitForElementVisible(".id-register", 10000)
            .click(".id-register")
            .setValue("#loginName", name)
            .setValue("#loginEmail", email)
            .setValue("#loginPassword", password)
            .click(".popup-menu.register button[type=submit]")
            .waitForElementVisible(".id-username", 10000)
            .assert.containsText(".id-username", name)
            .click(".id-username")
            .waitForElementVisible(".id-logout", 10000)
            .click(".id-logout")
            .waitForElementVisible(".id-register", 10000)
            .waitForElementVisible(".id-login", 10000)
            .end();
    },

    "login": function(browser) {
        browser
            .url(browser.globals.url)
            .waitForElementVisible(".id-login", 10000)
            .click(".id-login")
            .setValue("#loginEmail", email)
            .setValue("#loginPassword", [password, browser.Keys.ENTER])
            .waitForElementVisible(".id-username", 10000)
            .assert.containsText(".id-username", name)
            .getCookie("connect.sid", function(c) {
                cookie = c;
                browser.end();
            });
    },

    "keep logged in after browser reopened": function(browser) {
        browser
            .url(browser.globals.url)
            .setCookie(cookie)
            .url(browser.globals.url)
            .waitForElementVisible(".id-username", 10000)
            .assert.containsText(".id-username", name)
            .end();
    },

    "log out": function(browser) {
        browser
            .url(browser.globals.url)
            .setCookie(cookie)
            .url(browser.globals.url)
            .waitForElementVisible(".id-username", 10000)
            .click(".id-username")
            .waitForElementVisible(".id-logout", 10000)
            .click(".id-logout")
            .waitForElementVisible(".id-register", 10000)
            .waitForElementVisible(".id-login", 10000)
            .end();
    }
};
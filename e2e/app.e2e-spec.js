"use strict";
var protractor_1 = require('protractor');
describe('QuickStart E2E Tests', function () {
    var expectedMsg = 'Hello1 Angular';
    beforeEach(function () {
        protractor_1.browser.get('');
    });
    it('should display: ' + expectedMsg, function () {
        expect(protractor_1.element(protractor_1.by.css('h1')).getText()).toEqual(expectedMsg);
    });
});

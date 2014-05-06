describe('Testing the platform', function () {
    it('template tag available', function () {
        expect(document.createElement('template') instanceof HTMLUnknownElement).toBeFalsy();
        expect(document.createElement('template') instanceof HTMLTemplateElement).toBeTruthy();
    });
    it('shadow dom available', function () {
        expect(document.createElement('div').createShadowRoot).toBeDefined();
    });
    it('html import available', function () {
        expect(LinkImport).toBeDefined();
        expect(document.createElement('link') instanceof LinkImport).toBeTruthy();
    });
});
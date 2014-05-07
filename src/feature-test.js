describe('Testing the platform', function () {
    it('template tag available', function () {
        expect(document.createElement('template') instanceof HTMLUnknownElement).toBeFalsy();
        expect(document.createElement('template') instanceof HTMLTemplateElement).toBeTruthy();
    });
    it('shadow dom available', function () {
        expect(document.createElement('div').createShadowRoot).toBeDefined();
    });
    it('html import available', function () {
        var link = document.createElement('link');
        link.setAttribute('rel', 'import');
        link.setAttribute('href', 'http://index.hu');
        document.body.appendChild(link);
        waitsFor(function () {
            return 'import' in link;
        });
        runs(function() {
            expect(link.import).toBeDefined();
        });
    });
    it('custom elements can be registered', function () {
        expect(document.registerElement).toBeDefined();
    });
});
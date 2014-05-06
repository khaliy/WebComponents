(function () {
    var Clock = window['ClockModule'].Clock,
        clockObserve = window['ClockModule'].observe;

    function renderClockTemplate(wrapper) {
        var link = document.querySelector('link[rel=import]'),
            clockTemplate = link.import.querySelector('#clockTemplate').content.cloneNode(true),
            clockNode = clockTemplate.querySelector('.clock'),
            clock,
            root = wrapper.createShadowRoot();

        clockNode = root.appendChild(clockNode);
        clock = new Clock(clockNode);

        clockObserve(wrapper, clock);
        if (wrapper.hasAttribute('play')) {
            clock.play();
        }
    }

    window.addEventListener('HTMLImportsLoaded', function(e) {
        var clockHolders = document.querySelectorAll('.clock-holder');
        [].forEach.call(clockHolders, function (elem) {
            renderClockTemplate(elem);
        });
    });


    
})();

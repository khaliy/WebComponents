(function () {
    var Clock = window['ClockModule'].Clock,
        clockObserve = window['ClockModule'].observe;

    function renderClockTemplate(id, wrapper) {
        var clockTemplate = document.querySelector(id),
            clockNode = clockTemplate.content.cloneNode(true).querySelector('.clock'),
            clock;

        clockNode = wrapper.appendChild(clockNode);
        clock = new Clock(clockNode);

        clockObserve(wrapper, clock);

        if (wrapper.hasAttribute('play')) {
            clock.play();
        }
    }

    var clockHolders = document.querySelectorAll('.clock-holder');
    [].forEach.call(clockHolders, function (elem) {
        renderClockTemplate('#clockTemplate', elem);
    });

})();
(function () {
    var clocks = {};
    var Clock = window['ClockModule'].Clock;
    
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes') {
                if (mutation.attributeName === 'play') {
                    var clock = clocks[mutation.target];
                    if (mutation.target.hasAttribute('play')) {
                        clock.play();
                    } else {
                        clock.stop();
                    }
                }
            }
        });    
    });

    function renderClockTemplate(id, target) {
        var clockTemplate = document.querySelector(id),
            clock = clockTemplate.content.cloneNode(true).querySelector('.clock');

        clock = target.appendChild(clock);
        observer.observe(target, { attributes: true });
        clocks[target] = new Clock(clock);
        if (target.hasAttribute('play')) {
            clocks[target].play();
        }
    }

    var clockHolders = document.querySelectorAll('.clock-holder');
    [].forEach.call(clockHolders, function (elem) {
        renderClockTemplate('#clockTemplate', elem);
    });
    
})();
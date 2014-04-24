(function () {


    function renderClockTemplate(id) {
        var clockTemplate = document.querySelector(id),
            clock = clockTemplate.content.cloneNode(true).querySelector('span');

        clock = document.body.appendChild(clock);

        if (clock.hasAttribute('autostart')) {
            clock.textContent = new Date().toTimeString();
        }
        if (clock.hasAttribute('updated')) {
            setInterval(function () {
                clock.textContent = new Date().toTimeString();
            }, parseInt(clock.getAttribute('interval'), 10) || 1000);
        }
    }

    renderClockTemplate('#clock');

    renderClockTemplate('#clock2');

})();
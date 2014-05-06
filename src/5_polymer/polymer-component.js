(function() {
    var xClock = document.querySelector('x-clock');
    xClock.addEventListener('change', function (e) {
        document.querySelector('.time').textContent = e.detail;
    });
})();
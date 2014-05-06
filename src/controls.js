(function () {
    var togglePlay = document.querySelector('.controls .toggle');
    if (togglePlay) {
        togglePlay.addEventListener('click', function () {
            var target = document.querySelector('.clock-holder,x-clock');
            target[target.hasAttribute('play')?'removeAttribute':'setAttribute']('play', true); // https://code.google.com/p/chromium/issues/detail?id=329987
        });
    }
})();
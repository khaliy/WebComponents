(function (define) {
    define('ClockModule', function (require, exports) {
        /**
         * storing references to clock instances bound to the wrapper element it belongs to
         * key is target value is the clock instance
         * @type {{}}
         */
        var clocks = {};

        /**
         * Simple Clock widget
         * @param el the host element the widget is bound to
         * @constructor
         */
        var Clock = function (el) {
            this.el = el;
            this.value = {};
            this.listeners = [];
            this.step();
        };
        Clock.prototype = {
            render: function () {
                [].forEach.call(this.labels(), function (elem) {
                    var label = this.el.querySelector(elem.label);
                    if (label) {
                        label.textContent = elem.value;
                    }
                }, this);

                [].forEach.call(this.el.querySelectorAll('.sep'), function (elem) {
                    elem.style.visibility = this.date.getSeconds() % 2 ? 'visible' : 'hidden';
                }, this);
            },
            play: function () {
                this.interval = setInterval(this.step.bind(this), 1000);
            },
            labels: function () {
                return [
                    {
                        label: '.hours',
                        value: padding(this.date.getHours())
                    },
                    {
                        label: '.minutes',
                        value: padding(this.date.getMinutes())
                    },
                    {
                        label: '.seconds',
                        value: padding(this.date.getSeconds())
                    }
                ];
            },
            step: function () {
                this.date = new Date();
                this.value = this.date;
                this.render();
                [].forEach.call(this.listeners, function (cb) {
                    if (cb && typeof cb === 'function'){
                        cb(this);
                    }
                }.bind(this));
            },
            stop: function () {
                clearInterval(this.interval);
                this.interval = null;
            },
            changed: function (callback) {
                this.listeners.push(callback);
            }
        };
        exports.Clock = Clock;

        function padding(num) {
            return (num>9)? ''+num : '0'+num;
        }

        /**
         * Optional method to observe the wrapper element's attributes and control it via that element
         * @param target
         * @param clock
         */
        exports.observe = function (target, clock) {
            var clockObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    var clock = clocks[mutation.target];
                    if (clock && mutation.type === 'attributes' && mutation.attributeName === 'play') {
                        if (mutation.target.hasAttribute('play')) {
                            clock.play();
                        } else {
                            clock.stop();
                        }
                    }
                });
            });
            clocks[target] = clock;
            clockObserver.observe(target, { attributes: true });
        };

    });
}(typeof define === 'function' && define.amd ? define : function (id, factory) {
    if (typeof exports !== 'undefined') {
         factory(require, exports);
    } else {
        factory(function(value) {
            return window[value];
        }, (window[id] = {}));
    }
}));













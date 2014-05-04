(function (define) {
    define('ClockModule', function (require, exports) {
		
		var Clock = function (clock) {
			this.clock = clock;
			this.offset = 0;
			this.value = {};
			this.step();
		};
		Clock.prototype = {
			render: function () {
            	[].forEach.call(this.labels(), function (elem) {
            		var label = this.clock.querySelector(elem.label);
            		if (label) {
		        		label.textContent = elem.value;
		    		}
            	}, this);
				
				[].forEach.call(this.clock.querySelectorAll('.sep'), function (elem) {
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
				this.date.setTime(this.date.getTime() - this.offset);
				this.value.current = this.date;
				this.render();
			},
			stop: function () {
				clearInterval(this.interval);
				this.interval = null;
			},
			set: function (offset) {
				this.offset = offset;
			}
		};

	    function padding(num) {
	        return (num>9)? ''+num : '0'+num;
	    }

        exports.Clock = Clock;
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












	
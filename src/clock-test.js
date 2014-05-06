describe('Clock test,',function (){

    var fixture = '<div class="clock"><span class="hours"></span><span class="sep">:</span><span class="minutes"></span><span class="sep">.</span><span class="seconds"></span></div>';
    var el;
    var fakeTimer;

    var Clock = window.ClockModule.Clock;

    beforeEach(function () {
        var holder = document.createElement('div');
        holder.className = 'fixture';
        holder.innerHTML = fixture;
        document.body.appendChild(holder);
        el = document.querySelector('.clock');
        fakeTimer = sinon.useFakeTimers();
    });

    afterEach(function () {
        fakeTimer.restore();
        document.querySelector('.fixture').remove();
        el = null;
    });

    it('the script is loaded', function () {
        expect(window.ClockModule).toBeDefined();
        expect(window.ClockModule.Clock).toBeDefined();
    });

    it('it provides an optional observing mechanism', function () {
        expect(window.ClockModule.observe).toBeDefined();
    });

    it('the fixture is in place', function () {
        expect(document.querySelector('.clock')).toBeDefined();
    });

    describe('Creating an instance,', function () {
        var clock;

        beforeEach(function () {
            clock = new Clock(el);
        });

        afterEach(function () {
            clock.remove();
            clock = null;
        });

        it('its in stopped state by default', function () {
            expect(clock.interval).toEqual(null);
        });

        it('it restored its state', function () {
            ['.hours', '.minutes', '.seconds'].forEach(function (selector) {
                expect(el.querySelector(selector)).toBeDefined();
                expect(el.querySelector(selector).textContent.trim()).not.toEqual("");
            });
        });

        it('it invokes changed when played', function () {
            var callback = sinon.spy();
            clock.changed(callback);
            fakeTimer.tick(1000);
            expect(callback.called).toBeFalsy();
            clock.play();
            expect(callback.called).toBeTruthy();
            expect(callback.callCount).toEqual(1);
            fakeTimer.tick(1000);
            expect(callback.callCount).toEqual(2);
        });

        it('its not invoke changed when stopped', function () {
            var callback = sinon.spy();
            clock.changed(callback);
            clock.play();
            fakeTimer.tick(1000);
            expect(callback.callCount).toEqual(2);
            clock.stop();
            fakeTimer.tick(4000);
            expect(callback.callCount).toEqual(2);
        });

        it('the labels are not updating by the time when stopped', function () {
            var previousSeconds = el.querySelector('.seconds').textContent;
            fakeTimer.tick(1000);
            expect(el.querySelector('.seconds').textContent).toEqual(previousSeconds);
        });

        it('the labels are updating by the time when played', function () {
            var previousSeconds = el.querySelector('.seconds').textContent;
            clock.play();
            fakeTimer.tick(1000);
            expect(el.querySelector('.seconds').textContent).not.toEqual(previousSeconds);
        });

    });

    describe('Observing,', function () {
        var clock;
        var host;
        var observe = window.ClockModule.observe;

        beforeEach(function () {
            clock = new Clock(el);
            host = document.querySelector('.fixture');
            sinon.spy(clock, "play");
            sinon.spy(clock, "stop");
        });

        afterEach(function () {
            clock.play.restore();
            clock.stop.restore();
            clock.remove();
            clock = null;
        });

        it('observing the host element will react when attribute play added to it', function () {
            observe(host, clock);
            expect(clock.play.called).toEqual(false);
            host.setAttribute('play', true);
            waitsFor(function () {
                return clock.play.callCount > 0;
            });

            runs(function () {
                expect(clock.play.called).toEqual(true);
            });
        });
        it('observing the host element will stop reacting when attribute play is removed from it', function () {
            host.setAttribute('play', true);
            observe(host, clock);
            expect(clock.stop.called).toEqual(false);
            host.removeAttribute('play');
            waitsFor(function () {
                return clock.stop.callCount > 0;
            });
            runs(function () {
                expect(clock.stop.called).toEqual(true);
            });

        });
    });


});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DEFAULT_KEY = 'no_name';
var Timeout = (function () {
    function Timeout() {
        this._sandbox = {};
    }
    Timeout.prototype.timer = function (ms, key) {
        if (key === void 0) { key = DEFAULT_KEY; }
        var timeoutId;
        var type = 'timeout';
        var sandbox = this._sandbox;
        var clear = function () {
            clearTimeout(timeoutId);
            remove(key, sandbox, timeoutId, type);
        };
        return {
            execute: function (resolve) {
                timeoutId = setTimeout(function () {
                    resolve();
                    remove(key, sandbox, timeoutId, type);
                }, ms);
                create(key, sandbox, { id: timeoutId, type: type });
                return { clear: clear };
            },
            clear: clear
        };
    };
    Timeout.prototype.interval = function (ms, key) {
        if (key === void 0) { key = DEFAULT_KEY; }
        var intervalId;
        var type = 'interval';
        var sandbox = this._sandbox;
        var clear = function () {
            clearInterval(intervalId);
            remove(key, sandbox, intervalId, type);
        };
        return {
            execute: function (resolve) {
                intervalId = setInterval(resolve, ms);
                create(key, sandbox, { id: intervalId, type: type });
                return { clear: clear };
            },
            clear: clear
        };
    };
    Timeout.prototype.clearKey = function (key) {
        if (key === void 0) { key = DEFAULT_KEY; }
        if (this._sandbox[key]) {
            this._sandbox[key].forEach(function (item) {
                if (item.type === 'timeout') {
                    clearTimeout(item.id);
                }
                if (item.type === 'interval') {
                    clearInterval(item.id);
                }
            });
            delete this._sandbox[key];
        }
        return this._sandbox;
    };
    Timeout.prototype.destroy = function () {
        Object.keys(this._sandbox).forEach(this.clearKey.bind(this));
        return this._sandbox;
    };
    return Timeout;
}());
exports.default = Timeout;
function create(key, sandbox, timeItem) {
    if (typeof sandbox[key] === 'undefined') {
        sandbox[key] = [];
    }
    sandbox[key].push(timeItem);
    return sandbox;
}
;
function remove(key, sandbox, id, type) {
    var item = sandbox[key].find(function (item) { return item.type === type && item.id === id; });
    sandbox[key].splice(sandbox[key].indexOf(item), 1);
}
;
//# sourceMappingURL=Timeout.js.map
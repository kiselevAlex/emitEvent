function emitEvent(callback, stopCallback) {
    stopCallback = stopCallback !== undefined ? stopCallback : false;
    const ROOT_TAB = 'WS_ROOT_TAB';
    const LIFE_TIME = 5000;
    const TIMER_INTERVAL = 1000;
    this.prefix = 'ws-tabs-';
    this.tabName = this.prefix + Math.random();
    this.tabs = [];
    this.timerCheckTabs = null;
    this.storage = localStorage;
    Object.defineProperty(this, "isRoot", {
        get: function () {
            return this._isRoot;
        },
        set: function (val) {
            if (this._isRoot !== val) {
                if (val !== false) {
                    this._callback();
                } else if (this._stopCallback !== false) {
                    this._stopCallback();
                }
                window.isRoot = val;
                this._isRoot = val;
            }
        }
    });
    this._isRoot = false;
    this._callback = callback;
    this._stopCallback = stopCallback;

    /**
     *  Функция инициализирующая шину между вкладками
     */
    this.init = function () {
        this.createTimerCheckTab();
    };

    /**
     *  Функция создающая таймер контроля вкладок
     */
    this.createTimerCheckTab = function () {
        var _self = this;
        this.timerCheckTabs = setInterval(function () {
            var now = (new Date).getTime();
            _self.storage.setItem(_self.tabName, now);
            _self.tabs = [];
            for (var i = 0; i < _self.storage.length; i++) {
                var nameT = _self.storage.key(i);
                if ((new RegExp(_self.prefix)).test(nameT)) {
                    if (_self.storage.getItem(nameT) < now - LIFE_TIME)
                    _self.storage.removeItem(nameT);
                    else
                    _self.tabs.push(nameT);
                }
            }
            _self.managerRootTab();
        }, TIMER_INTERVAL); 
    };

    /**
     *  Функция управляющая назвачением root вкладки
     */
    this.managerRootTab = function () {
        var root = this.storage.getItem(ROOT_TAB);
        if (root == undefined || this.tabs.indexOf(root) == -1)
            this.storage.setItem(ROOT_TAB, this.tabName);
        this.isRoot = this.storage.getItem(ROOT_TAB) == this.tabName;
    };

    this.init();

}
var Cache = {
    remove: function(key){
        localStorage.removeItem(key);
    },
    set: function(key, value, duration) {
        var data = {
            value: value,
            expiryTime: !duration || isNaN(duration) ? 0 : this._getCurrentTimeStamp() + parseInt(duration)
        };
        localStorage[key] = JSON.stringify(data);
    },
    get: function(key) {
        var data = localStorage[key];
        if (!data || data === "null") {
            return null;
        }
        var now = this._getCurrentTimeStamp();
        var obj;
        try {
            obj = JSON.parse(data);
        } catch (e) {
            return null;
        }
        if (obj.expiryTime === 0 || obj.expiryTime > now) {
            return obj.value;
        }
        return null;

    },
    _getCurrentTimeStamp: function() {
        return Date.parse(new Date()) / 1000;
    }
};
module.exports = Cache;
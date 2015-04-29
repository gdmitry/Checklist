define('DataService', ['text!json/data.json'], function (textData) {
    'use strict';

    var DataService = function () {
        this.data = this.processData(textData);
        return this;
    }

    DataService.prototype.processData = function (textData) {
        var data;
        try {
            data = JSON.parse(textData);
        } catch (e) {
            throw Error("JSON.parse");
        }
        return data;
    }

    return new DataService();
});
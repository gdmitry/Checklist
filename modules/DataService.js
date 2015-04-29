define('DataService', ['text!json/data.json'], function (textData) {
    'use strict';

    var DataService = function () {
        this.textData = textData;       
        return this;
    }

    DataService.prototype.processData = function () {
        try {
            this.data = JSON.parse(this.textData);
        } catch (e) {
            throw Error("JSON.parse");
        }
        return this.data;
    }
    return new DataService();
});
define("LocalStorage", function () {
    'use strict';

    var LocalStorage = function () {
        this.localStorage = localStorage;
    };    

    LocalStorage.prototype.resetResults = function () {
        if (this.checkStorage()) {
           return this.localStorage.removeItem('testResults');
        }
    };

    LocalStorage.prototype.storeResults = function (results) {
        if (this.checkStorage()) {
            this.localStorage.setItem('testResults', JSON.stringify(results));
        }        
    };

    LocalStorage.prototype.retriveResults = function () {        
        if (this.checkStorage()) {
            try {
                return JSON.parse(this.localStorage.getItem('testResults')) || [];
            } catch (e) {
                throw Error("JSON.parse");
            }
        }
    };

    LocalStorage.prototype.checkStorage = function () {
        if (Modernizr.localstorage) {
            // window.localStorage is available!
            return true;
        } else {
            // no native support for HTML5 storage :(
            return false;
        }
    };
   
    return new LocalStorage();

});
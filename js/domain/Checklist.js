define(function () {
    'use strict';

    function checkStorage() {
        if (Modernizr.localstorage) {
            // window.localStorage is available!
            return true;
        } else {
            // no native support for HTML5 storage :(
            return false;
        }
    }

    function retriveResults() {
        if (checkStorage()) {
            this.results = JSON.parse(localStorage.getItem('testResults') || '[]');
        }
    }

    function storeResult() {
        if (checkStorage()) {
            localStorage.setItem('testResults', JSON.stringify(this.results));
        }
    }

    function resetStorage() {
        if (checkStorage()) {
            localStorage.removeItem('testResults');
        }
    }

    var Checklist = function () {
        this.results = [];
        retriveResults.call(this);
        return this;
    }

    Checklist.prototype.addResult = function (question, answer) {
        this.results.push({ question: question, answer: answer });

    }

    Checklist.prototype.resetResults = function () {
        resetStorage();
    }

    Checklist.prototype.storeResults = function () {
        storeResult.call(this);
    }

    return new Checklist();
});
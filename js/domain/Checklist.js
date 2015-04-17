define(function () {
    'use strict';

    var Checklist = function () {
        this.results = [];
        return this;
    }

    Checklist.prototype.addResult = function (question, answer) {
        this.results.push({ question: question, answer: answer });
    }

    return new Checklist();
});
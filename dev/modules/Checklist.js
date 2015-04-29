define("Checklist", ["LocalStorage"], function (LocalStorage) {
    'use strict';

    var Checklist = function () {
        this.results = LocalStorage.retriveResults();        
        return this;
    };

    Checklist.prototype.addResult = function (question, answer, isLastQuestion) {
        this.results.push({ question: question, answer: answer });
        if (isLastQuestion) {
            LocalStorage.storeResults(this.results);
        }
    };
    
    return new Checklist();
});
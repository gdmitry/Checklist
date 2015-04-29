define("Model", ['DataService'], function (dataService) {
    'use strict';

    var Model = function () {
        this.data = dataService.data;
        return this;
    };

    Model.prototype.getQuestions = function () {
        var questions = this.data && this.data.checklist && this.data.checklist.questions || [];
        return questions;
    };

    Model.prototype.getAnswers = function () {
        var answers = this.data && this.data.checklist && this.data.checklist.answers || [];
        return answers;
    };

    Model.prototype.getPositiveResult = function () {
        var positiveResult = this.data && this.data.checklist && this.data.checklist.results && this.data.checklist.results.positive || "";
        return positiveResult;
    };

    Model.prototype.getNegativeResult = function () {
        var negativeResult = this.data && this.data.checklist && this.data.checklist.results && this.data.checklist.results.negative || "";
        return negativeResult;
    };

    return Model;
});
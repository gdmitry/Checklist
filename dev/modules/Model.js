define(['./DataService', './LocalStorage'], function (dataService, localStorage) {
    'use strict';

    var Model = function () {
        this.data = dataService.data;
        this.results = JSON.parse(localStorage.getItem('testResults')) || [];

        this.getQuestions = function () {
            var questions = this.data && this.data.checklist && this.data.checklist.questions || [];
            return questions;
        };

        this.getAnswers = function () {
            var answers = this.data && this.data.checklist && this.data.checklist.answers || [];
            return answers;
        };

        this.addResult = function (question, answer, isLastQuestion) {
            this.results.push({ question: question, answer: answer });
            if (isLastQuestion) {
                localStorage.setItem('testResults', JSON.stringify(this.results));
            }
        };
    };

    return new Model();
});
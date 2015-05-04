// http://jsfiddle.net/rniemeyer/FvZXj/
// http://jsfiddle.net/rniemeyer/8eeUR/

define(["./Model"], function (model) {
    'use strict';

    if (typeof Array.prototype.some !== 'function') {
        Array.prototype.some = function () {
            var i;
            var self = arguments[1];

            for (i = 0; i < this.length; i++) {
                if (arguments[0].call(self, this[i], i, this)) {
                    return;
                }
            }
        }
    }

    if (typeof Array.prototype.forEach !== 'function') {
        Array.prototype.forEach = function () {
            var i;
            var self = arguments[1];

            for (i = 0; i < this.length; i++) {
                arguments[0].call(self, this[i], i, this);
            }
        }
    }

    var ViewModel = function () {

        $(".card").css("visibility", "visible");
        var self = this;

        this.currentQuestionId = ko.observable(0);

        this.allQuestions = model.getQuestions();

        this.allAnswers = model.getAnswers();

        this.currentQuestion = ko.computed(function () {
            var output;

            this.allQuestions.some(function (question) {
                if (question.id === this.currentQuestionId()) {
                    output = question;
                    return true;
                }
            }, this);

            return output;
        }, this);

        this.No = ko.observable(1);

        this.questionTitle = ko.computed(function () {
            return "Вопрос " + this.No() + ": " + this.currentQuestion().name;
        }, this);

        this.answers = ko.computed(function () {
            var output = [];
            var answers = this.currentQuestion().availableAnswersIds;

            answers.forEach(function (answerId) {
                this.allAnswers.some(function (answer) {
                    if (answer.id === answerId) {
                        output.push(answer);
                        return true;
                    }
                }, this);
            }, this);

            return output;
        }, this);

        this.TestName = ko.observable("Тест: Любите ли Вы животных?");
        this.results = ko.observableArray(model.results);

        this.shouldShowResults = ko.computed(function () {
            if (this.results().length) {
                $(".result-table").trigger("TableVisibleEvent");
                return true;
            } else {
                $(".result-table").trigger("TableHiddenEvent");
                return false;
            }
        }, this);

        this.shouldShowForm = ko.computed(function () {
            return (!this.shouldShowResults());
        }, this);

        this.selectedAnswer = ko.observable();

        this.setSelectedAnswer = function (answer) {
            self.selectedAnswer(answer);
            return true;
        };


        this.setNextQuestion = function () {
            if (self.selectedAnswer()) {
                if (self.selectedAnswer().nextQuestionId == -1) {
                    model.addResult(self.currentQuestion(), self.selectedAnswer(), true);
                    self.results(model.results);
                    self.selectedAnswer(null);
                    return;
                }
                model.addResult(self.currentQuestion(), self.selectedAnswer(), false);
                self.currentQuestionId(self.selectedAnswer().nextQuestionId);
                self.No(self.No() + 1);
                self.selectedAnswer(null);
            }
            else {
                alert("Не выбран ни один из пунктов!");
            }
        };

        this.resetTest = function () {
            self.currentQuestionId(0);
            self.No(1);
            self.results([]);
            model.results.length = 0;
        };
    };

    return new ViewModel();

});
// http://jsfiddle.net/rniemeyer/FvZXj/
// http://jsfiddle.net/rniemeyer/8eeUR/

define("ViewModel", ["Model", "Checklist"], function (Model, Checklist) {
    'use strict';

    var model = new Model();

    var ViewModel = function (koTest) {
        $(".card").css("visibility", "visible");
        var self = this;
        this.ko = koTest || ko;
        this.currentQuestionId = this.ko.observable(0);
        this.allQuestions = model.getQuestions();
        this.allAnswers = model.getAnswers();

        this.currentQuestion = this.ko.computed(function () {
            var output;

            this.allQuestions.some(function (question) {
                if (question.id == this.currentQuestionId()) {
                    output = question;
                    return true;
                }
            }, this);

            return output;
        }, this);

        this.No = this.ko.observable(1);

        this.questionTitle = this.ko.computed(function () {
            return "Вопрос " + this.No() + ": " + this.currentQuestion().name;
        }, this);

        this.answers = this.ko.computed(function () {
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

        this.TestName = this.ko.observable("Тест: Любите ли Вы животных?");
        this.results = this.ko.observableArray(Checklist.results);

        this.shouldShowResults = this.ko.computed(function () {
            if (this.results().length) {
                $(".result-table").trigger("TableVisibleEvent");
                return true;
            } else {
                $(".result-table").trigger("TableHiddenEvent");
                return false;
            }
        }, this);

        this.shouldShowForm = this.ko.computed(function () {
            return (!this.shouldShowResults());
        }, this);

        this.selectedAnswer = this.ko.observable();

        this.setSelectedAnswer = function (answer) {
            self.selectedAnswer(answer);
            return true;
        };

        this.setNextQuestion = function () {
            /* at least one check is required  */
            if (self.selectedAnswer()) {
                if (self.selectedAnswer().nextQuestionId == -1) {
                    Checklist.addResult(self.currentQuestion(), self.selectedAnswer(), true);
                    self.results(Checklist.results);
                    self.selectedAnswer(null);
                    return;
                }
                Checklist.addResult(self.currentQuestion(), self.selectedAnswer(), false);
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
            Checklist.results.length = 0;
        };
    };

    return ViewModel;
});
// http://jsfiddle.net/rniemeyer/FvZXj/
// http://jsfiddle.net/rniemeyer/8eeUR/

define(["./Model", "./Checklist"], function (Model, Checklist) {
    'use strict';

    function initView() {
        $(".card").css("visibility", "visible");
        if (Checklist.results.length) {
            this.results(Checklist.results);
            this.shouldShowForm(false);
            this.shouldShowResults(true);
            $(".result-table").trigger("TableVisibleEvent");
        }
    }

    /* Gets answers by id for current question */
    function initAnswers(currentQuestion) {
        var i;
        var j;
        var len;
        var len1;
        var output = [];
        var elem;
        var elem1;
        var allAnswers = Model.getAnswers();
        var answers = currentQuestion().availableAnswersIds;

        len = answers.length;
        len1 = allAnswers.length;
        for (i = 0; i < len; i++) {
            elem = answers[i];
            for (j = 0; j < len1; j++) {
                elem1 = allAnswers[j];
                if (elem == elem1.id) {
                    output.push(elem1);
                    break;
                }
            }
        }
        return output;
    };

    var ViewModel = function () {
        var self = this;
        this.currentQuestion = ko.observable(Model.getQuestions()[0]);
        this.No = ko.observable(1);
        this.questionTitle = ko.computed(function () {
            return "Вопрос " + self.No() + ": " + self.currentQuestion().name;
        });
        this.answers = ko.computed(function () {
            return initAnswers(self.currentQuestion);
        });
        this.TestName = ko.observable("Тест: Любите ли Вы животных?");
        this.results = ko.observable();
        this.shouldShowResults = ko.observable(false);
        this.shouldShowForm = ko.observable(true);
        this.selectedAnswer = ko.observable();
        initView.call(this);

        this.setSelectedAnswer = function (answer) {
            self.selectedAnswer(answer);
            $(".choice").each(function () {
                $(this).change(function () {
                    $(".choice").prop('checked', false);
                    $(this).prop('checked', true);
                });
            });
            /* makes checked but leave others checked*/
            return true;
        }

        this.setNextQuestion = function () {
            /* check if one is checked  */
            if ($('input[name=availableAnswers]:checked').length) {
                Checklist.addResult(self.currentQuestion(), self.selectedAnswer());
                self.results(Checklist.results);
                if (self.selectedAnswer().nextQuestionId == -1) {
                    self.shouldShowForm(false);
                    self.shouldShowResults(true);
                    $(".result-table").trigger("TableVisibleEvent");
                    Checklist.storeResults();
                    return;
                }
                updateCurrentQuestion(self.selectedAnswer().nextQuestionId);
                self.No(self.No() + 1);
            }
            else {
                alert("Не выбран ни один из пунктов!");
            }
        }

        this.resetTest = function () {
            var allQuestions;

            $(".choice").prop('checked', false);
            allQuestions = Model.getQuestions();
            self.shouldShowForm(true);
            self.shouldShowResults(false);
            $(".result-table").trigger("TableHiddenEvent");
            updateCurrentQuestion(allQuestions[0]);
            self.No(1);
            Checklist.results.length = 0;
            //Checklist.resetResults();
        }

        function updateCurrentQuestion(id) {
            var allQuestions;
            var i;
            var len;
            var elem;

            if (typeof id.name !== 'undefined') {
                self.currentQuestion(id);
                return;
            }

            allQuestions = Model.getQuestions();
            len = allQuestions.length;

            for (i = 0; i < len; i++) {
                elem = allQuestions[i];
                if (elem.id == id) {
                    self.currentQuestion(elem);
                    break;
                }
            }
        };
    }

    return ViewModel;
});
var knockout = "../../dev/lib/knockout";

// https://iterativo.wordpress.com/2012/03/06/unit-testing-javascript-modules-using-requirejs-and-jasmine/

define(['ViewModel', knockout], function (ViewModel, knockout) {


    describe("ViewModel", function () {
        var viewModel;

        beforeEach(function () {
            viewModel = new ViewModel(knockout);
            viewModel.allQuestions = [
            {
                "id": 0,
                "name": "Кормили ли Вы когда-либо каких-нибудь животных?",
                "availableAnswersIds": [0, 1, 2]
            },
            {
                "id": 1,
                "name": "Есть ли у Вас дома животные?",
                "availableAnswersIds": [3, 4, 5]
            }];

            viewModel.allAnswers = [
            {
                "id": 0,
                "name": "Да, конечно.",
                "nextQuestionId": 1
            },
            {
                "id": 1,
                "name": "Ну вот еще! Я лучше все сам(а) съем!",
                "nextQuestionId": 1
            },
            {
                "id": 2,
                "name": "Нет, я всех животных обхожу стороной.",
                "nextQuestionId": 1
            },
            {
                "id": 3,
                "name": "Да (кошка, собака, хомяк и пр.)",
                "nextQuestionId": 2
            },
            {
                "id": 4,
                "name": "Пока нет, но хочу завести.",
                "nextQuestionId": 2
            },
            {
                "id": 5,
                "name": " Ну да, еще и убирать за ними. Нет уж, увольте!",
                "nextQuestionId": 2
            }
            ];

        });

        describe('When change currentQuestionId', function () {

            it('should change currentQuestion', function () {
                var before;
                var after;

                spyOn(viewModel, "currentQuestion").and.callThrough();
                before = viewModel.currentQuestion();
                viewModel.currentQuestionId(1);
                after = viewModel.currentQuestion();
                expect(JSON.stringify(before)).toBe('{"id":0,"name":"Кормили ли Вы когда-либо каких-нибудь животных?","availableAnswersIds":[0,1,2]}');
                expect(JSON.stringify(after)).toBe('{"id":1,"name":"Есть ли у Вас дома животные?","availableAnswersIds":[3,4,5]}');
                expect(viewModel.currentQuestion).toHaveBeenCalled();
                expect(viewModel.currentQuestion.calls.count()).toEqual(4);
            });

            it('should change questionTitle', function () {
                var before;
                var after;

                spyOn(viewModel, "currentQuestion").and.callThrough();
                before = viewModel.questionTitle();
                viewModel.currentQuestionId(1);
                after = viewModel.questionTitle();

                expect(before).toBe("Вопрос 1: Кормили ли Вы когда-либо каких-нибудь животных?");
                expect(after).toBe("Вопрос 1: Есть ли у Вас дома животные?");
                expect(viewModel.currentQuestion).toHaveBeenCalled();
                expect(viewModel.currentQuestion.calls.count()).toEqual(2);
            });

            it('should change answers', function () {
                var before;
                var after;

                viewModel.currentQuestionId(0);
                before = viewModel.answers();
                viewModel.currentQuestionId(1);
                after = viewModel.answers();
                expect(before).toEqual([
            {
                "id": 0,
                "name": "Да, конечно.",
                "nextQuestionId": 1
            },
            {
                "id": 1,
                "name": "Ну вот еще! Я лучше все сам(а) съем!",
                "nextQuestionId": 1
            },
            {
                "id": 2,
                "name": "Нет, я всех животных обхожу стороной.",
                "nextQuestionId": 1
            }]);
                expect({}).toEqual({});

            });
        });

    });
});
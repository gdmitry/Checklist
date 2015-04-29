define(["LocalStorage", "Checklist"], function (LocalStorage, checklist) {

    describe("Checklist", function () {

        beforeEach(function () {
            checklist.results = [];
        });

        describe('When add a result', function () {
            var question;
            var answer;
            var isLastQuestion;

            beforeEach(function () {
                question = {
                    "id": 0,
                    "name": "Кормили ли Вы когда-либо каких-нибудь животных?",
                    "availableAnswersIds": [0, 1, 2]
                }
                answer = {
                    "id": 0,
                    "name": "Да, конечно.",
                    "nextQuestionId": 1
                };
                spyOn(LocalStorage, "storeResults");
            });

            it('should add result to array results and don"t save it to localStorage for not last result', function () {
                isLastQuestion = false;

                checklist.addResult(question, answer, isLastQuestion);
                expect(LocalStorage.storeResults).not.toHaveBeenCalled();
                expect(checklist.results.length).toBe(1);
            });

            it('should add result to array results and save it to localStorage for last result', function () {
                isLastQuestion = true;

                checklist.addResult(question, answer, isLastQuestion);
                expect(LocalStorage.storeResults).toHaveBeenCalled();
                expect(checklist.results.length).toBe(1);
            });
        });
    });
});
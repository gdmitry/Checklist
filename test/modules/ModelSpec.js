// http://josephchapman.com/post/jasmine-mocks-and-spies/
// http://www.htmlgoodies.com/html5/javascript/spy-on-javascript-methods-using-the-jasmine-testing-framework.html#fbid=dyhDj7xPY-M
// http://jasmine.github.io/2.0/introduction.html

define(['Model'], function (Model) {

    describe("Model", function () {
        var model;

        beforeEach(function () {
            model = new Model();
        });

        describe('When data is empty object', function () {
            var result;

            beforeEach(function () {
                model.data = {};
            });

            it('should return empty array of questions', function () {
                result = model.getQuestions();
                expect(result.length).toBe(0);
            });

            it('should return empty array of answers', function () {
                result = model.getAnswers();
                expect(result.length).toBe(0);
            });

            it('should return empty message string of positive result', function () {
                result = model.getPositiveResult();
                expect(typeof result).toBe('string');
                expect(result.length).toBe(0);
            });

            it('should return empty message string of negative result', function () {
                result = model.getNegativeResult();
                expect(typeof result).toBe('string');
                expect(result.length).toBe(0);
            });
        });

        describe('When data is undefined', function () {
            var result;

            beforeEach(function () {
                model.data = undefined;
            });

            it('should return empty array of questions', function () {
                result = model.getQuestions();
                expect(result.length).toBe(0);
            });

            it('should return empty array of answers', function () {
                result = model.getAnswers();
                expect(result.length).toBe(0);
            });

            it('should return empty message string of positive result', function () {
                result = model.getPositiveResult();
                expect(typeof result).toBe('string');
                expect(result.length).toBe(0);
            });

            it('should return empty message string of negative result', function () {
                result = model.getNegativeResult();
                expect(typeof result).toBe('string');
                expect(result.length).toBe(0);
            });
        });
    });
});

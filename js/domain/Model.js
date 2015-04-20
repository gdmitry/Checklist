define(function () {
    'use strict';

    function handler() {
        this.model.data = getJsonString.call(this,
            function (successMessage) {
                console.info(successMessage);
            },
            function (errorMessage) {
                console.error(errorMessage);
            });
    }

    function getJsonString(onSuccess, onFailure) {
        var JsonString;
        var data;

        if (this.readyState === 4) {
            if (this.status === 200) {
                JsonString = this.responseText;
                try {
                    data = JSON.parse(JsonString);
                    onSuccess("File successully parsed!");
                    return data;
                } catch (err) {
                    onFailure("Cannot parse JSON file!");
                }
            } else {
                onFailure("There was a problem with the request! " + this.status);
            }
        }
    }

    function makeRequest(url, handler) {
        var httpRequest;

        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                }
            }
        }

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        httpRequest.overrideMimeType("text/html");
        httpRequest.model = new Model();
        httpRequest.onreadystatechange = handler;
        httpRequest.open('GET', url, false);
        httpRequest.send();
        return httpRequest.model;
    }

    var Model = function () {
        this.data = [];
        return this;
    }

    Model.prototype.getQuestions = function () {
        var questions = this.data.checklist.questions || [];
        return questions;
    }

    Model.prototype.getAnswers = function () {
        var answers = this.data.checklist.answers;
        return answers;
    }

    Model.prototype.getPositiveResult = function () {
        var positiveResult = this.data.checklist.results.positive;
        return positiveResult;
    }

    Model.prototype.getNegativeResult = function () {
        var negativeResult = this.data.checklist.results.negative;
        return negativeResult;
    }

    return makeRequest('./json/data.json', handler);
});

(function () {
    'use strict';

    var cardElement = $(".card");
    var tableElement = $(".result-table");
    var button = $('.animateButton');

    var TIMEOUT = 500;
    var isResultTableVisible = true;

    function animateUp() {
        tableElement
            .stop()
            .animate({ boxShadow: '10px 10px 5px', top: 0, left: 0 }, 'fast');

        if (isResultTableVisible) {
            setTimeout(animateDown, TIMEOUT);
        }
    };

    function animateDown() {
        tableElement
            .stop()
            .animate({ boxShadow: '3px 3px 3px', top: 3, left: 3 }, 'fast');

        if (isResultTableVisible) {
            setTimeout(animateUp, TIMEOUT);
        }
    };

    // TO DO: Refactor event handlers for TableVisibleEvent and TableHiddenEvent to use one event
    function toggleButton() {

    }

    button.click(animateUp);
    cardElement.append('<button type="button" style="visibility: hidden" class="animateButton">Animate</button>');

    tableElement.on("TableVisibleEvent", function () {
        button.css('visibility', 'visible');
        isResultTableVisible = true;
    });

    tableElement.on("TableHiddenEvent", function () {
        button.css('visibility', 'hidden');
        isResultTableVisible = false;
    });

})();

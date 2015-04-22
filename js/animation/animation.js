﻿// Define a new events.
var TableVisibleEvent = new CustomEvent(
  "TableVisible",
  {
      detail: {
          message: "Hello there",
          time: new Date()
      },
      bubbles: true,
      cancelable: true
  });

var TableHiddenEvent = new CustomEvent(
  "TableHiddenEvent",
  {
      detail: {
          message: "Hello there",
          time: new Date()
      },
      bubbles: true,
      cancelable: true
  });

(function () {
    'use strict';

    $(".card").append('<button type="button" style="visibility: hidden" class="animateButton">Animate</button>');

    var time = 500;
    var isResultTableVisible = true;
    var animateUp = function () {
        $('.result-table').stop().animate({ boxShadow: '10px 10px 5px', top: 0, left: 0 }, 'fast');
        if (isResultTableVisible) {
            setTimeout(animateDown, time);
        }
    };

    var animateDown = function () {
        $('.result-table').stop().animate({ boxShadow: '3px 3px 3px', top: 3, left: 3 }, 'fast');
        if (isResultTableVisible) {
            setTimeout(animateUp, time);
        }
    };

    $('.animateButton').click(function () {
        animateUp();
    });

    $(".result-table").on("TableVisibleEvent", function () {      
       $('.animateButton').css('visibility', 'visible');
    });

    $(".result-table").on("TableHiddenEvent", function () {       
       $('.animateButton').css('visibility', 'hidden');
    });

})();

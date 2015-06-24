var STATES = {
    default: 1,
    inprogress: 2,
    complete: 3
};


var app = (function(my) {

    my.lastResult = '';
    my.state = STATES.default;

    /**
     * Public
     */

    my.init = function() {};


    my.setTimer = function() {
        my.state = STATES.inprogress;
        setTimeout(function() {
            getResults();
        }, 6000);
    };


    my.clearResults = function() {
        my.lastResult = '';
        my.state = STATES.default;
        chrome.browserAction.setBadgeText({
            'text': '',
        });
    };


    /**
     * Private
     */

    var getResults = function() {
        var RESPONSE_URL = "https://bravenewtech.org/";
        var email = localStorage.email || '';
        RESPONSE_URL += "/hsf/reply.php?email=" + email;

        $.getJSON(RESPONSE_URL)
            .done(function(response) {
                processResponse(response);
            })
            .fail(function(xhr, error) {
                console.log(error);
                my.lastResult = {
                    error: 'Network Error'
                };
            })
            .always(function() {
                my.state = STATES.complete;
            });
    };


    var processResponse = function(json) {
        my.lastResult = json;
        setIcon('1');
    };


    var setIcon = function(badgeText) {
        chrome.browserAction.setBadgeText({
            'text': badgeText.toString(),
        });
    };


    return my;

})(app || {});

app.init();
var STATES = {
  default: 1,
  inprogress: 2,
  complete: 3
};


var app = (function (my) {

  my.lastResult = '';
  my.state = STATES.default;

  /**
   * Public
   */

  my.init = function() {
  };


  my.setTimer = function(){
    my.state = STATES.inprogress;
    setTimeout(function(){
      getResults();
    }, 6000);
  };


  my.clearResults = function(){
    my.lastResult = '';
    my.state = STATES.default;
    chrome.browserAction.setBadgeText({
      'text': '',
    });
  };


  /**
   * Private
   */

  var getResults = function(){
    var RESPONSE_URL = "https://bravenewtech.org/";
    var email = localStorage.email || '';
    RESPONSE_URL += "/hsf/reply.php?email=" + email;

    $.getJSON(RESPONSE_URL)
      .done(function(response){
        processResponse(response);
      })
      .fail(function(xhr, error){
        console.log(error);
        my.lastResult = {error: 'Network Error'};
      })
      .always(function(){
        my.state = STATES.complete;
      });
  };


  var processResponse = function(json){
    my.lastResult = json;
    setIcon('1');
  };


  var setIcon = function(badgeText){
    chrome.browserAction.setBadgeText({
      'text': badgeText.toString(),
    });
  };


  return my;

})(app || {});


app.init();

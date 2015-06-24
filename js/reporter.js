var Reporter = (function() {

    var DOMAIN = 'mail.google.com';
    var my = {};
    var bg = chrome.extension.getBackgroundPage();
    var email = localStorage.email || '';

    my.init = function() {
        initView();
        initUI();
    };

    var initView = function() {
        if (checkResults()) {} else if (!email) {
            setView(['#loginView']);
        } else {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                if (!tabs[0] || !tabs[0].url) return;
                processUrl(tabs[0].url);
                checkResults();
            });
        }
    };

    var setView = function(arrViews) {
        $('.view').hide();
        if (!arrViews) return;
        for (var i = 0, len = arrViews.length; i < len; i++) {
            var view = arrViews[i];
            $(view).show();
        }
    };

    var checkResults = function() {
        if (bg.app.lastResult) {
            var result = renderResult(bg.app.lastResult);
            $('#last-result').html(result);
            setView(['#resultsView']);
        } else if (bg.app.state === bg.STATES.inprogress) {
            setStatus('warning', 'Request in progress');
            setView([]);
        }
        if (bg.app.state === bg.STATES.default) return false;
        else return true;
    };

    var initUI = function() {
        initLoginForm();
        var submitHandler = function() {
            var fullheaders = localStorage.encrypted;
            var urls = localStorage.extracted;
            localStorage.email = email;

            sendData({
                original: {
                    headers: fullheaders,
                    email: email,
                    urls: urls
                }
            });
            bg.app.setTimer();
        };

        var $form = $('#submitForm');
        // Validation
        $form.validate({
            submitHandler: submitHandler
        });

        // "Submit a new request" button
        $('#clear').click(function(e) {
            e.preventDefault();
            bg.app.clearResults();
            document.location.reload();
        });

        // Opens all links in new tabs
        $('body').on('click', 'a', function(e) {
            chrome.tabs.create({
                url: this.href
            });
        });
    };


    var initLoginForm = function() {
        var $form = $('#loginForm');
        var submitHandler = function() {
            var email = $('#inputEmail').val();
            localStorage.email = email;
            var msg = 'Thanks, your email is saved in local storage and will only be used for future communications between you and the HSF Engine.';
            msg += '<div class="btn btn-success" id="continue">Continue to submission &rarr;</div>';
            setStatus('success', msg);
            $('#continue').click(function() {
                document.location.reload();
            });
        };
        $form.validate({
            submitHandler: submitHandler
        });
    };


    var renderResult = function(json) {
        if (typeof json !== 'object') return "An error has occured";
        if (json && json.error) return json.error;
        var html = '<table>';
        for (var key in json[0]) {
            var value = json[0][key];
            if (key === 'link') value = HTML.A(value, value);
            var row = [key, value];
            html += HTML.TR(row);
        }
        html += '</table>';
        return html;
    };


    var processUrl = function(url) {
        var host = getHost(url);
        host = host.replace(/^www/, '');
        if (DOMAIN === host || DOMAIN === 'www.' + host) {
            setView(['#submitView']);

        } else {
            setView([]);
            setStatus('danger', 'Hey, sorry, this only works for ' + DOMAIN);
        }
    };


    var getHost = function(url) {
        var aLink = document.createElement("a");
        aLink.href = url;
        return aLink.host;
    };

    var sendData = function(data) {
        var API_URL = 'https://bravenewtech.org/hsf/post.php';
        $.post(API_URL, data.original)
            .done(onSuccess)
            .fail(onError);
    };


    var onSuccess = function(response) {
        var timeout = 5000;
        setStatus('warning', 'Request in progress', timeout);
        $('#submitView').slideUp();
        setTimeout(function() {
            window.close();
        }, timeout);
    };


    var onError = function(xhr, error) {
        setStatus('danger', error, 5000);
        console.log(error);
    };

    var setStatus = function(alertClass, text, timeout) {
        var $status = $('#status');
        $status[0].className = 'text-center alert alert-' + alertClass;
        $status.html(text);
        $status.show();
        if (timeout) setTimeout(function() {
            $status.hide();
        }, timeout);
    };

    return my;

})();

var HTML = (function() {
    var my = {};

    my.TR = function(tds) {
        var res = '<tr>';
        for (var i = 0, len = tds.length; i < len; i++) {
            var td = tds[i];
            res += '<td>' + td + '</td>';
        }
        return res += '</tr>';
    };

    my.A = function(href, anchor) {
        return '<a href="' + href + '">' + anchor + '</a>';
    };

    return my;

})();

chrome.tabs.query({
    'active': true,
    'lastFocusedWindow': true
}, function(tabs) {
    var theurl = tabs[0].url;
    if (localStorage.ik === undefined) {
        var myxhr = new XMLHttpRequest();
        myxhr.open("GET", theurl, true);
        myxhr.onreadystatechange = function() {
            if (myxhr.readyState == 4) {
                var test = myxhr.responseText;
                var regex = /GLOBALS=\[(.*)@/g;
                var input = myxhr.responseText;
                if (regex.test(input)) {
                    var matches = input.match(regex);
                    var lostandfound = matches[0];
                    var found = lostandfound.split(',');
                    localStorage.ik = found[found.length - 2];
                }
            }
        };
        myxhr.send();
    }
    if (localStorage.ik !== undefined) {
        var ik = localStorage.ik;
        var source_url = "https://mail.google.com/mail/u/0/?ui=2&ik=" + ik.replace(/"/g, '') + "&view=om&th=" + theurl.substr(theurl.lastIndexOf('/') + 1);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", source_url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var extracted = [];
                var text = xhr.responseText;
                var regexp = /(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))/ig;
                while ((matches = regexp.exec(text)) !== null) {
                    extracted.push(matches[0]);
                }
                localStorage.extracted = extracted;
                document.getElementById("report_urls").innerText = localStorage.extracted;
                document.getElementById("report_headers").innerText = xhr.responseText;
                var openpgp = window.openpgp;
                var pub_key = openpgp.key.readArmored($('#pubkey').text());
                var message = xhr.responseText;
                var pgpMessage = openpgp.encryptMessage(pub_key.keys, message);
                localStorage.encrypted = pgpMessage;
            }
        };
        xhr.send();
    }
});

Reporter.init();
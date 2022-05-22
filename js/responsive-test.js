	var $_GET = {}

	var list = new Array;

	function validURL(str) {
	    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
	        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
	        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
	        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
	        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
	        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
	    return !!pattern.test(str);
	}

	$_GET['f'] = localStorage["bundle:f"] || "";

	if (document.location.toString().indexOf('?') !== -1) {
	    var query = document.location.toString()
	        .replace(/^.*?\?/, '')
	        .replace(/#.*$/, '')
	        .split('&');

	    for (var i = 0, l = query.length; i < l; i++) {
	        var aux = decodeURIComponent(query[i]).split('=');
	        $_GET[aux[0]] = aux[1];
	    }
	}

	var website = $_GET["q"]
	if (website === undefined) website = localStorage['bundle:q'] || "";
	document.wform.website.value = website;

	function push_back() {

	    if (document.wform.website.value == "") {
	        alert("Please, specify an URL..")
	        return;
	    }

	    if (!document.wform.website.value.startsWith("http://") && !document.wform.website.value.startsWith("https://")) {
	        document.wform.website.value = "https://" + document.wform.website.value;
	    }

	    if (!validURL(document.wform.website.value) || document.wform.website.value == "") {
	        alert("URL \"" + document.wform.website.value + "\" is unvalid..")
	        return;
	    }

	    if (document.wform.website.value.startsWith("http://")) {
	        alert("Oops! You tried to log in with a non-HTTPS domain.. This is not allowed !");
	        return;
	    }

        checkUrlFrameOptions(document.wform.website.value).then(function() {

            var query = document.getElementById('copy').href
                .toString().replace(/^.*?\?/, '')
                .replace(/#.*$/, '')
                .split('&');

            for (var i = 0, l = query.length; i < l; i++) {
                var aux = decodeURIComponent(query[i]).split('=');
                $_GET[aux[0]] = aux[1];
            }

            list.push(document.wform.website.value);

            var getvars = "?";
            getvars += "q=" + list[list.length - 1]
            if (typeof $_GET['f'] !== "undefined") getvars += "&";
            if (typeof $_GET['f'] !== "undefined") getvars += "f=" + $_GET['f'];
            if (getvars == "?") getvars = ""

            document.getElementById('copy').href = window.location.protocol + "//" + window.location.host + window.location.pathname + getvars;

            iframe_loaded = 0;
            document.getElementById('demo-iframe').src = list[list.length - 1];
            setTimeout(isloaded, 5000);

            document.getElementById('pop-out').href = list[list.length - 1];
            document.getElementById('display').value = "Afficher..";
            if (list.length > 1) document.getElementById('display').value += " (" + list.length + ")";

        }, function() {

	         alert("Oops! This domain doesn't allow to load within iframe !");
        });
	}

	function frameload() {
	    iframe_loaded = 1;
	}

	function isloaded() {

	    if (!iframe_loaded)
	        document.getElementById('demo-iframe').src = "https://dev.glitchr.io/responsive-test/error.html";
	}

	function refresh() {

	    if (!list.length)
	        return push_back();

	    var query = document.getElementById('copy').href
	        .toString().replace(/^.*?\?/, '')
	        .replace(/#.*$/, '')
	        .split('&');
	    for (var i = 0, l = query.length; i < l; i++) {
	        var aux = decodeURIComponent(query[i]).split('=');
	        $_GET[aux[0]] = aux[1];
	    }

	    var getvars = "?";
	    getvars += "q=" + list[list.length - 1]
	    if (typeof $_GET['f'] !== "undefined") getvars += "&";
	    if (typeof $_GET['f'] !== "undefined") getvars += "f=" + $_GET['f'];
	    if (getvars == "?") getvars = ""

	    document.getElementById('copy').href = window.location.protocol + "//" + window.location.host + window.location.pathname + getvars;

	    iframe_loaded = 0;
	    document.getElementById('demo-iframe').src = list[list.length - 1];
	    setTimeout(isloaded, 5000);

	    document.getElementById('pop-out').href = list[list.length - 1];
	    document.getElementById('display').value = "Afficher..";
	    if (list.length > 1) document.getElementById('display').value += " (" + list.length + ")";
	}

    function checkUrlFrameOptions(apiurl){
        return fetch("https://header-inspector.repalash.workers.dev/?" + new URLSearchParams({
          'apiurl': apiurl,
          'headers': 'x-frame-options'
        }), {
          method: 'GET'
        }).then(r => r.json()).then(json => {
          let xFrameOp = (json.headers['x-frame-options'] || '').toLowerCase();
          
          // deny all requests
          if(xFrameOp==='deny') throw new Error();

          // deny if different origin
          if(xFrameOp==='sameorigin' && json.origin !== location.origin) throw new Error();

          return true;
        }, function() { return true; })
      }

	function pop_back() {

	    list.pop();

	    var query = document.getElementById('copy').href
	        .toString().replace(/^.*?\?/, '')
	        .replace(/#.*$/, '')
	        .split('&');

	    for (var i = 0, l = query.length; i < l; i++) {
	        var aux = decodeURIComponent(query[i]).split('=');
	        $_GET[aux[0]] = aux[1];
	    }

	    if (!list.length) {

	        if (typeof $_GET['q'] !== "undefined") url = $_GET["q"];
	        else url = "https://dev.glitchr.io/responsive-test/default.html";
	        list.push(url);
	        document.wform.website.value = "";
	        localStorage["bundle:q"] = "";
	    }

	    var getvars = "?";
	    getvars += "q=" + list[list.length - 1]
	    if ($_GET['f'] != 'undefined') getvars += "&";
	    if ($_GET['f'] != 'undefined') getvars += "f=" + $_GET['f'];
	    if (getvars == "?") getvars = ""

	    document.getElementById('copy').href = window.location.protocol + "//" + window.location.host + window.location.pathname + getvars;
	    document.getElementById('demo-iframe').src = list[list.length - 1];
	    document.getElementById('pop-out').href = list[list.length - 1];
	    document.getElementById('display').value = "Afficher..";
	    if (list.length > 1) document.getElementById('display').value += " (" + list.length + ")";
	}

	var submitHandler = function () {
	    push_back();
	    return false;
	}

	function copy_clipboard() {

	    var container = document.createElement('div')
	    container.innerHTML = document.getElementById('copy').href
	    container.style.pointerEvents = 'none'

	    document.body.appendChild(container)
	    window.getSelection().removeAllRanges()

	    var range = document.createRange()
	    range.selectNode(container)
	    window.getSelection().addRange(range)

	    document.execCommand('copy')

	    document.body.removeChild(container)
	}

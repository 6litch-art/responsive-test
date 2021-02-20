
<?php

$website = $_GET['q'];
$placeholder = $_GET['q'];
if(!isset($website)) {

	$website = "https://responsive-test.glitchr.io/default.html";
	$placeholder = "http://www.monsite.com";
}

$format  = $_GET['f'];
$copy = $_SERVER["REQUEST_URI"];

?>

<!DOCTYPE HTML>

<html>

<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Responsive Test UI</title>

    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
	<meta name="description" content="">
    <meta name="keywords" content="html5, css3, responsive, site template, site template">

    <!-- List of icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="https://assets.glitchr.io/ico/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://assets.glitchr.io/ico/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://assets.glitchr.io/ico/favicon-16x16.png">
    <link rel="manifest" href="https://assets.glitchr.io/ico/site.webmanifest">
    <link rel="mask-icon" href="https://assets.glitchr.io/ico/safari-pinned-tab.svg" color="#5bbad5">
    <link rel="shortcut icon" href="https://assets.glitchr.io/ico/favicon.ico">
    <meta name="msapplication-TileColor" content="#603cba">
    <meta name="msapplication-config" content="https://assets.glitchr.io/ico/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">

    <!--
        Editorial by HTML5 UP
        html5up.net | @ajlkn
        Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
    -->
    <script src="https://assets.glitchr.io/fonts/FontAwesome/5.15.1/js/all.js"></script>
    <link rel="stylesheet" href="https://assets.glitchr.io/fonts/stylesheet.css">
    <link rel="stylesheet" href="css/stylesheet.css">
</head>

<body id="demo" class="dark big-mobile">
    <header id="demo-header">
        <div class="left">
            <h1><span>Responsive Test UI</span></h1>
            <ul class="selector" style="margin-right:1em">
                <li class="active"><i class="fas fa-adjust"></i></li>
                <li class="locked"><a id="copy" href="<?php echo $_SERVER['REQUEST_URI']; ?>" class="" onClick="copy_clipboard()"><i class='fas fa-copy'></i></a></li>
                <li><a id="pop-out" href="<?php echo $website; ?>" target="_blank">
                        <i class="fas fa-share"></i></a></li>
            </ul>

            <ul class="selector" style="margin-right:1em"> <!-- Computer -->
                <li data-name="desktop" data-width="1920" data-height="1080"><i class="fas fa-desktop"></i></li>
                <li data-name="laptop" data-width="1280" data-height="720"><i class="fas fa-laptop"></i></li>
            </ul>

            <ul class="selector" style="margin-right:1em"> <!-- iPad -->
                <li data-name="tablet" data-width="1024" data-height="768"><i class="fas fa-rotate-270 fa-tablet-alt"></i></li>
                <li data-name="mobile" data-width="896" data-height="358"><i class="fas fa-rotate-270 fa-mobile"></i></li>
            </ul>

            <ul class="selector" style="margin-right:1em"> <!-- iPhone 11 Pro Max -->
                <li data-name="tablet90" data-width="768" data-height="1024"><i class="fas fa-tablet-alt"></i></li>
                <li data-name="mobile90" data-width="414" data-height="716"><i class="fas fa-mobile"></i></li>
            </ul>
        </div>
        <div class="right">
            <form name="wform" onsubmit="return submitHandler()">

                <div class="actions">
                    <a id="back" class="button back alt2 on"
                        onClick="pop_back()"><i class="fas fa-backward"></i></a>
                </div>
                <div class="actions">
                    <a id="back" value="" class="button back alt2 on"
                        onClick="refresh()"><i class="fas fa-sync"></i></a>
                </div>
                <div class="actions">
                    <input type="text" name="website" placeholder="<?php echo $placeholder; ?>" value="<?php echo $_GET["q"]; ?>"/>
                </div>
                <div class="actions">
                   <a id="format" class="button back alt2 on"></a>
                </div>
                <div class="actions">
                    <input type="button" id="display" value="Afficher.." onClick="push_back()"
                        class="button alt on">
                </div>
            </form>
        </div> 
    </header>
    <div id="demo-iframe-wrapper">
        <iframe onload="frameload()" id="demo-iframe" sandbox="allow-top-navigation allow-scripts allow-forms allow-same-origin" allow="geolocation"
            src="<?php echo $website; ?>" width="100%">-</iframe>
    </div> 
    
    <script language="javascript">
		function updateFormat() { 
			document.getElementById("format").innerHTML = window.innerWidth+"x"+(window.innerHeight);
		}
		
		window.addEventListener('load', updateFormat, false);
		window.addEventListener('resize', updateFormat, false);
		window.addEventListener('orientationchange', updateFormat, false);
    </script>

    <script src="js/bundle.js"></script>
    <script src="js/responsive-test.js"></script>
</body>

</html>

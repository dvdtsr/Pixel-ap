<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->
<head>
       <meta charset="utf-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <title>Pixels project</title>
       <meta name="description" content="">
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <!-- build:css style.css -->
       <link rel="stylesheet" href="assets/styles/main.css">
       <!-- endbuild -->
       <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
</head>
<body>
       <?php
       include 'modules/controller/main.php';
       connect();
       ?>
       <div>
              <div id="menu">
                     <form action="javascript:void(0)" id="quantity-setting">
                            <input type="text" id="set-level" placeholder="max 20" autocomplete="off"><!--
                            --><button type="submit">Set</button>
                     </form>
                     <form action="javascript:void(0)" id="form-lvl">
                            <div id="tiles-pad"></div>
                     </form>
                     <form action="javascript:void(0)" id="color-settings">
                            <button name="reset-position" type="button">Reset</button><!--
                            --><input type="text" class="jscolor {closable:true,closeText:'X'}" value="#1a9dd4">
                     </form>
                     <form action="javascript:void(0)" id="save-cube">
                            <button name="save-cube" type="button">Save</button>
                     </form>
              </div>
              <div id="cubes-wrapper">
                     <div id="pixel-area">
                     </div>
              </div>
       </div>
       <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
       <script>
       window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')
       </script>
       <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
       <script>/*
       (function(b, o, i, l, e, r) {
       b.GoogleAnalyticsObject = l;
       b[l] || (b[l] =
       function() {
       (b[l].q = b[l].q || []).push(arguments)
       });
       b[l].l = +new Date;
       e = o.createElement(i);
       r = o.getElementsByTagName(i)[0];
       e.src = '//www.google-analytics.com/analytics.js';
       r.parentNode.insertBefore(e, r)
       }(window, document, 'script', 'ga'));
       ga('create', 'UA-XXXXX-X');
       ga('send', 'pageview');
       */
       </script>
       <script src="assets/scripts/jscolor.min.js"></script>
       <!-- build:js script.js -->
       <script src="assets/scripts/script.js"></script>
       <!-- endbuild -->
</body>
</html>

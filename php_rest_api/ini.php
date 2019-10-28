<?php

define('DS', DIRECTORY_SEPARATOR);
define('ROOT_API', dirname(__FILE__) . DS);
define('SRC_PATH', ROOT_API . 'src' . DS);
define("LIBRARY_PATH", SRC_PATH . 'library' . DS);
define("TEMPLATES_PATH", SRC_PATH . 'templates' . DS);
define("WIDGETS_PATH", SRC_PATH . 'widgets' . DS);

/*
    Error reporting.
*/
ini_set("error_reporting", "true");
error_reporting(E_ALL|E_STRCT);
?>

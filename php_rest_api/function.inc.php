<?php

function dd($arg){
   print "<pre>";
   print_r($arg);
   print "</pre>";
   die();
}

function dump($arg){
    var_dump($arg);
}
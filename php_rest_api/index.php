<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

include_once('ini.php');
include_once 'config.php';
include_once 'function.inc.php';

function autoload_class($class_name)
{
    static $files = [];
    $directories = array(
        SRC_PATH . 'interfaces' . DS,
        SRC_PATH . 'classes' . DS,
        SRC_PATH . 'controllers' . DS,
        SRC_PATH . 'models' . DS
    );
    foreach ($directories as $directory) {
        $filename = $directory . $class_name . '.php';
        if (file_exists($filename)) {
            if (is_file($filename) && is_readable($filename) && !isset($files[$filename])) {
                include_once($filename);
                $files[$filename] = $filename;
                break;
            }
        }
    }
}

/**
 * Register autoloader functions.
 */
spl_autoload_register('autoload_class');

function isPrimaryKey($key = '')
{
    if (strlen($key) === 24) {
    return preg_match('/^[a-f0-9]{24}$/', $key);
    }

    return preg_match('/^[a-f0-9]{32}$/', $key);
}

function isValidMd5($md5 ='') {
  return strlen($md5) == 32 && ctype_xdigit($md5);
}
$request = new Request();

if (isset($_SERVER['PATH_INFO'])) {
    $request->url_elements = explode('/', trim($_SERVER['PATH_INFO'], '/'));
}
$request->method = strtoupper($_SERVER['REQUEST_METHOD']);

switch ($request->method) {
    case 'GET':
        $request->parameters = $_GET;
        break;
    case 'POST':
        if (isset($_SERVER['CONTENT_TYPE']) && stripos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
            $request->parameters = json_decode(file_get_contents('php://input'), true);
        } else {
            $request->parameters = $_POST;
        }
        break;
    case 'PUT':
        $request->parameters = json_decode(file_get_contents('php://input'), true);
        break;
    case 'DELETE':
        $request->parameters = json_decode(file_get_contents('php://input'), true);
        break;
}

try {
    if (!empty($request->url_elements)) {
        $controller_name = ucfirst($request->url_elements[0]) . 'Controller';

        if (class_exists($controller_name)) {
            $controller = new $controller_name();
            
            if (isset($request->url_elements[1]) && !isPrimaryKey($request->url_elements[1]) && method_exists($controller, $request->url_elements[1])) {
                $action_name = strtolower($request->url_elements[1]);
            } else {
                if (strtolower($request->method) == 'get' && !isset($request->url_elements[1])) {
                $action_name = strtolower('all');
                } else if (strtolower($request->method) == 'post' && isPrimaryKey($request->url_elements[1]) && isset($request->url_elements[1])) {
                    $action_name = strtolower('put');
                } else {
                    if (isset($request->url_elements[2]) && !isPrimaryKey($request->url_elements[2])) {
                        $action_name = strtolower($request->url_elements[2]);
                    
                    } else {
                        $action_name = strtolower($request->method);
                    }   
                }
            }

            $response_str = call_user_func_array(array($controller, $action_name), array($request));
        } else {
            header('HTTP/1.1 404 Not Found');
            $response_str = 'Unknown request: ' . $request->url_elements[0];
        }
    } else {
        $response_str = 'Unknown request';
    }

    $response_obj = Response::create($response_str, $_SERVER['HTTP_ACCEPT']);
    echo $response_obj->render();
} catch (Exception $e) {
    print $e->getMessage();
}


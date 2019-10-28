<?php

abstract class AbstractController {

    public $db;
    protected $model;
    protected $token;

    public function __construct($model = null)
    {
        // print "Parent conntoler"; 
        $this->db = new MySQL(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
        if ($model) {
            $this->model = $model;
        }
        $this->api_auth();
    }

    private function api_auth()
    {
        $urlElements = explode('/', trim($_SERVER['PATH_INFO'], '/'));
        
        if (strpos('sso', $urlElements[0]) === false) {
            $this->token = $this->getBearerToken();

            if ($this->token === null) {
                header('Content-Type: application/json');
                print json_encode($this->error('invalid_token', 'Token is requared'));
                exit();
            } 
            $tokenModel = new TokenModel();
            $result = $tokenModel->findOne(array('token' => $this->token));
            
            if (!count($result)) {
                header('Content-Type: application/json');
                print json_encode($this->error('invalid_token', 'Token can not be found.'));
                exit();
            }
            
            $currentTime = strtotime('now');
            $expireTime = strtotime($result['expireAt']);
            
            if ($expireTime < $currentTime) {
                header('Content-Type: application/json');
                http_response_code(403);
                
                print json_encode(array('status' => 'failed', 'message' => 'An authentication exception occurred.', 'data' => array()));
                exit();
            }
        }
        /*
          if (isset($_SERVER['HTTP_X_API_AUTH_KEY'])) {
          $API_KEY = trim($_SERVER['HTTP_X_API_AUTH_KEY']);
          $sql = "SELECT * FROM `".DB_PREFIX."api_customer` WHERE `api_key` = '".$this->db->escape($API_KEY)."' LIMIT 1";
          $query = $this->db->query($sql);
          if(isset($query->row['api_key'])) {
          $salt = $query->row['salt'];
          $signature = base64_decode($query->row['signature']);
          $re_signature = hash_hmac('sha256', $salt, $API_KEY, true);
          if (!$this->hash_compare($signature, $re_signature)) {
          exit('No direct script access allowed (signature not match).');
          }
          } else {
          exit('No direct script access allowed.');
          }
          } else {
          exit('No direct script access allowed.');
          }
         */
        //$sql = "";
        // $this->db->query($sql);  
    }

    private function hash_compare($a, $b)
    {
        if (!is_string($a) || !is_string($b)) {
            return false;
        }

        $len = strlen($a);
        if ($len !== strlen($b)) {
            return false;
        }

        $status = 0;
        for ($i = 0; $i < $len; $i++) {
            $status |= ord($a[$i]) ^ ord($b[$i]);
        }
        return $status === 0;
    }

    public function isGetRequest()
    {
        return $_SERVER['REQUEST_METHOD'] === 'GET';
    }

    public function isPOSTRequest()
    {
        return $_SERVER['REQUEST_METHOD'] === 'POST';
    }

    public function isPutRequest()
    {
        return $_SERVER['REQUEST_METHOD'] === 'PUT';
    }

    public function isDeleteRequest()
    {
        return $_SERVER['REQUEST_METHOD'] === 'DELETE';
    }

    public function error($code, $message, $responseCode = 400)
    {
        http_response_code($responseCode);

        return array(
            'code' => $code,
            'message' => $message
        );
    }

    public function reponseInvalidRequest()
    {
        return $this->error('invalid_request', 'Invalid request!');
    }

    public function all($request)
    {
        if (!$this->isGetRequest()) {
            return $this->reponseInvalidRequest();
        }

        return array(
            'status' => 'success',
            'message' => 'Items was retrieved successfully.',
            'data' => $this->model->find()
        );
    }

    public function get($request)
    {
        if (!$this->isGetRequest()) {
            return $this->reponseInvalidRequest();
        }

        try {
            $id = $request->url_elements[1];
            $model = $this->model->findById($id);

            if ($model !== null) {

                if (isset($model['password'])) {
                    $model['password'] = '';
                }
                if (isset($model['isActive'])) {
                    $model['isActive'] = ($model['isActive'] == '1' ? true : false);
                }
                return array(
                    'status' => 'success',
                    'message' => 'Item was retrieved successfully.',
                    'data' => $model
                );
            } else {
                return $this->error('error', 'Record is not Found.', 404);
            }
        } catch (Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    public function post($request)
    {
        if (!$this->isPOSTRequest()) {
            return $this->reponseInvalidRequest();
        }

        try {
            $model = $this->model->insert($request->parameters);

            if ($model !== null) {

                return array(
                    'status' => 'success',
                    'message' => 'Item was retrieved successfully.',
                    'data' => $model
                );
            } else {
                return $this->error('error', 'Record can not be saved.');
            }
        } catch (Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    public function put($request)
    {
        if (!$this->isPOSTRequest()) {
            return $this->reponseInvalidRequest();
        }

        try {
            $id = $request->url_elements[1];

            if (isset($request->parameters['_id'])) {
                unset($request->parameters['_id']);
            }
            $model = $this->model->update($id, $request->parameters);

            if ($model !== null) {

                return array(
                    'status' => 'success',
                    'message' => 'Items was retrieved successfully.',
                    'data' => $model
                );
            } else {
                return $this->error('error', 'Record can not be saved.');
            }
        } catch (Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    public function delete($request)
    {
        if (!$this->isPutRequest()) {
            return $this->reponseInvalidRequest();
        }

        try {
            $id = $request->url_elements[1];

            $this->model->delete($id);

            if ($model !== null) {

                return array(
                    'status' => 'success',
                    'message' => 'Items was deleted successfully.',
                    'data' => array()
                );
            } else {
                return $this->error('error', 'Record can not be found.');
            }
        } catch (Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Get header Authorization
     * */
    private function getAuthorizationHeader()
    {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            //print_r($requestHeaders);
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        return $headers;
    }

    /**
     * get access token from header
     * */
    private function getBearerToken()
    {
        $headers = $this->getAuthorizationHeader();
        // HEADER: Get the access token from the header
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }

}

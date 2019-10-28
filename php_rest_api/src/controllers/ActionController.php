<?php

class ActionController extends AbstractController {

    private $controlModel;
    private $deviceModel;
    private $historyModel;
    private $tokenModel;

    public function __construct()
    {
        parent::__construct();

        $this->controlModel = new ControlModel();
        $this->deviceModel = new DeviceModel();
        $this->historyModel = new HistoryModel();
        $this->tokenModel = new TokenModel();
    }

    public function on($request)
    {
        if (!$this->isPOSTRequest()) {
            return $this->reponseInvalidRequest();
        }

        try {
            $controlId = $request->parameters['control'];
            $mobileId = isset($request->parameters['mobile']) ? $request->parameters['mobile'] : null ;

            $control = $this->controlModel->findById($controlId);

            if ($control !== null) {
                $device = $this->deviceModel->findById($control['device']);

                $response = $this->makeCall('http://' . $device['ip'] . ':' . $device['port'] . '/' . $control['commandOn']);
                
                if ($response['code'] == '200') {
                    $this->controlModel->update($control['_id'], array('state' => 'on'));
                    $token = $this->tokenModel->findOne(array('token' => $this->token));

                    $this->historyModel->insert(array(
                        'account' => $token['account'],
                        'device' => $device['_id'],
                        'mobileDevice' => $mobileId,
                        'command' => $control['commandOn']
                    ));
                    return array(
                        'status' => 'success',
                        'message' => 'The control was activated successfully.',
                        'data' => json_encode($response)
                    );
                    
                } else {
                    return $this->error('invalid_response', 'Response code is ' . $response['code'] . '.');
                }
            } else {
                return $this->error('error', 'Record can not be found.');
            }
        } catch (Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    public function off($request)
    {
        if (!$this->isPOSTRequest()) {
            return $this->reponseInvalidRequest();
        }
        try {
            $controlId = $request->parameters['control'];
            $mobileId = isset($request->parameters['mobile']) ? $request->parameters['mobile'] : null ;

            $control = $this->controlModel->findById($controlId);

            if ($control !== null) {
                $device = $this->deviceModel->findById($control['device']);
                $response = $this->makeCall('http://' . $device['ip'] . ':' . $device['port'] . '/' . $control['commandOff']);
                
                if ($response['code'] == '200') {
                    $this->controlModel->update($control['_id'], array('state' => 'off'));
                    $token = $this->tokenModel->findOne(array('token' => $this->token));

                    $this->historyModel->insert(array(
                        'account' => $token['account'],
                        'device' => $device['_id'],
                        'mobileDevice' => $mobileId,
                        'command' => $control['commandOff']
                    ));
                    return array(
                        'status' => 'success',
                        'message' => 'The control was deacticated successfully.',
                        'data' => json_encode($response)
                    );
                    
                } else {
                    return $this->error('invalid_response', 'Response code is ' . $response['code'] . '.');
                }
            } else {
                return $this->error('error', 'Record can not be found.');
            }
        } catch (Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    private function makeCall($url)
    {
        $curl = curl_init();
        // Set some options - we are passing in a useragent too here
        curl_setopt_array($curl, [
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url
        ]);
        // Send the request & save response to $resp
        $response = curl_exec($curl);
        $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        // Close request to clear up some resources
        curl_close($curl);
        
        return array(
            'response' => $response,
            'code' => $httpcode
        );
    }

}

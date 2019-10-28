<?php

class AccountController extends AbstractController {

    private $historyModel;
    private $deviceModel;
    private $controlModel;

    public function __construct()
    {
        parent::__construct(new AccountModel());
        
        $this->historyModel = new HistoryModel();
        $this->deviceModel = new DeviceModel();
        $this->controlModel = new ControlModel();
    }
    
    public function history($request)
    {
        if (!$this->isGetRequest()) {
            return $this->reponseInvalidRequest();
        }
        
        try {
            $accountId = $request->url_elements[1];
            $models = $this->historyModel->findHistoryByAccountId($accountId);

            return array(
                'status' => 'success',
                'message' => 'Items was retrieved successfully.',
                'data' => $models
            );
        } catch (Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }                
    }
    
    public function device($request)
    {
        if (!$this->isGetRequest()) {
            return $this->reponseInvalidRequest();
        }
        try {
            $accountId = $request->url_elements[1];
            $models = $this->deviceModel->findDevicesByAccountId($accountId);

            return array(
                'status' => 'success',
                'message' => 'Items was retrieved successfully.',
                'data' => $models
            );
        } catch (Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }                
    }

    public function control($request)
    {
        if (!$this->isGetRequest()) {
            return $this->reponseInvalidRequest();
        }
        try {
            $accountId = $request->url_elements[1];
            $models = $this->controlModel->findControlsByAccountId($accountId);

            return array(
                'status' => 'success',
                'message' => 'Items was retrieved successfully.',
                'data' => $models
            );
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
            $request->parameters['password'] = md5($request->parameters['password']);
            $model = $this->model->insert($request->parameters);

            if ($model !== null) {
                
                if (isset($model['password'])) {
                    $model['password'] = '';
                }
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
            $request->parameters['password'] = md5($request->parameters['password']);
            $model = $this->model->update($id, $request->parameters);

            if ($model !== null) {

                if (isset($model['password'])) {
                    $model['password'] = '';
                }

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
}

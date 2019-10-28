<?php

class DeviceController extends AbstractController {

    private $controlModel;

    public function __construct()
    {
        parent::__construct(new DeviceModel());
        
        $this->controlModel = new ControlModel();
    }
    
    public function control($request)
    {
        if (!$this->isGetRequest()) {
            return $this->reponseInvalidRequest();
        }
        try {
            $deviceId = $request->url_elements[1];
            $models = $this->controlModel->findDevicesById($deviceId);

            return array(
                'status' => 'success',
                'message' => 'Items was retrieved successfully.',
                'data' => $models
            );
        } catch (Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }        
    }
}

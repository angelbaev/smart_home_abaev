<?php

class MobileController extends AbstractController {

    public function __construct()
    {
        parent::__construct(new MobileDeviceModel());
    }
    
    public function uuid($request)
    {
        if (!$this->isGetRequest()) {
            return $this->reponseInvalidRequest();
        }
        try {
            $uuid = $request->url_elements[2];
            $model = $this->model->findOne(array('uuid' => $uuid));

            if ($model !== null) {

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
}

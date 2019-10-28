<?php

class SsoController extends AbstractController {

    private $accountModel;
    private $tokenModel;

    public function __construct()
    {
        parent::__construct();

        $this->accountModel = new AccountModel();
        $this->tokenModel = new TokenModel();
    }

    public function authenticate($request)
    {
        if (!$this->isPOSTRequest()) {
            return $this->reponseInvalidRequest();
        }

        try {
            $account = $this->accountModel->findOne(
                    array(
                        'username' => $request->parameters['username'],
                        'password' => md5($request->parameters['password']),
                    )
            );
            $account['password'] = '';
            $account['isActive'] = ($account['isActive'] == '1' ? true : false);

            if ($account !== null) {
                $token = $this->tokenModel->insert([
                    'account' => $account['_id'],
                    'token' => md5($account['_id'] . time()),
                    'expireAt' => date('Y-m-d H:i:s', strtotime('60 minute'))
                ]);

                $token['account'] = $account;

                return array(
                    'status' => 'success',
                    'message' => 'Account was successfully authenticated.',
                    'data' => $token
                );
            } else {
                return $this->error('invalid_password', 'Password not match!');
            }
        } catch (Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    public function verify($request)
    {
        if (!$this->isPOSTRequest()) {
            return $this->reponseInvalidRequest();
        }

        try {
            $token = $this->tokenModel->findOne(
                    array(
                        'token' => $request->parameters['token']
                    )
            );

            if ($token !== null) {
                $currentTime = strtotime('now');
                $expireTime = strtotime($token['expireAt']);
                $isVerify = true;
                if ($currentTime > $expireTime) {
                    $isVerify = false;
                }

                return array(
                    'status' => 'success',
                    'message' => 'Token was successfully verified.',
                    'data' => array(
                        'token' => $token['token'],
                        'expireAt' => $token['expireAt'],
                        'createdAt' => $token['createdAt'],
                        'verify' => $isVerify
                    )
                );
            } else {
                return $this->error('invalid_token', 'Token is not Found.');
            }
        } catch (Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    public function expire($request)
    {
        if (!$this->isPOSTRequest()) {
            return $this->reponseInvalidRequest();
        }

        try {
            $token = $this->tokenModel->findOne(
                    array(
                        'token' => $request->parameters['token']
                    )
            );

            if ($token !== null) {
                $token['expireAt'] = date('Y-m-d H:i:s', strtotime('-60 minute'));
                $this->tokenModel->update(
                    $token['_id'], 
                    array('expireAt' => $token['expireAt'])
                );

                return array(
                    'status' => 'success',
                    'message' => 'Token was successfully expired.',
                    'data' => $token
                );
            } else {
                return $this->error('invalid_token', 'Token is not Found.');
            }
        } catch (Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }
}

<?php

class ControlController extends AbstractController {

    public function __construct()
    {
        parent::__construct(new ControlModel());
    }
}

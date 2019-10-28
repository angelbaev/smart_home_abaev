<?php

class HistoryController extends AbstractController {

    public function __construct()
    {
        parent::__construct(new HistoryModel());
    }
}

<?php

class Response {

    /**
     * Constructor.
     *
     * @param string $data
     * @param string $format
     */
    public static function create($data, $format)
    {
        switch ($format) {
            case 'xls':
            case 'application/vnd.ms-excel':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                $obj = new ResponseXLS($data);
                break;
            case 'csv':
            case 'application/csv':
            case 'text/csv':
                $obj = new ResponseCSV($data);
                break;
            case 'xml':
            case 'application/xml':
            case 'text/xml':
                $obj = new ResponseXML($data);
                break;
            case 'json':
            case 'application/json':
            default:
                $obj = new ResponseJson($data);
                break;
        }
        return $obj;
    }

}

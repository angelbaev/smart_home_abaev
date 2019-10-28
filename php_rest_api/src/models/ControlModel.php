<?php
class ControlModel extends AbstractModel
{
    public function getTable()
    {
        return 'controls';
    }
    
    public function findDevicesById($deviceId)
    {
        $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . $this-> getTable() . "` WHERE `device`='". (string) $deviceId ."' ORDER BY `name` DESC");

        foreach ($query->rows as $key => $row) {
            $subQuery = $this->db->query("SELECT * FROM `" . DB_PREFIX . "devices" . "` WHERE `_id`='". (string) $row['device'] ."'");
            $query->rows[$key]['device'] = $subQuery->row;
        }
        
        return $query->rows;
    }
    
    public function findControlsByAccountId($accountId)
    {
        $query = $this->db->query("SELECT `_id` FROM `" . DB_PREFIX . "devices` WHERE `account`='". (string) $accountId ."'");
        $devices = array();  
        $controls = array();
        foreach ($query->rows as $key => $row) {
            $devices[] = $row['_id'];
        }
        
        if (count($devices)) {
            $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . $this-> getTable() . "` WHERE `device` IN ('" . implode("', '", $devices). "') ORDER BY `name` DESC");
            
            foreach ($query->rows as $key => $row) {
                $subQuery = $this->db->query("SELECT * FROM `" . DB_PREFIX . "devices" . "` WHERE `_id`='". (string) $row['device'] ."'");
                $query->rows[$key]['device'] = $subQuery->row;
            }
            
            $controls = $query->rows;
        }
        
        return $controls;
    }        
}

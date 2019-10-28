<?php
class DeviceModel extends AbstractModel
{
    public function getTable()
    {
        return 'devices';
    }
    
    public function find($params = array())
    {
        $conditions = array();
        foreach ($params as $field => $value) {
           $conditions[] = "`{$field}`='" . $this->db->escape($value). "'"; 
        }
        
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . $this-> getTable() . (count($conditions) ? " WHERE " . implode(' and ', $conditions) : "") . " ORDER BY `name` ASC");

        return $query->rows;
    }  
    
    public function findDevicesByAccountId($accountId)
    {
        $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . $this-> getTable() . "` WHERE `account`='". (string) $accountId ."' ORDER BY `name` DESC");

        foreach ($query->rows as $key => $row) {
            $subQuery = $this->db->query("SELECT * FROM `" . DB_PREFIX . "accounts" . "` WHERE `_id`='". (string) $row['account'] ."'");
            $query->rows[$key]['account'] = $subQuery->row;
        }
        
        return $query->rows;
    }    
}

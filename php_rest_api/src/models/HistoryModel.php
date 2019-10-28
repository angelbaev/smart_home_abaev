<?php
class HistoryModel extends AbstractModel
{
    public function getTable()
    {
        return 'histories';
    }
    
    public function find($params = array())
    {
        $conditions = array();
        foreach ($params as $field => $value) {
           $conditions[] = "`{$field}`='" . $this->db->escape($value). "'"; 
        }
        
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . $this-> getTable() . (count($conditions) ? " WHERE " . implode(' and ', $conditions) : "") . " ORDER BY `createdAt` DESC LIMIT 10");

        return $query->rows;
    } 
    
    public function findHistoryByAccountId($accountId)
    {
        $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . $this-> getTable() . "` WHERE `account`='". (string) $accountId ."' ORDER BY `createdAt` DESC");

        foreach ($query->rows as $key => $row) {
            $subQuery = $this->db->query("SELECT * FROM `" . DB_PREFIX . "devices" . "` WHERE `_id`='". (string) $row['device'] ."'");
            $query->rows[$key]['device'] = $subQuery->row;
            
            $subQuery = $this->db->query("SELECT * FROM `" . DB_PREFIX . "accounts" . "` WHERE `_id`='". (string) $row['account'] ."'");
            $query->rows[$key]['account'] = $subQuery->row;

            if (!empty($row['mobileDevice'])) {
                $subQuery = $this->db->query("SELECT * FROM `" . DB_PREFIX . "mobiledevices" . "` WHERE `_id`='". (string) $row['mobileDevice'] ."'");
                $query->rows[$key]['mobileDevice'] = $subQuery->row;
            }
        }
        
        return $query->rows;
    }    
}

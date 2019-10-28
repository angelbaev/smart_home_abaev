<?php

abstract class AbstractModel {

    public $db;

    public function __construct()
    {
        $this->db = new MySQL(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
    }

    abstract public function getTable();

    public function findById($id)
    {
        $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . $this-> getTable() . "` WHERE _id = '" . (string) $id . "'");

        return $query->row;
    }

    public function findOne($params)
    {
        $conditions = array();
        foreach ($params as $field => $value) {
           $conditions[] = "`{$field}`='" . $this->db->escape($value). "'"; 
        }
        
        $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . $this-> getTable() . "` WHERE " . implode(' and ', $conditions));

        return $query->row;
    }

    public function find($params = array())
    {
        $conditions = array();
        foreach ($params as $field => $value) {
           $conditions[] = "`{$field}`='" . $this->db->escape($value). "'"; 
        }
        
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . $this-> getTable() . (count($conditions) ? " WHERE " . implode(' and ', $conditions) : ""));

        return $query->rows;
    }
    
    public function insert($data)
    {
        $_id = md5(uniqid());
        $fields = array("`_id`='" . $this->db->escape($_id). "'");
        foreach ($data as $field => $value) {
           $fields[] = "`{$field}`='" . $this->db->escape($value). "'"; 
        }
        
        $this->db->query("INSERT INTO `" . DB_PREFIX . $this-> getTable() . "` SET " . implode(',', $fields));

        return $this->findById($_id);
    }
    
    public function update($id, $data)
    {
        foreach ($data as $field => $value) {
           $fields[] = "`{$field}`='" . $this->db->escape($value). "'"; 
        }
        $this->db->query("UPDATE `" . DB_PREFIX . $this-> getTable() . "` SET " . implode(',', $fields) . " WHERE _id = '" . (string) $id . "'");
        
        return $this->findById($id);
    }
    
    public function delete($id)
    {
        $this->db->query("DELETE FROM `" . DB_PREFIX . $this-> getTable() . "` WHERE _id = '" . (string) $id . "'");
    }
}

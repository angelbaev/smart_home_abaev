<?php

final class MySQL {

    private $link;

    public function __construct($hostname, $username, $password, $database)
    {
        if (!$this->link = mysqli_connect($hostname, $username, $password, $database)) {
            trigger_error('Error: Could not make a database link using ' . $username . '@' . $hostname);
        }

        mysqli_query($this->link, "SET NAMES 'utf8'");
        mysqli_query($this->link, "SET CHARACTER SET utf8");
        mysqli_query($this->link, "SET CHARACTER_SET_CONNECTION=utf8");
        mysqli_query($this->link, "SET SQL_MODE = ''");
    }

    public function query($sql)
    {
        $resource = mysqli_query($this->link, $sql);

        if ($resource) {
            $i = 0;

            $data = array();

            while ($result = mysqli_fetch_assoc($resource)) {
                $data[$i] = $result;

                $i++;
            }

            mysqli_free_result($resource);

            $query = new stdClass();
            $query->row = isset($data[0]) ? $data[0] : array();
            $query->rows = $data;
            $query->num_rows = $i;

            unset($data);

            return $query;
        } else {
            print('Error: ' . mysqli_error($this->link) . '<br />Error No: ' . mysqli_errno($this->link) . '<br />' . $sql);
            trigger_error('Error: ' . mysqli_error($this->link) . '<br />Error No: ' . mysqli_errno($this->link) . '<br />' . $sql);
            exit();
        }
    }

    public function escape($value)
    {
        return mysqli_real_escape_string($this->link, $value);
    }

    public function countAffected()
    {
        return mysqli_affected_rows($this->link);
    }

    public function getLastId()
    {
        return mysqli_insert_id($this->link);
    }

    public function __destruct()
    {
        if (is_resource($this->link)) {
            mysqli_close($this->link);
        }
        //	mysql_close($this->link);
    }

    /**
     * MYSQLI_TRANS_START_READ_ONLY: Start the transaction as "START TRANSACTION READ ONLY". Requires MySQL 5.6 and above.
     * MYSQLI_TRANS_START_READ_WRITE: Start the transaction as "START TRANSACTION READ WRITE". Requires MySQL 5.6 and above.
     * MYSQLI_TRANS_START_WITH_CONSISTENT_SNAPSHOT: Start the transaction as "START TRANSACTION WITH CONSISTENT SNAPSHOT".
     * 
     * @param type $flag
     */
    public function begin($flag = MYSQLI_TRANS_START_READ_ONLY)
    {
        mysqli_begin_transaction($this->link, $flag);
    }

    /**
     *  Commits the current transaction
     */
    public function commit()
    {
        mysqli_commit($this->link);
    }

    /**
     * Rolls back current transaction
     */
    public function rollback()
    {
        mysqli_rollback($this->link);
    }

}

?>

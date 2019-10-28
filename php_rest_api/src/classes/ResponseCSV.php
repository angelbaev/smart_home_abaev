<?php
class ResponseCSV
{
    /**
     * Response data.
     *
     * @var string
     */
    protected $data;
    
    /**
     * Constructor.
     *
     * @param string $data
     */
    public function __construct($data)
    {
        $this->data = $data;
        return $this;
    }
    
    /**
     * Render the response as JSON.
     * 
     * @return string
     */
    public function render()
    {
        header('Content-Type: text/csv');
        return ArrayToCSV::array_to_csv($this->data);
    }
}

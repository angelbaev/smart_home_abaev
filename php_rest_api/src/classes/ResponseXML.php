<?php
class ResponseXML
{
    /**
     * Response data.
     *
     * @var string
     */
    protected $data;

    private static $root_tag = 'root';
    private static $node_name = 'node';
    
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
    
    public static function setRootTag($name) {
	   self::$root_tag = $name;
	 }
	 
    public static function getRootTag() {
	   return self::$root_tag;
	 }

    public static function setNodeName($name) {
	   self::$node_name = $name;
	 }
	 
    public static function getNodeName() {
	   return self::$node_name;
	 }
   /**
     * Render the response as JSON.
     * 
     * @return string
     */
    public function render()
    {
	 	 header('Content-Type: application/xml');
	 	 try 
		{
			$xml = new ArrayToXML(self::$root_tag, self::$node_name);
			$xml->createNode( $this->data );
			return $xml;
      } 
      catch (Exception $e)
      {
		 	echo $e->getMessage();
		}
    }
}

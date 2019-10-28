<?php
class ArrayToCSV
{
	public static function array_to_csv($array) {
        $outputBuffer = fopen("php://output", 'w');
        foreach($array as $val) {
            fputcsv($outputBuffer, $val);
        }
        fclose($outputBuffer);
	}

}

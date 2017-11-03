<?php
function formulaires_chat_charger_dist() {
	$valeurs = array('question'=>'');
	return $valeurs;

}
function formulaires_chat_verifier_dist() {
}
function formulaires_chat_traiter_dist() {
	$q = _request('question');
	$chatbot = curl_init();
	$headr = array();
	$headr[] = "Authorization: Bearer HLHDZURUOOM3ONQ6HLH2ULI3K7HXTJVB";
	curl_setopt($chatbot, CURLOPT_URL,"https://api.wit.ai/message?v=20170118&q=".$q);
	curl_setopt($chatbot, CURLOPT_HTTPHEADER,$headr);
	curl_setopt($chatbot, CURLOPT_RETURNTRANSFER, true);
	$server_output = curl_exec($chatbot);
	curl_close ($chatbot);
	echo($server_output);
	$table = json_decode($server_output);
	return array('message_ok' => $server_output);
}

?>
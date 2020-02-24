<?php
/**
 * Fonction de remplacement par défaut pour les termes trouvés dans les textes
 *
 * @param string $mot
 *     Le mot trouvé
 * @param string $definition
 *     La définition correspondante
 * @return string
 *     Code HTML de remplacement de la définition
 */
function dictionnaires_remplacer_defaut($mot, $definition) {
	$class="";
	if ((!isset($definition['url']) OR !$url = $definition['url']) && (!isset($definition['url_externe']) OR !$url = $definition['url_externe'])) {
		$url = generer_url_entite($definition['id_definition'],'definition');
	}else{
		if(strpos($url,'http') == 0)
			$class="spip_out";
	}
	$class = (strlen($class) > 0) ? " class='$class' " : "";
	return $mot
		.'<sup><a href="'.$url.'"'.$class.'title="'._T('definition:titre_definition').': '
			. couper(trim(attribut_html(supprimer_tags(typo(expanser_liens($definition['texte']))))),500).'">'
		.'?'
		.'</a></sup>';

/*	return '<abbr title="'.couper(trim(attribut_html(supprimer_tags(typo($definition['texte'])))),80).'">'.$mot.'</abbr>'; */
		
}

/*
 * Fonction de remplacement par défaut pour les abbréviations trouvées dans les textes
 * Ceci est un EXEMPLE montrant qu'on peut mettre un truc différent pour un type de définition précis
 * Mais ce code est une MAUVAISE PRATIQUE en accessibilité
 * (car seuls les gens avec des yeux valides et un pointeur de souris ont accès à l'information)
 */
function dictionnaires_remplacer_abbr($mot, $definition){
	return '<abbr title="'.couper(trim(attribut_html(supprimer_tags(typo($definition['texte'])))),500).'">'.$mot.'</abbr>';
}
/* balise d'enregistrement des statistiques du formulaire formidable contactmdph du modele contactmdph
*/
function balise_STATS_CONTACT($p){
	$var1 = interprete_argument_balise(1,$p);
	$var2 = interprete_argument_balise(2,$p);
	$var3 = interprete_argument_balise(3,$p);
	$var4 = interprete_argument_balise(4,$p);
    $p->code = "calculer_balise_STATS_CONTACT($var1,$var2,$var3,$var4)";
	$p->interdire_scripts = false;
	return $p;
}

function calculer_balise_STATS_CONTACT($commune,$age,$question,$mail) {
	if ($mail) {
		include_spip('inc/saisies');
		$formulaire = sql_fetsel("saisies","spip_formulaires","identifiant='contactmdph'");
		$saisies = unserialize($formulaire['saisies']);
		$reponse = array();
		$communet = "";
		$aget = "";
		$questiont = "";
		foreach ($saisies as $k => $saisie) {
			$datas = $saisie['options']['datas'];
			$nom = $saisie['options']['nom'];
			if ($datas) {
				$data = saisies_chaine2tableau($datas);
				if ($nom=='selection_1') $communet = $data[$commune];
				if ($nom=='radio_1') $aget = $data[$age];
				if ($nom=='radio_2') $questiont = $data[$question];
			}
		}
		$reponse .= "reponse : ".$commune." (".$communet.")"."|".$age." (".$aget.")"."|".$question." (".$questiont.")"."<br/>";
		$r = sql_fetsel("nom,email","spip_auteurs","id_auteur=$mail");
		sql_insertq('stats_contact', array(
			'commune' => $commune,
			'age' => $age,
			'question' => $question,
			'mail' => $mail,
			'communet' => $communet,
			'aget' => $aget,
			'questiont' => $questiont,
			'mailt' => $r['email'])
		);
		return ""; 
	}
}
?>
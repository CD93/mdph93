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
			. couper(trim(attribut_html(supprimer_tags(typo(expanser_liens($definition['texte']))))),80).'">'
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
	return '<abbr title="'.couper(trim(attribut_html(supprimer_tags(typo($definition['texte'])))),80).'">'.$mot.'</abbr>';
}
?>
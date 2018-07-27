<?php

/***************************************************************************\
 *  SPIP, Systeme de publication pour l'internet                           *
 *                                                                         *
 *  Copyright (c) 2001-2016                                                *
 *  Arnaud Martin, Antoine Pitrou, Philippe Riviere, Emmanuel Saint-James  *
 *                                                                         *
 *  Ce programme est un logiciel libre distribue sous licence GNU/GPL.     *
 *  Pour plus de details voir le fichier COPYING.txt ou l'aide en ligne.   *
\***************************************************************************/


if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}

include_spip('inc/cvtupload');

function formulaires_contacter_charger_dist() {
	include_spip('inc/texte');
	$puce = definir_puce();
	$valeurs = array(
		'nom_message_auteur' => '',
		'prenom_message_auteur' => '',
		'choixcommune' => array(),
		'texte_message_auteur' => '',
		'age' => array(),
		'email_message_auteur' => '',
		'nobot' => '',
		'plusieurs' => array()
	);
	return $valeurs;
}

function formulaires_contacter_verifier_dist() {
	$erreurs = array();
	include_spip('inc/filtres');

	if (!$nom = _request('nom_message_auteur')) {
		$erreurs['nom_message_auteur'] = _T('info_obligatoire');
	}
	if (!$prenom = _request('prenom_message_auteur')) {
			$erreurs['prenom_message_auteur'] = _T('info_obligatoire');
	}
	if (!$age = _request('age')) {
					$erreurs['age_message_auteur'] = _T('info_obligatoire');
	}
	if (!$commune = _request('choixcommune') || _request('choixcommune')==0) {
					$erreurs['ville_message_auteur'] = _T('info_obligatoire');
	}
	if (!$adres = _request('email_message_auteur')) {
		$erreurs['email_message_auteur'] = _T('info_obligatoire');
	} elseif (!email_valide($adres)) {
		$erreurs['email_message_auteur'] = _T('form_prop_indiquer_email');
	}

	if (!$texte = _request('texte_message_auteur')) {
		$erreurs['texte_message_auteur'] = _T('info_obligatoire');
	} elseif (!(strlen($texte) > 10)) {
		$erreurs['texte_message_auteur'] = _T('forum:forum_attention_dix_caracteres');
	}

	if (_request('nobot')) {
		$erreurs['message_erreur'] = _T('pass_rien_a_faire_ici');
	}

	// options pour vérifier les images
	// si les options ne sont pas renseignées, la vérification se base sur
	// _IMG_MAX_SIZE, _IMG_MAX_WIDTH, _IMG_MAX_HEIGHT
	$verifier = charger_fonction('verifier', 'inc', true);
	$options = array(
		'taille_max' => 250, // en kio
		'largeur_max' => 800, // en px
		'hauteur_max' => 600, // en px
	);

	return $erreurs;
}

function formulaires_contacter_traiter_dist() {
	//$fichiers = _request('_fichiers');
	//var_dump($_FILES);
	//var_dump($fichiers);


	$mail="placehandicap@seinesaintdenis.fr";

	$sect1 = array (1,3,4,9,10,14,16,17,19,13,23,27,28,29,30,31,32,33,35,40);
	$sect2 = array (2,5,6,7,8,7,11,12,15,18,20,21,22,24,25,26,34,36,37,38,39);
	$sect3 = array (1,8,9,10,14,15,16,13,29,32,33,35,40);
	$sect4 = array (2,3,4,17,19,23,27,28,30,31,34);
	$sect5 = array (5,6,7,11,18,20,21,22,24,25,26,36,37,38,39);
	$sect6 = array (1,9,10,14,16,13,29,32,33,35,40);
	$sect7 = array (3,4,17,19,23,27,28,30,31);
	$sect8 = array (2,8,15,34,36,39);
	$sect9 = array (5,6,7,11,12,18,20,21,22,24,25,26,37,38);

	$adres = _request('email_message_auteur');
	$sujet = _request('sujet');
	$age = _request('age');
	$choixcommune = _request('choixcommune');
	$texte = _request('texte_message_auteur');
	$texte .= "\n\n-- " . _T('envoi_via_le_site') . ' '
		. supprimer_tags(extraire_multi($GLOBALS['meta']['nom_site']))
		. ' (' . $GLOBALS['meta']['adresse_site'] . "/) --\n";

	$message_retour = "pas de mail";
	switch ($sujet) {
		case "a":
			$message_retour = "mdph-secteur-courriernum@seinesaintdenis.fr";
			break;
		case "b":
		case "c":
			switch($age) {
				case "moins":
					if(in_array($choixcommune,$sect1)){
						$message_retour = "mdph-secteur-ouest-enfants@seinesaintdenis.fr";
					}
					if(in_array($choixcommune,$sect2)){
						$message_retour = "mdph-secteur-est-enfants@seinesaintdenis.fr";
					}
				break;
				case "plus":
					if(in_array($choixcommune,$sect3)){
						$message_retour = "mdph-secteur-nordouest-adultes@seinesaintdenis.fr";
					}
					if(in_array($choixcommune,$sect4)){
						$message_retour = "mdph-secteur-sudouest-adultes@seinesaintdenis.fr";
					}
					if(in_array($choixcommune,$sect5)){
						$message_retour = "mdph-secteur-sudest-adultes@seinesaintdenis.fr";
					}
				break;
			}
		case "d":
		case "f":
			$message_retour = "placehandicap@seinesaintdenis.fr";
			break;
		case "e":
			case "moins":
				if(in_array($choixcommune,$sect1)){
					$message_retour = "mdph-evaluation-ouest-enfants@seinesaintdenis.fr";
				}
				if(in_array($choixcommune,$sect2)){
					$message_retour = "mdph-evaluation-est-enfants@seinesaintdenis.fr";
				}
			break;
			case "plus":
				if(in_array($choixcommune,$sect6)){
					$message_retour = "mdph-evaluation-nordouest-adultes@seinesaintdenis.fr";
				}
				if(in_array($choixcommune,$sect7)){
					$message_retour = "mdph-evaluation-sudouest-adultes@seinesaintdenis.fr";
				}
				if(in_array($choixcommune,$sect8)){
					$message_retour = "mdph-evaluation-sudest-adultes@seinesaintdenis.fr";
				}
				if(in_array($choixcommune,$sect9)){
					$message_retour = "mdph-evaluation-sudest-adultes@seinesaintdenis.fr";
				}
			break;
		break;
	}
	$message_retour .= "<br/>sujet : ".$sujet."<br/>";
	$message_retour .= "age : ".$age."<br/>";
	$message_retour .= "ville :".$choixcommune."<br/>";


	return array('message_ok' => $message_retour);

}

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

function formulaires_ecrire_charger_dist() {
	include_spip('inc/texte');
	$puce = definir_puce();
	$valeurs = array(
		'nombre_a' => rand(1, 10),
		'nombre_b' => rand(1, 10),
		'sujet_message_auteur' => '',
		'texte_message_auteur' => '',
		'email_message_auteur' => isset($GLOBALS['visiteur_session']['email']) ?
			$GLOBALS['visiteur_session']['email'] : '',
		'nobot' => '',
		'test' => ''
	);
	return $valeurs;
}

function formulaires_ecrire_verifier_dist() {
	$erreurs = array();
	include_spip('inc/filtres');
	if (!$adres = _request('email_message_auteur')) {
		$erreurs['email_message_auteur'] = _T('info_obligatoire');
	} elseif (!email_valide($adres)) {
		$erreurs['email_message_auteur'] = _T('form_prop_indiquer_email');
	} else {
		include_spip('inc/session');
		session_set('email', $adres);
	}

	if (!$sujet = _request('sujet_message_auteur')) {
		$erreurs['sujet_message_auteur'] = _T('info_obligatoire');
	} elseif (!(strlen($sujet) > 3)) {
		$erreurs['sujet_message_auteur'] = _T('forum:forum_attention_trois_caracteres');
	}

	if (!$texte = _request('texte_message_auteur')) {
		$erreurs['texte_message_auteur'] = _T('info_obligatoire');
	} elseif (!(strlen($texte) > 10)) {
		$erreurs['texte_message_auteur'] = _T('forum:forum_attention_dix_caracteres');
	}

	if (_request('nobot')) {
		$erreurs['message_erreur'] = _T('pass_rien_a_faire_ici');
	}
	if(_request('test') != _request('nba')+_request('nbb')){
		$erreurs['message_erreur'] = "mauvaise réponse au calcul";
	}

	return $erreurs;
}

function formulaires_ecrire_traiter_dist() {

	$mail="contact@seinesaindenis.fr";
	$adres = _request('email_message_auteur');
	$sujet = _request('sujet_message_auteur');

	$sujet = '[' . supprimer_tags(extraire_multi($GLOBALS['meta']['nom_site'])) . '] '
		. _T('info_message_2') . ' '
		. $sujet;
	$texte = _request('texte_message_auteur');
	$texte .= "\n\n-- " . _T('envoi_via_le_site') . ' '
		. supprimer_tags(extraire_multi($GLOBALS['meta']['nom_site']))
		. ' (' . $GLOBALS['meta']['adresse_site'] . "/) --\n";
	$textear = "Nous avons bien reçu votre courriel, nos équipes vont transmettre votre demande au service concerné dans les deux jours ouvrés. Merci de nous avoir contacté. L'équipe web.<br/> votre message : <br/>".$texte;
	$envoyer_mail = charger_fonction('envoyer_mail', 'inc');
	$corps = array(
		'html' => $texte,
		'texte' => $texte,
		'repondre_a' => $adres
	);
	$corpsar = array(
		'html' => $textear,
		'texte' => $textear
	);
	$ar = ($envoyer_mail($adres, "accusé de reception ".$sujet, $corpsar, $mail,
	  'X-Originating-IP: ' . $GLOBALS['ip']));
	if ($envoyer_mail($mail, $sujet, $corps, $adres,
	  'X-Originating-IP: ' . $GLOBALS['ip'])) {
	  $message = "votre message a bien été envoyé, vous allez recevoir un accusé de reception par courriel";
	  return array('message_ok' => $message);
	} else {
	  $message = _T('pass_erreur_probleme_technique');
	  return array('message_erreur' => $message);
	}
	return array('message_ok' => $message);

}

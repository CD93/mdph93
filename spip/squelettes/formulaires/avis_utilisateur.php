<?php

/***************************************************************************\
 *  SPIP, Systeme de publication pour l'internet                           *
 *                                                                         *
 *  Copyright (c) 2018                                                     *
 *  Arnaud Martin, Antoine Pitrou, Philippe Riviere, Emmanuel Saint-James  *
 *                                                                         *
 *  Ce programme est un logiciel libre distribue sous licence GNU/GPL.     *
 *  Pour plus de details voir le fichier COPYING.txt ou l'aide en ligne.   *
\***************************************************************************/


if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}

function formulaires_avis_utilisateur_charger_dist($id) {
	$valeurs = array(
		id => $id,
		avis_navigation => '',
		avis_accessibilite => '',
		avis_presentation => '',
		avis_esthetique => '',
		avis_texte => '',
		_hidden => "<input type='hidden' name='avis_id' value='$id' />"
	);
	return $valeurs;
}

function formulaires_avis_utilisateur_verifier_dist($id) {
	$erreurs = array();
	return $erreurs;
}

function formulaires_avis_utilisateur_traiter_dist($id) {
	$avis_navigation = _request('avis_navigation');
	$avis_accessibilite = _request('avis_accessibilite');
	$avis_presentation = _request('avis_presentation');
	$avis_esthetique = _request('avis_esthetique');
	$avis_texte = _request('avis_texte');

	$message .= "Votre avis à bien été enregistré. Merci";
	sql_insertq('avis_site', array(
			'id_form' => $id,
			'navigation' => $avis_navigation,
			'accessibilite' => $avis_accessibilite,
			'presentation' => $avis_presentation,
			'esthetique' => $avis_esthetique,
			'texte' => $avis_texte
		));
	return array('message_ok' => $message);

}

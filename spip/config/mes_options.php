<?php

// sécurité
if (!defined('_ECRIRE_INC_VERSION')) {
    return;
}

define('_SURLIGNE_RECHERCHE_REFERERS',true);
if (isset($_REQUEST['recherche'])) {
  $_GET['var_recherche'] = $_REQUEST['recherche'];
}
defined('_FULLTEXT_ASTERISQUE_PARTOUT') || define('_FULLTEXT_ASTERISQUE_PARTOUT', true);

// proteger le #FORMULAIRE_CONTACTER
$GLOBALS['formulaires_no_spam'][] = 'ecrire';
define('_FORMIDABLE_EXPIRATION_FICHIERS_EMAIL', 15);
define('_FORMIDABLE_TAILLE_MAX_FICHIERS_EMAIL',10);

?>

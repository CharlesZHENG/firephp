<?php
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Initial Developer of the Original Code is Christoph Dorn.
 *
 * Portions created by the Initial Developer are Copyright (C) 2006
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *     Christoph Dorn <christoph@christophdorn.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



/* Used by the FirePHP extension to detect if the domain supports
 * the FirePHPServer components
 */

$vars = array();
$vars['App.Base.URL'] = 'http://'.$_SERVER['HTTP_HOST'].'/';


$response = array();

switch($_GET['PINFURI']) {

  case 'Detect':
    $response[] = '<pinf>';
    $response[] =   '<package name="com.googlecode.firephp">';
    $response[] =     '<vargroup name="Application">';
    $response[] =       '<var name="App.Base.URL"><value>'.$vars['App.Base.URL'].'</value></var>';
    $response[] =     '</vargroup>';
    $response[] =   '</package>';
    $response[] = '</pinf>';
    break;

}

header('Content-Type: text/xml');
print implode("\n",$response);

?>
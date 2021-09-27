<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * carabiner config
 * 
 * The config file for carabiner
 * 
 * @license		http://www.opensource.org/licenses/bsd-license.php BSD licensed.
 * @author		Mike Funk, Tony Dewan
 * @link		http://mikefunk.com
 * @email		mike@mikefunk.com
 * 
 * @file		carabiner.php
 * @version		1.5.4
 * @date		03/05/2012
 */

/*
|--------------------------------------------------------------------------
| Script Directory
|--------------------------------------------------------------------------
|
| Path to the script directory.  Relative to the CI front controller.
|
*/

$config['script_dir'] = '/assets/js/';


/*
|--------------------------------------------------------------------------
| Style Directory
|--------------------------------------------------------------------------
|
| Path to the style directory.  Relative to the CI front controller
|
*/

$config['style_dir'] = '/assets/css/';

/*
|--------------------------------------------------------------------------
| Cache Directory
|--------------------------------------------------------------------------
|
| Path to the cache directory. Must be writable. Relative to the CI 
| front controller.
|
*/

$config['cache_dir'] = '/Cache/';




/*
* The following config values are not required.  See Libraries/Carabiner.php
* for more information.
*/



/*
|--------------------------------------------------------------------------
| Base URI
|--------------------------------------------------------------------------
|
|  Base uri of the site, like http://www.example.com/ Defaults to the CI 
|  config value for base_url.
|
*/

//$config['base_uri'] = 'http://www.example.com/';


/*
|--------------------------------------------------------------------------
| Development Flag
|--------------------------------------------------------------------------
|
|  Flags whether your in a development environment or not. Defaults to FALSE.
|
*/

// defaulting to true until I can figure out what to do about image urls.
// they are different depending on whether an item is cached or not.
$config['dev'] = DESARROLLO;
if (ENVIRONMENT == 'testing') {$config['dev'] = FALSE;}


/*
|--------------------------------------------------------------------------
| Combine
|--------------------------------------------------------------------------
|
| Flags whether files should be combined. Defaults to TRUE.
|
*/

$config['combine'] = FALSE;


/*
|--------------------------------------------------------------------------
| Minify Javascript
|--------------------------------------------------------------------------
|
| Global flag for whether JS should be minified. Defaults to TRUE.
|
*/

$config['minify_js'] = FALSE;


/*
|--------------------------------------------------------------------------
| Minify CSS
|--------------------------------------------------------------------------
|
| Global flag for whether CSS should be minified. Defaults to TRUE.
|
*/

$config['minify_css'] = FALSE;

/*
|--------------------------------------------------------------------------
| Force cURL
|--------------------------------------------------------------------------
|
| Global flag for whether to force the use of cURL instead of file_get_contents()
| Defaults to FALSE.
|
*/

$config['force_curl'] = FALSE;
$CI = & get_instance();


/*
|--------------------------------------------------------------------------
| Predifined Asset Groups
|--------------------------------------------------------------------------
|
| Any groups defined here will automatically be included.  Of course, they
| won't be displayed unless you explicity display them ( like this: $this->carabiner->display('jquery') )
| See docs for more.
| 
| Currently created groups:
|	> jQuery (latest in 1.xx version)
|	> jQuery UI (latest in 1.xx version)
|	> Ext Core (latest in 3.xx version)
|	> Chrome Frame (latest in 1.xx version)
|	> Prototype (latest in 1.x.x.x version)
|	> script.aculo.us (latest in 1.x.x version)
|	> Mootools (1.xx version)
|	> Dojo (latest in 1.xx version)
|	> SWFObject (latest in 2.xx version)
|	> YUI (latest core JS/CSS in 2.x.x version)
|
*/
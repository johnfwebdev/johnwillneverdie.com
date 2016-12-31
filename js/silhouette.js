/* Silohouette Version 0.0.01 */
/*
 * is meant to be a lightweight framework
 * - Only the features your going to use
 * - Shortened to siloet.[method] or $.[method]
 * - Currently includes nothing but the barebones and
 *    an assertion that pins to the bottom-right of page
 * - Pre-production
 */
/* 
 * Programmed by: John Fasano Jr.
 */
/**Change Log**/
/*----------------
 * 12/1/15
 * 1. Included Immediate evokation(self executing function)
 * 2. Created Global Var and Return for siloet and $ names
 * 12/2/15
 * 1. Fixing the ability to call Silhoette externally
 */
(function (window, undefined) {
    //Define Variables
    var siloet = function () {
        return siloet; //Return entire library granting access to window
    }
    if (this) {
	      this.prototype.displayName;
		} else {
			  console.log('nope');
		}
	  window.siloet = window.silhouette = window.$ = siloet;  
}) (window);

//console.log(typeof siloet + ': ' + siloet.name + ' defined');
//console.log(typeof $ + ': ' + $.name + ' defined');
//console.log(typeof silhouette + ': ' + silhouette.name + ' defined');
//console.log(test);


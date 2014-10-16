/*!
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Basic Use:
 * $('#credit_card_input_field').creditCardTypeDetector({ 'credit_card_logos_id' : '#card_logos_ele' });
 *
 * Default requires no arguments, but looks for the logos to have the class
 * .card_logos
 *
 * See accompanying files for HTML structure, CSS, and png of card logos.
 */

// This section is needed to connect css .card_logos class with the html page
$(document).ready(function(){
			$('#cc_number').creditCardTypeDetector({ 'credit_card_logos' : '.card_logos' });
		});
		
// This section is needed for the regular expression, logic section
(function( $ ) {
	$.fn.creditCardTypeDetector = function( options ) {
		var settings = $.extend( {
				'credit_card_logos_id': '.card_logos'
			}, options),
			
			// the object that contains the logos
			logos_obj = $(settings.credit_card_logos_id),
			
			// the regular expressions check for possible matches as you type, hence the OR operators based on the number of chars
			// Visa
			visa_regex = new RegExp('^4[0-9]{0,15}$'),

			// MasterCard
			mastercard_regex = new RegExp('^5$|^5[1-5][0-9]{0,14}$'),

			// American Express
			amex_regex = new RegExp('^3$|^3[47][0-9]{0,13}$')
						
		return this.each(function(){
			// as the user types
			$(this).keyup(function(){
				var cur_val = $(this).val();

				// get rid of spaces and dashes before using the regular expression
				cur_val = cur_val.replace(/ /g,'').replace(/-/g,'');

				// checks per each, as their could be multiple hits
				if ( cur_val.match(visa_regex) ) {
					$(logos_obj).addClass('is_visa');
				} else {
					$(logos_obj).removeClass('is_visa');
				}

				if ( cur_val.match(mastercard_regex) ) {
					$(logos_obj).addClass('is_mastercard');
				} else {
					$(logos_obj).removeClass('is_mastercard');
				}

				if ( cur_val.match(amex_regex) ) {
					$(logos_obj).addClass('is_amex');
				} else {
					$(logos_obj).removeClass('is_amex');
				}

				// if nothing is a hit we add a class to fade them all out
				if ( cur_val != '' && !cur_val.match(visa_regex) && !cur_val.match(mastercard_regex)
				 && !cur_val.match(amex_regex)) {
					$(logos_obj).addClass('is_nothing');
				} else {
					$(logos_obj).removeClass('is_nothing');
				}
			});
		});
	};
})( jQuery );

// This section is needed for the 4 space for the cc_number text field
    function space(el, after) {
        after = after || 4;
        var v = el.value.replace(/[^\dA-Z]/g, ''),
            reg = new RegExp(".{" + after + "}","g")
        el.value = v.replace(reg, function (a, b, c) {
            return a + ' ';
        });
    }
    
    var el = document.getElementById('cc_number');
    el.addEventListener('keyup', function () {
        space(this, 4);
    });


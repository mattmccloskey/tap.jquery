/**
 * Custom tap event for jQuery
 * https://github.com/mattmccloskey/tap.jquery
 * Released under the MIT license
 */
(function($)
{
	// Tap event
	$.event.special.tap = {
		enabled: true,
		setup: function() 
		{
			var startEvent = {},
				endEvent = {},
				buffer = 5,	// How far the finger has to move before it's no longer a tap
				touchStarted = false,
				touchMoved = false,
				wasTouched = false;
			$(this).on({
				'touchstart.tapevents': function(e) 
				{
					touchStarted = true;
					touchMoved = false;
					wasTouched = true;
					startEvent.x = e.originalEvent.touches[0].pageX; 
					startEvent.y = e.originalEvent.touches[0].pageY;
				},
				'touchmove.tapevents': function(e) 
				{ 
					endEvent.x = e.originalEvent.touches[0].pageX;
					endEvent.y = e.originalEvent.touches[0].pageY;
					if(Math.abs(startEvent.x - endEvent.x) > buffer || Math.abs(startEvent.y - endEvent.y) > buffer)
					{
						touchMoved = true
					}
				},
				'touchend.tapevents': function(e) 
				{ 
					if(touchStarted && ! touchMoved)
					{
						$(e.target).trigger('tap', e); 
					} 
					else
					{ 
						/* It was a drag or mistake, not a tap */

						// Reset wasTouched, since click won't be fired in this case
						wasTouched = false;
					} 

					// reset touchStarted
					touchStarted = false;
				}
				,
				'click.tapevents.notaps': function(e) {
					// Check to see if there was a touch. If not, and we have touch, then we need to fire click.
					if(wasTouched === false && ('ontouchstart' in window || 'msmaxtouchpoints' in window.navigator))
					{
						$(e.target).trigger('tap', e);
					}

					// Reset wasTouched
					wasTouched = false;
				}
			});
		},

		teardown: function() 
		{
			return $(this).off('.tapevents');
		}
	};
	
	// Convert clicks to taps
	var isTouch = 'ontouchstart' in window || 'msmaxtouchpoints' in window.navigator;

	if(isTouch && (typeof convertClicksToTaps == "undefined" || convertClicksToTaps !== false))
	{
		var onFunc = $.fn.on,
			offFunc = $.fn.off,
			replaceClickWithTap = function() 
			{
				if(typeof arguments[0] === 'string' && arguments[0].slice(0, 5) === 'click' && arguments[0].indexOf('notaps') == -1)
				{
					arguments[0] = arguments[0].replace('click', 'tap');
				}
				return arguments;
			};

		$.fn.on = function() 
		{
			// Since we're replacing click with tap, click will still fire by default, causing href="#" to modify the URL bar.
			// To prevent this, add preventDefault on click event.
			if(typeof arguments[0] === 'string' && arguments[0].slice(0, 5) === 'click' && arguments[0].indexOf('notaps') == -1)
			{
				var args = Array.prototype.slice.call(arguments);
					i = 0, l = args.length;
				for (i; i < l; i++)
				{
					if(typeof args[i] === "function")
					{
						args[i] = function(e) 
						{
							if(e.currentTarget.tagName.toLowerCase() === 'a' && e.currentTarget.getAttribute('href'))
							{
								e.preventDefault();
							}
						};
						break;
					}
				}
				args[0] = 'click.tapreplaced';
				onFunc.apply(this, args);
			}
			return onFunc.apply(this, replaceClickWithTap.apply(this, arguments));
		};

		$.fn.off = function() 
		{
			return offFunc.apply(this, replaceClickWithTap.apply(this, arguments));
		};
	}

})(jQuery);

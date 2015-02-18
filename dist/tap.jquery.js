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
				buffer = 3,	// How far the finger has to move before it's no longer a tap
				touchMoved = false;
			$(this).on({
				'touchstart': function(e) 
				{
					touchMoved = false;
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
					if( ! touchMoved)
					{ 
						$(this).trigger('tap', e); 
					} 
					else
					{ 
						/* It was a drag or mistake, not a tap */
					} 
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

	if(isTouch && typeof convertClicksToTaps == "undefined" || convertClicksToTaps !== false)
	{
		var onFunc = $.fn.on,
			offFunc = $.fn.off,
			replaceClickWithTap = function() 
			{
				if(typeof arguments[0] === 'string' && arguments[0].slice(0, 5) === 'click')
				{
					arguments[0] = arguments[0].replace('click', 'tap');
				}
				return arguments;
			};

		$.fn.on = function() 
		{
			return onFunc.apply(this, replaceClickWithTap.apply(this, arguments));
		};

		$.fn.off = function() 
		{
			return offFunc.apply(this, replaceClickWithTap.apply(this, arguments));
		};
	}

})(jQuery);

/**
 * Custom tap event for jQuery
 */
(function($)
{

	$.event.special.tap = {
		enabled: true,
		setup: function() 
		{
			var startEvent = {},
				endEvent = {},
				buffer = 3,
				touchMoved = false;
			$(this).on({
				'touchstart': function(e) 
				{ 
					e.preventDefault(); 
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
						/* It was a drag, not a touch */
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
	if(typeof convertClicksToTaps == "undefined" || convertClicksToTaps !== false)
	{
		console.log("convert");
		var onFunc = $.fn.on,
			offFunc = $.fn.off,
			replaceEventName = function (eventName) 
			{
				if (eventName.slice(0, 5) == 'click') 
				{
					return eventName.replace('click', 'tap');
				}
				return eventName;
			};

		$.fn.on = function() 
		{
			if(typeof arguments[0] === "string")
			{
				arguments[0] = replaceEventName(arguments[0]);
			}
			return onFunc.apply(this, arguments);
		};

		$.fn.off = function() 
		{
			if(typeof arguments[0] === "string")
			{
				arguments[0] = replaceEventName(arguments[0]);
			}
			return offFunc.apply(this, arguments);
		};
	}
})(jQuery);

$(function(){
	var tapsOn = function() {
		$('#pad').on('tap', function(e){ 
			e.preventDefault();
			$('.alert').show().fadeOut();
		});
	};
	var tapsOff = function() {
		$('#pad').off('tap');
	};

	var tapsAreOn = true;

	$('.taps-toggle').on('click', function(e) {
		e.preventDefault();
		if(!tapsAreOn)
		{
			tapsOn();
			$('.state').text('On');
		}
		else
		{
			tapsOff();
			$('.state').text('Off');
		}
		tapsAreOn = !tapsAreOn;
	});

	tapsOn();
});

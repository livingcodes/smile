/*
Example:
<body>
<a href="javascript:void(0)" class="pop-up">pop up</a>
<div class="pop">
  <a href="javascript:void(0)" class="pop-it">pop it</a>
</div>

<script src="jquery-2.0.0.min.js"></script>
<script src="pop.jquery.js"></script>
<script>
	$('.pop').pop()
</script>
<body>
*/

$.fn.pop = function() {
	
	var $this = this
		
	$this.css({	'display':'none' })
	
	$('.pop-up').click(function() {
		$this.fadeIn()
	})
	
	$('.pop-it').click(function() {
		$this.fadeOut()
	})
	
	$(document).mouseup(function(e) {
		var $target = $(e.target)
		if ($target.closest($this).length == 0 
		&& !$target.is($this))
			$this.fadeOut()
	})
	
	return $this
}

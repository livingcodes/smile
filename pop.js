/*
Description: "Pops up" an html element to view and then "pops it" to hide
- indicate which element to pop up with 'pop' class
- indicate which element to click to pop up (open) with 'pop-up' class
- indicate which element to click to pop it (close) with 'pop-it' class

Example:
<a href="javascript:void(0)" class="pop-up">pop up</a>

<div class="pop">
	This will show in popup
	<a href="javascript:void(0)" class="pop-it">Close</a>
</div>

<script src="pop.js"></script>
<script>
$(function() {
  pop()
})
</script>
*/

<script>	
	// only use when there is just one pop-up on page
	function pop() {
		var $this = $('.pop')
			
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
		});
	}
</script>

<script>
	// works with one or multiple pop-ups on page
	// you will need to configure selector for pop-up link
	function pop() {
  	    $('.pop').each(function(i, el) {
            var $pop = $(el)
            $pop.css({ 'display':'none' })
			
			// configure this selector to find your pop-up link
            $pop.prev('li').find('.pop-up').click(function() {
			    $pop.fadeIn()
		    })

			// assumes pop-it link is inside pop-up container
		    $pop.find('.pop-it').click(function() {
			    $pop.fadeOut()
		    })

            $(document).mouseup(function(e) {
			    var $target = $(e.target)
			    if ($target.closest($pop).length == 0 
			    && !$target.is($pop))
				    $pop.fadeOut()
		    });
        })
	}
</script>

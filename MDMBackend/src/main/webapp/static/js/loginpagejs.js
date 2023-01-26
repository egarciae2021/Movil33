$(document).ready(function() {
	
	$('#show').on('click', function () {
	    $('.center').show();
	    
	    $('.login-container').hide();
	    $('#mainWrapper').hide();
	})

	$('#close').on('click', function () {
	    $('.center').hide();
	    $('#show').show();
	    $('.login-container').show();
	    
	    $('#mainWrapper').show();
	})
	
	$('#search-by-id-client-p').hide();
});
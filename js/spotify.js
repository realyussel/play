// Viewport Heights

$(window).on("resize load", function(){
  
  var totalHeight = $(window).height();
  var headerHeight = $('.header').outerHeight();
  var footerHeight = $('.current-track').outerHeight();
  var playlistHeight = $('.playlist').outerHeight();
  var nowPlaying = $('.playing').outerHeight();
  var navHeight = totalHeight - (headerHeight + footerHeight + playlistHeight + nowPlaying);
  var artistHeight = totalHeight - (headerHeight + footerHeight);

  //console.log(totalHeight);
  
  $(".navigation").css("height" , navHeight);
  $(".artist").css("height" , artistHeight);
  //$(".social").css("height" , artistHeight);

	if ($(window).width() <= 768){
    $(".navigation").css("height" , "auto");
    $(".artist").css("height" , "auto");
	}	
});
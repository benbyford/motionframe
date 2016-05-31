$(function(){

/* hover functions */
  var no = $('.motion-container img').length;
  var percent = 100/no;
  for(i=no;i>0;i--){
    $('.tracker').prepend('<div style="width:'+percent+'%;left:'+(percent*i)+'%" no-data="'+i+'" class="hover-'+i+' hover"></div>');
  }

  function changeSlide(slideNo){
    $('.slide-active').removeClass('slide-active');
    $('.motion-container img:eq('+slideNo+')').addClass('slide-active');
  }

  $('.hover').mouseover(function(){
    $slideNo = $(this).attr('no-data');
    changeSlide($slideNo);
  });

/* tilt functions */
  function tilt(x,y){
    var tiltNo;
    if(orientation){ // change axis if orientation changes
      tiltNo = x;
    }else{
      tiltNo = y;
    }
    tiltNo = Math.floor((Math.floor(tiltNo) + no ) / 2);
    $('.data').html(tiltNo);
    if(tiltNo <= no && tiltNo >= 0){
      changeSlide(tiltNo);
    }
  }
  $(window).on("orientationchange", function( event ) {
    orientation = window.orientation;
  });

  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function () {
        tilt(event.beta, event.gamma);
    }, true);
  } else if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function () {
        tilt(event.acceleration.x * 2, event.acceleration.y * 2);
    }, true);
  } else {
    window.addEventListener("MozOrientation", function () {
        tilt(orientation.x * 50, orientation.y * 50);
    }, true);
  }
});

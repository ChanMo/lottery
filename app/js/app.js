/**
 * lottery js
 * @date 20160720
 * @author chen
 * @email chen.orange@aliyun.com
 * @website http://www.findchen.com
 */

var circles = $("circle"); // define all element
var count = circles.length; // count of element

var moving = false; //moving status
var moveTime; //moving time

var main = $(".main");
var result_box = $(".result-box");
var result = $(".result");

circles.each(function(){
  $(this).attr({
    "cx":get_random(),
    "cy":get_random(),
    "r":get_random(10),
    "fill":"rgb("+parseInt(55+get_random(200))
      +","+parseInt(55+get_random(200))+
      ","+parseInt(55+get_random(200))+")"
  });
});

circles.addClass("move");


/**
 * get random number
 */
function get_random(r){
  var random = Math.random();
  var result;
  if(r){
    result = random*r;
  }else{
    result = random*100 + '%';
  }
  return result;
}

/**
 * press enter key event
 * start ...
 */
document.onkeydown = function(event){
  if(event.keyCode == 13){
    if(moving == true){

      /** if moving is true, then make it false **/
      moving = false;
      window.clearInterval(moveTime);

      get_result();

    }else{
      if(!$("circle").is(":animated")){
        /** if moving is false, then make it true **/
        result_box.hide();
        result.hide();
        main.removeClass("blur");
        circles.removeClass("move");

        moving = true;
        move();
      }
    }
  }
};

/**
 * animation
 */
function move(){
  moveTime = window.setInterval(function(){
    circles.each(function(){
      $(this).animate({
        cx: get_random(),
        cy: get_random()
      },80);
    });
  }, 100);
}


/**
 * get result
 */
function get_result(){
  if(count==0){
    $(".content").html('<span>缺少抽奖元素</span>');
  }else{
    console.log(count);
    var number = parseInt(Math.random() * count);
    var name = circles.eq(number).data('name');
    var mobile = String(circles.eq(number).data('mobile'));

    mobile = mobile.substr(0,3) + '****' + mobile.substr(7,4);

    /** move to result position **/
    circles.eq(number).animate({cx:'50%',cy:'50%',r:'20px',opacity:0},600, function(){
      result_box.fadeIn();
      result.fadeIn();
      main.addClass("blur");
      circles.addClass("move");

      //var item = '<div class="item">'+name+'&nbsp;&nbsp;'+mobile+'</div>';
      var item = '<div class="item">'+mobile+'</div>';
      $(".content").html(item);


      /** remove element **/
      circles.eq(number).remove();
      circles = $("circle");
      count--;

    });



  }
}

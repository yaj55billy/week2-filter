








// --------------wow
var wow = new WOW(
{
    boxClass:     'wow', 
    animateClass: 'animated',
    offset:       0,  
    mobile:       true, 
    live:         true, 
    callback:     function(box) {

    },
    scrollContainer: null 
}
);
wow.init();
// --------------wow END






// 漢堡選單
// $('.open_button').each(function(){
//     $(this).click(function(){
//         if($(this).hasClass('active')){
//         $(this).siblings('nav').slideUp(500);
//         $(this).children().children('.menu-top').removeClass('menu-top-click');
//         $(this).children().children('.menu-middle').removeClass('menu-middle-click');
//         $(this).children().children('.menu-bottom').removeClass('menu-bottom-click');
//         $(this).removeClass('active');
//         } else{
//         $(this).siblings('nav').slideDown(500);
//         $(this).children().children('.menu-top').addClass('menu-top-click');
//         $(this).children().children('.menu-middle').addClass('menu-middle-click');
//         $(this).children().children('.menu-bottom').addClass('menu-bottom-click');
//         $(this).addClass('active');
//         }
//     });
// });

// 漢堡選單 END


// 點擊後滑到此區塊
// $('.detail_menu li').click(function(){
//     var $this_el = $(this).parents('a').attr('href');
//     $('html,body').animate({scrollTop:$($this_el).offset().top - 86},800);
// });



























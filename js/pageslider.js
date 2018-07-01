var page = window.location.hash;
var active;
$(function() {
    if(page != "" && $(page).length != 0){
        $(page).fadeIn('slow');
        active = page;
    }else{
        $('#_default').fadeIn('slow');
        active = '#_default';
    }

    $(window).bind( 'hashchange', function() {
        page = window.location.hash;
        if(page != "" && $(page).length != 0){
            $(active).fadeOut('slow', function(){
                $(page).fadeIn('slow');
            });
            active = page;
        }else{
            if(active != "#_default"){
                $(active).fadeOut('slow', function(){
                    $("#_default").fadeIn('slow');
                });
                active = "#_default";
            }
        }
    });

    $(".pageslider-nav a").click(function(){
        if(!$(this).hasClass("nav-popout")){
            $(".active").removeAttr("class");
            $(this).attr("class", "active");
        }
    });

});
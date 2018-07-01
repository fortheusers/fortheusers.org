var page = window.location.hash;
var active;
$(function() {
    if(page != "" && $(page).length != 0 && active == undefined){
        $(page).fadeIn('slow');
        active = page;
        $(".active").removeClass("active");
        $("a[href$='" + page + "']").addClass("active");
    }else{
        $('#home').fadeIn('slow');
        active = '#home';
    }

    $(window).bind( 'hashchange', function() {
        page = window.location.hash;
        if(page != "" && $(page).length != 0){
            $(active).fadeOut('slow', function(){
                $(page).fadeIn('slow');
            });
            active = page;
        }else{
            if(active != page){
                $(active).fadeOut('slow', function(){
                    $("#home").fadeIn('slow');
                });
                active = "#home";
            }
        }
    });

    $(".pageslider-nav a").click(function(){
        if(!$(this).hasClass("nav-popout")){
            $(".active").removeClass("active");
            $(this).addClass("active");
        }
    });

});
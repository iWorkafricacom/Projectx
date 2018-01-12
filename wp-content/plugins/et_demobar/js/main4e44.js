(function($){

	$(document).ready(function(){
        $('[rel="tooltip"]').tooltip();
        $('[data-toggle="tooltip"]').tooltip();
        /*if(typeof $.tooltip !== "undefined") {
            $('[rel="tooltip"]').tooltip();  
            $('[data-toggle="tooltip"]').tooltip();  
        }      */


        if (document.cookie.indexOf ("tooltip") == -1)
        {
            document.cookie = "tooltip = on";
            $('.tooltip-loadpage').addClass('show');
        }

        $(document).click(function(){
            if($('.tooltip-loadpage').hasClass('show')){
                $('.tooltip-loadpage').removeClass('show');
            }
        });
        $('.demobar-blur-theme').click(function(){
            if($('.et-plugin-demobar').hasClass('show-demobar')){
                $('.et-plugin-demobar').toggleClass('show-demobar');
                $(this).toggleClass('in');
            }
        });

        // init trigger button
        $(".trigger").click(function(event) {
            event.preventDefault();
            var target = $(event.currentTarget);

            target.toggleClass('active');
            if($('.tooltip-loadpage').hasClass('show')){
                $('.tooltip-loadpage').removeClass('show');
            }
            target.parents(".et-plugin-demobar").toggleClass('show-demobar');
            $(".demobar-blur-theme").toggleClass('in');

            createCookie('hide_demo_bar',1,7);
            if( ! target.parents(".et-plugin-demobar").hasClass('show-demobar') ){
                createCookie('hide_demo_bar',"",-1);
            }
            //event.stopPropagation();
        });

        // change version
        $('#change_version').change(function(event) {
            var url = $(this).val();
            if( url && url != "--View as--" && url != "--Versions--" )
                window.location.href  = url;
        });

        $("#change_user").change(function(event) {
            $.ajax({
                type : 'post',
                url : main.ajaxUrl,
                data : {
                    action : 'et-demo-change-user',
                    user : $('#change_user option:selected').attr('data-name')
                },
                success : function(resp) {
                    if(resp.success) {
                        window.location.reload();
                    }
                }
            });

        });

        $(".change-screen").click(function(event){
            event.preventDefault();
            var targetScreenUserRole = $(this).closest('.panel-default').attr("data-user"),
                currentUser = $('.panel-group').attr("data-curUser"),
                targetScreenURL = $(this).attr('href');

            if ($(this).closest('.list-options').attr("data-user"))
                targetScreenUserRole = $(this).closest('.list-options').attr("data-user");

            $(this).parents('li').addClass('active');

            // if current user is the correct target role for the screen, go directly to the page
            if (targetScreenUserRole == currentUser) {
                window.location = targetScreenURL;
                // if the target link & the current link is the same URL with different hashtags, we need to reload the page manually
                // 3 conditions: both links has hashtag and equivalent when removing the hash
                if(-1 !== window.location.href.indexOf('#') && -1 !== targetScreenURL.indexOf('#') && targetScreenURL.substring(0, targetScreenURL.indexOf('#')) == location.href.replace(location.hash,'') ){
                    location.reload();
                }
            }
            else{ //if not, change user first, then visit the page
                $.ajax({
                    type : 'post',
                    url : main.ajaxUrl,
                    data : {
                        action : 'et-demo-change-user',
                        user : targetScreenUserRole
                    },
                    success : function(resp) {
                        if(resp.success) {
                            window.location = targetScreenURL;
                            // if the target link & the current link is the same URL with different hashtags, we need to reload the page manually
                            if(-1 !== window.location.href.indexOf('#') && -1 !== targetScreenURL.indexOf('#') && targetScreenURL.substring(0, targetScreenURL.indexOf('#')) == location.href.replace(location.hash,'') ){
                                location.reload();
                            }
                        }
                    }
                });
            }
        });

        // function create cookie after hide demo bar

        function createCookie(name,value,days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        }

        // show package modal

        $('.btn-bn').click(function(event) {
            if ($('#package_modal').length !== 0){
                event.preventDefault();
                $('body').toggleClass('modal-open');
                testAnim('zoomIn');
                setHeight();
            }
        });
        $('.close_modalbar').click(function(event) {
            event.preventDefault();
            $('body').toggleClass('modal-open');
            testAnim('zoomOut');

        });

        function testAnim(x) {
            $('#package_modal').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                if(x == 'zoomOut')
                {
                    $(this).removeClass();
                }
            });
        }

        function setHeight() {
            var maxHeight = 1;
            var maxWidth = 1;
            $(".pricing-list-option-wrapper").each(function() {
                var h     = $(this).height();
                var w     = $(this).width();
                maxHeight = h > maxHeight ? h : maxHeight;
                maxWidth = maxWidth + w;
            });
            //set height
            $(".pricing-list-option-wrapper").css('height', maxHeight);
            //if($(".xmas-price").length){
            //    $(".xmas-price").css('width', maxWidth + 3);
            //}
        }


        $( window ).resize(function() {
            var maxWidth = 1;
            $(".pricing-list-option-wrapper").each(function() {
                var w     = $(this).width();
                maxWidth = maxWidth + w;
            });
            //if($(".xmas-price").length){
            //    $(".xmas-price").css('width', maxWidth + 3);
            //}
        });

        $("#demobar-container").mCustomScrollbar({
            autoHideScrollbar: true,
            scrollInertia: 250
        });

        $('#demobar-container').hover(function() {
            $(document).bind('mousewheel DOMMouseScroll',function(){
                stopWheel();
            });
        }, function() {
            $(document).unbind('mousewheel DOMMouseScroll');
        });

        function stopWheel(e){
            if(!e){ /* IE7, IE8, Chrome, Safari */
                e = window.event;
            }
            if(e.preventDefault) { /* Chrome, Safari, Firefox */
                e.preventDefault();
            }
            e.returnValue = false; /* IE7, IE8 */
        }


    });

})(jQuery);


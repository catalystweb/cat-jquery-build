$(window).on("load", function () {
    //logo hover event handler 
    $(".logo").hover(function () {
        $(".catalyst").animate({width: 'toggle'});
    });      

    //jquery global hover event handler
    $(document).on("mouseover", ".user-name", function () {
        $(this).next("span").children("i").css("display","inline-block").animate({"margin-left":"0px"}, 200);
        $(this).next("span").children("i").fadeIn("fast");
        return false;
    });
    $(document).on("mouseleave",".user-name", function () {
        $(this).next("span").children("i").css("display","inline-block").animate({"margin-left":"20px"}, 200);
        $(this).next("span").children("i").fadeOut("fast");
        return false;
    }); 
 
    //jquery global click event handler
    $(document).on("click", function(e) {
        var path = "css/";        
        if (e.target.id == "submit-theme") {
            if ($("#dark").is(":checked")) {
                $('link[href="'+path+'dark-theme.css"]').prop("disabled", false);
                $('link[href="'+path+'light-theme.css"]').prop("disabled", true);
                if ($('#swMenu').is(":checked")) {
                    $(".arrow-icon").removeClass("arrow-spin-left").addClass("arrow-spin-left");
                    $(".content-wrapper").css("padding-bottom","0");
                    $(".page-container").css("opacity", "0.3");
                }
                theme = Cookies.set('theme','dark');
            } 
            if ($("#light").is(":checked")) {
                $('link[href="'+path+'dark.theme.css"]').prop("disabled", true);
                $('link[href="'+path+'light-theme.css"]').prop("disabled", false);
                if ($('#swMenu').is(":checked")) {
                    $(".arrow-icon").removeClass("arrow-spin-left").addClass("arrow-spin-left");
                    $(".content-wrapper").css("padding-bottom","0");
                    $(".page-container").css("opacity", "0.3");
                }
                theme = Cookies.set('theme','light');
            }
            if ($('#swMenu').is(":checked")) {        
                $(".arrow-icon").removeClass("arrow-spin-down").addClass("arrow-spin-left");
                $(".content-wrapper").css("padding-bottom","0");
                $("header").removeClass("slideDown");
                menu =  Cookies.set('menu','right');
            } else {
                $(".arrow-icon").removeClass("arrow-spin-right").addClass("arrow-spin-up");
                $(".side-menu-wrapper").removeClass("slideIn");
                menu =  Cookies.set('menu','top');
            }
            $("#change-theme").fadeOut("fast");
            $(".page-container").css("opacity", "1");
        }         

        if (e.target.classList[0] == "current-user") {
            if ($(".current-user").text() == "*Click here for the tutorial**Click here for the tutorial*") {
                $("#welcome-modal").fadeIn("fast");
            }
        }
        
        //modal display window
        if (e.target.id == "ok-button") {
            $(".modal-container").fadeOut("fast");
            $("#welcome-search").fadeIn("fast");
            $(".user-mod").fadeIn("fast");
            $("footer").addClass("highlighter");
        }

        if (e.target.id == "gotit-button") {
            $("div, span, button, footer").removeClass("highlighter");
            $(".modal-container").fadeOut("fast");
            $("#welcome-clickuser").fadeIn("fast");
            $(".user-mod").fadeIn("fast");
            $(".show-avatar").addClass("highlighter");
            $(".user-info-child").addClass("highlighter");
        }

        if (e.target.id == "gotit2-button") {
            $("div, span, button, footer").removeClass("highlighter");
            $(".modal-container").fadeOut("fast");
            $("#welcome-block").fadeIn("fast");
            $(".user-mod").fadeIn("fast");
            $(".user-button").addClass("highlighter");
        }

        if (e.target.id == "gotit3-button") {
            $("div, span, button, footer").removeClass("highlighter");
            $(".modal-container").fadeOut("fast");
            $("#welcome-final").fadeIn("fast");
            $(".user-mod").fadeIn("fast");
            $(".arrow-icon").addClass("highlighter");
        }

        if (e.target.id == "gotit4-button") {
            $(".modal-container").fadeOut("fast");
            $("div, span, button, footer, label").removeClass("highlighter");
            tutorial = Cookies.set('tutorial','complete');
            getData(cookies,"complete");
        }

        if (e.target.id == "add-user") {
            $(".modal-container").fadeOut("fast");
            $("#add-avatar-ul").val('');
            $("#add-modal").fadeIn("fast");
            $(".user-mod").fadeIn("fast");
            $(".page-container").css("opacity", "0.3");
    
        }
        if (e.target.id == "del-user") {
            $("select").val('');
            $("#checkbox-state").prop("checked",false);
            if (!$('#swMenu').is(":checked")) { 
                $('input[type=checkbox]').prop('checked',false);
            }
            $(".modal-container").fadeOut("fast");
            $("#del-modal").fadeIn("fast");
            $(".user-mod").fadeIn("fast");
            $(".page-container").css("opacity", "0.3");
        }
        if (e.target.id == "block-user") {
            $("select").val('');
            $("#checkbox-state").prop("checked",false);
            if (!$('#swMenu').is(":checked")) { 
                $('input[type=checkbox]').prop('checked',false);
            }
            $(".modal-container").fadeOut("fast");
            $("#block-modal").fadeIn("fast");
            $(".user-mod").fadeIn("fast");
            $(".page-container").css("opacity", "0.3");
        }
        if (e.target.id == "change-theme") {
            $(".modal-container").fadeOut("fast");
            $("#change-theme").fadeIn("fast");
            $(".page-container").css("opacity", "0.3");
        }
        if (e.target.id == "log-out") {
            $(".modal-container").fadeOut("fast");
            $("#logout-modal").fadeIn("fast");
            $(".user-mod").fadeIn("fast");
            $(".page-container").css("opacity", "0.3");
        }

        //regex function for email validation
        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }  

        //log-in redirect
        if (e.target.id == "log-in") {
            location.reload();
        }

        //add modal display
        if (e.target.id == "add-user" || e.target.id == "edit-user") {
            if ($("#add-button").is(":visible")) {
                $("#add-button").css("display","none");
            }
            $(this).on("change", function() {
                if(!$(".black-icon").is(":visible")) {
                    if ($("#add-avatar").val() || $("#edit-avatar").val()) {
                        $("#add-avatar-ul, #edit-avatar-ul").val("");   
                        $(".file-input").addClass("silver");
                        $(".file-input").css("cursor","not-allowed");
                        $(".flex-inline").css("display","none");
                        $("#add-avatar-ul").val('');
                        $("#add-avatar-ul, #edit-avatar-ul").prop("disabled", true);          
                    } else {
                        $(".file-input").removeClass("silver");
                        $(".file-input").css("cursor","pointer");
                        $("#add-avatar-ul, #edit-avatar-ul").prop("disabled", false);
                    }
                }
            });
            //regex function to validate email            
            $(this).on("input", function () {  
                $("#add-modal input[type='email'], #add-modal input[type='text']").bind("keyup change", function () {
                    if ($("#add-email").val() != "" && $("#add-name").val() != "" && $("#add-title").val() != "") {
                        var email = $("#add-email").val();
                        if (validateEmail(email)) {
                          $("button").prop("disabled", false);
                          $("#add-button").fadeIn("fast");
                        }
                    } else {
                        $("button").prop("disabled", true);
                        $("#add-button").fadeOut("fast");
                    }
                });
            });      
        }
          
        //block modal display
        if (e.target.id == "block-user") {
            if ($("#del-block-button").is(":visible")) {
            $("#del-block-button").css("display","none");
            }
            $("#block-list").on("change", function () {  
            if ($("#block-list option").filter(":selected").text() != "Select blocked user from list") {
                $("#del-block-button").fadeIn("fast");
            } else {
                $("#del-block-button").fadeOut("fast");
            }
            });
        }
        
        //delete modal display
        if (e.target.id == "del-user") {
            if ($("#confirm-del").is(":visible")) {
                $("#confirm-del").css("display","none");
                $("#del-button").css("display","none");
            }
            $("#del-list").on("change", function () {  
            if ($("#del-list option").filter(":selected").text() != "Select user from list") {
                $("#confirm-del").fadeIn("fast");
            } else {
                $("#confirm-del").fadeOut("fast");
                $("#checkbox-state").prop("checked",false);
                $("#del-button").fadeOut("fast");
            }
            });
        }    
        if (e.target.id == "checkbox-state") {
            if ($("#checkbox-state").prop("checked") == true) {
                $("#del-button").fadeIn("fast");
            } else {
                $("#del-button").fadeOut("fast");
            }
        }
        
        //hide slide menu display once out of view and transition complete
        if ($('#swMenu').is(":checked")) {
            console.log($(".side-menu-wrapper").css("margin-left"));
            if ($(".side-menu-wrapper").css("margin-left") >= "1px" && $(".side-menu-wrapper").hasClass("slideOut")) {
                setTimeout(function () {
                $(".side-menu-wrapper").css("display","none");
                },400);
            } else {
                $(".side-menu-wrapper").css("display","flex");
            }
        } else {
            $(".side-menu-wrapper").css("display","none");
        }        

        //menu arrow direction spin 
        if (e.target.classList[0] == "arrow-icon") {
            if ($(".side-menu-wrapper").is(":visible")) {
                $("#del-modal").fadeOut("fast");
                $("#add-modal").fadeOut("fast");
                $("#block-modal").fadeOut("fast");
                $("#edit-modal").fadeOut("fast");
                $("#change-theme").fadeOut("fast");
                $(".user-success").fadeOut("fast");
            }
            if ($('#swMenu').is(":checked")) {
                    if ($(".arrow-icon").hasClass("arrow-spin-right")) {
                        $(".arrow-icon").removeClass("arrow-spin-right").addClass("arrow-spin-left");
                        setTimeout(function () {
                            $(".side-menu-wrapper").removeClass("slideIn").addClass("slideOut");
                        },100);
                        $(".content-wrapper").css("padding-bottom","0");
                        $(".page-container").css("opacity", "1");
                    } else {                     
                        $(".side-menu-wrapper").css("display","flex");
                        setTimeout(function () {
                            $(".side-menu-wrapper").removeClass("slideOut").addClass("slideIn");
                        },100);
                        $(".arrow-icon").removeClass("arrow-spin-left").addClass("arrow-spin-right");
                        $(".content-wrapper").css("padding-bottom","0");
                        $(".page-container").css("opacity", "0.3");
                    }
            } else {
                if ($("header").hasClass("slideDown")) {
                    $("header").removeClass("slideDown");
                    $(".content-wrapper").css("padding-bottom","0");
                    $(".arrow-icon").removeClass("arrow-spin-left");
                    $(".arrow-icon").removeClass("arrow-spin-down").addClass("arrow-spin-up");
                } else {
                        $("header").addClass("slideDown");
                        $(".content-wrapper").css("padding-bottom","13%");
                        $(".side-menu-wrapper").removeClass("slideIn").addClass("slideOut");
                        $(".arrow-icon").removeClass("arrow-spin-right");
                        $(".arrow-icon").removeClass("arrow-spin-up").addClass("arrow-spin-down");
                }
            }
        }
        
        //flip sort arrow when sort function called
        if (e.target.classList[0] == "sort" || e.target.classList.contains('arrow-sort')) {
            if ($(".arrow-sort").hasClass("arrow-spin-down")) {
                $(".arrow-sort").removeClass("arrow-spin-down");
                $(".arrow-sort").addClass("arrow-spin-up");
            } else {
                $(".arrow-sort").removeClass("arrow-spin-up");
                $(".arrow-sort").addClass("arrow-spin-down");
            }
        }

        // call sort function for asc and desc onclick event    
        if (e.target.classList[0] == "sort" || e.target.classList.contains('arrow-sort')) {
            var getStateVal = document.getElementsByClassName("sort-list")[0].id;    
            $(".sort-class").sort(function (a, b) {
                if (getStateVal == "sort-asc") {
                    document.getElementsByClassName("sort-list")[0].id = "sort-des";
                    return String.prototype.localeCompare.call(
                        $(a).find("input.user-name").data("name").toLowerCase(),
                        $(b).find("input.user-name").data("name").toLowerCase()
                    );
                } else {
                    document.getElementsByClassName("sort-list")[0].id = "sort-asc";
                    return String.prototype.localeCompare.call(
                        $(b).find("input.user-name").data("name").toLowerCase(),
                        $(a).find("input.user-name").data("name").toLowerCase()
                    );
                }
            }).appendTo(".content-wrapper");
        } 
    });   
    
    // prevent enter key creating new line for editable input field //
    $(document).on("keypress", ".user-name, .user-title", function(e) {
        if (e.which == 13) {
            e.preventDefault();
            $(this).blur();
        }        
    });
});

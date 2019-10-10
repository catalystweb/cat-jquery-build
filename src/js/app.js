//=require jquery.js

$(window).on("load", function () {    
  //onblur event handler callback for editable input
  $(document).on("blur", ".user-name, .user-title", function() { 
    var classVal = $(this).attr("class");
    var textVal = $(this).val();
    var idVal = $(this).closest("section").attr("id");
    $(this).each(function(){
      var value = $(this).val();
      var size  = value.length;      
      size = size*2; // average width of a char
      $(this).css('width',size*6);    
    });
    userDirectEdit(classVal,textVal,idVal);
  });  

  //regex function for email validation
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }    
         
  $("#login-modal").on("input", function () {  
      $("#login-modal input[type='email'], #login-modal input[type='password']").bind("keyup change", function () {
          if ($("#login-email").val() != "" && $("#login-password").val() != "") {
              var email = $("#login-email").val();
              if (validateEmail(email)) {
              $("button").prop("disabled", false);
              $("#login-button").fadeIn("fast");
              }
          } else {
              $("button").prop("disabled", true);
              $("#login-button").fadeOut("fast");
          }
        });
  });      
     
  
  //click event handler with callback dependancies
  $(document).on("click", function (e) {
    
    //login button callback
    if (e.target.id == "login-button") {
      var dataEmail = $("#login-email").val();
      var dataPass =  $("#login-password").val();
        login(dataEmail,dataPass,false);
    }

    //logout modal display
    if (e.target.id == "log-out") {
        $("#logout-button").fadeIn("fast"); 
        $("#logout-button").on("click", function() {
          $("#logout-modal").fadeOut("fast");
          login(null,validatepass,true);
        });                 
    }   

    //close statement if user clicks close icon
    if (e.target.classList[0] == "close") {
        $("input").val('');
        $("select").val('');
        $(".modal-container").fadeOut("fast"); 
        $(".black-icon").css("display","none"); 
        if (!$('input[type="radio').is(':radio')) {
            $("input").val('');
        }
        if ($(".pass").is(":visible")) {
          $(".user-success").fadeOut("fast");
          $(".content-wrapper").css("display","none");
          $("footer").css("display","none");
          getData(cookies,"complete");
          getDelData();
          getBlockData();
        }
        if (!$("#login-modal").is(":visible")) {  
          getData(cookies,"complete");
        } else {
          $(".user-success").fadeOut("fast");
          getData(cookies,tutorial);
          getDelData();
          getBlockData();         
        }
    }

    //key function if menu open close during filter function
    $(document).keyup(function (e) {
      if (e.target.id == "searchField") {
          if ($("header").hasClass("slideDown")) {
              $("header").removeClass("slideDown");
              $(".arrow-icon").removeClass("arrow-spin-down").addClass("arrow-spin-up");
          }
      }
      if ($(".modal-container").is(":visible")) {
          if (e.key === "Escape" && !$("#login-modal").is(":visible") && !$(".tutorial-selector").is(":visible")) {
            $(".modal-container").fadeOut("fast");  
            if (! $('input[type="radio').is(':radio')) {
                $("input").val('');
            }
            if ($(".pass").is(":visible")) {
              $(".user-success").fadeOut("fast");
              getData(cookies,tutorial);
    
            } else {  
              $(".user-success").fadeOut("fast");
              getData(cookies,"complete");
            }
          }
      }       
    });            
  });
});

//filter function for filtering displayed data via input field
function filterFunction() {
  var input, filter, selector, userData;
  input = document.getElementById("searchField");
  filter = input.value.toLowerCase();
  selector = document.getElementsByTagName("section");

  for (i = 0; i < selector.length; i++) {
    getName = selector[i].getElementsByClassName("user-name")[0];
    nameVal = getName.value || getName.innerText;
    if (nameVal.toLowerCase().indexOf(filter) > -1) {
      selector[i].style.display = "";
    } else {
      selector[i].style.display = "none";
    }
    if ($(selector).is(":visible") == false) {
      $("#noData").css("display", "flex");
    } else {
      $("#noData").css("display", "none");
    }
  }
}

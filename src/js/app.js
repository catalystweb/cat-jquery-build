//=require jquery.js

$(window).on("load", function () {
  $("#searchField").val("");
  $("input").val('');
  $("select").val('');  

  //display json data source for block list
  function getBlockData() {
    var localHost = "http://localhost:1352/users/";
    var userBlock = "<option value=''>Select blocked user from list</option>";

    $.ajax({
      url: localHost,
      cache: false,
      data: {},
      dataType: "jsonp",
      success: function (result) {
        $.each(result, function (index, data) {
          if (data.block == "true") {
            userBlock +=
              "<option id='" + data.id + "' value='" + data.name + "'>" + data.name + "</option>";
          }
          $("#block-list").html(userBlock);
        });
        var select = $('#block-list');
        select.html(select.find('option:gt(0)').sort(function(x, y) {
          // to change to descending order switch "<" for ">"
          return $(x).text() > $(y).text() ? 1 : -1;
        }));
        select.prepend("<option value='' selected='true'>Select blocked user from list</option>");
      }
    });
  }
  getBlockData();

  //display json data source for delete list
  function getDelData() {
    var localHost = "http://localhost:1352/users/";
    var userDel =
      "<option value='' selected='true'>Select user from list</option>";

    $.ajax({
      url: localHost,
      cache: false,
      data: {},
      dataType: "jsonp",
      success: function (result) {
        $.each(result, function (index, data) {
          userDel +=
            "<option id='" + data.id + "' value='" + data.name + "'>" + data.name + '</option>';
          $("#del-list").html(userDel);
        });

        var select = $('#del-list');
        select.html(select.find('option:gt(0)').sort(function(x, y) {
          // to change to descending order switch "<" for ">"
          return $(x).text() > $(y).text() ? 1 : -1;
        }));
        select.prepend("<option value='' selected='true'>Select user from list</option>");

      }
    });
  }
  getDelData();

    
  //onclick event handler for api interactions
  $(document).on("click", function (e) {
    var localHost = "http://localhost:1352/users/";
    
    //delete user from json source
    if (e.target.id == "del-button") {
      var userID = $("#del-list").children(":selected").attr("id");  
      $.ajax({
        url: localHost,
        cache: false,
        dataType: "json",
        success: function (result) {
          $.each(result, function (index, data) {              
            if (userID == data.id) {
                var payload = delete data.id;             
              $.ajax({
                url: localHost+userID,
                type: "DELETE",
                dataType: "json", 
                data: payload,               
                contentType: "application/json",
                success: function() {
                  userAddDel() 
                }         
              });
              return;
            }
          });  
        }   
      });
    } 
    //remove user from block list on json source 
    if (e.target.id == "del-block-button") {
      var userID = $("#block-list").children(":selected").attr("id");
      $.ajax({
        url: localHost,
        cache: false,
        dataType: "json",
        success: function (result) {
          $.each(result, function (index, data) {              
            if (userID == data.id) {                
                var payload = { 
                  id: data.id,
                  name: data.name,
                  title: data.title,
                  email: data.email,
                  password: data.password,
                  avatar: data.avatar,
                  extension: data.extension,
                  status: data.status,
                  block: "false" 
                };
              $.ajax({
                url: localHost+userID,
                type: "PUT",
                data: JSON.stringify(payload), 
                dataType: "json",             
                contentType: "application/json",
                success: function() {
                  userAddDel(); 
                }         
              });
              return;
            }
          });  
        }   
      });
    }
    //add user to block list on json source 
    if ($(e.target).hasClass("user-button")) {
        var secID = $(e.target).closest("section").attr("id");
        $.ajax({
          url: localHost,
          cache: false,
          dataType: "json",
          success: function (result) {
            $.each(result, function (index, data) {           
              if (secID == data.id) {      
                if (cookies == "true" && validate == data.password) {
                    $(".user-mod").css("display","none");
                    $("#block-modal, .user-fail").fadeIn("fast");
                    $(".page-container").css("opacity","0.3");
                    setTimeout(function () {
                      $("#block-modal, .user-fail").fadeOut("fast");
                      $(".page-container").css("opacity","1");
                    },2000);
                } else {                               
                    var payload = { 
                      id: data.id,
                      name: data.name,
                      title: data.title,
                      email: data.email,
                      password: data.password,
                      avatar: data.avatar,
                      extension: data.extension,
                      status: data.status,
                      block: "true" 
                    };
                  $.ajax({
                    url: localHost +secID,
                    type: "PUT",
                    data: JSON.stringify(payload), 
                    dataType: "json",             
                    contentType: "application/json",
                    success: function() {
                      $(e.target).closest("section").fadeOut("slow");
                      getBlockData()
                    }         
                  });
                  return false;
                } 
              }            
            }); 
          }              
        });
      } 
  });    

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
          login(null,validate,true);
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
          getData(cookies);
          getDelData();
          getBlockData();

        } else {  
          $(".user-success").fadeOut("fast");
          getData(cookies);
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
          if (e.key === "Escape" && !$("#login-modal").is(":visible")) {
            $(".modal-container").fadeOut("fast");  
            if (! $('input[type="radio').is(':radio')) {
                $("input").val('');
            }
            if ($(".pass").is(":visible")) {
              $(".user-success").fadeOut("fast");
              getData(cookies);
    
            } else {  
              $(".user-success").fadeOut("fast");
              getData(cookies);
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

$(window).on("load", function () {
  $("#searchField").val("");
  $("input").val('');
  $("select").val('');  

  var cookies = Cookies.get('user');
  var theme = Cookies.get('theme');
  var menu = Cookies.get('menu');
  var validate = Cookies.get('validate');

    if (cookies == 'true') {
      if (theme == "dark") {
        $("#dark").prop("checked",true);
        $('link[href="src/css/dark-theme.css"]').prop("disabled", false);
        $('link[href="src/css/light-theme.css"]').prop("disabled", true);
      }  else {
        theme == "light"
        $("#light").prop("checked",true);
        $('link[href="src/css/dark-theme.css"]').prop("disabled", true);
        $('link[href="src/css/light-theme.css"]').prop("disabled", false);
      }
      if (menu == "right") {
        $("#swMenu").attr( 'checked', true )
        $(".arrow-icon").removeClass("arrow-spin-down").addClass("arrow-spin-left");
        $("header").removeClass("slideDown");
      }
      if (validate != null) {
        var localHost = "http://localhost:1352/users/";
            $.ajax({
                url: localHost,
                cache: false,
                data: {},
                dataType: "jsonp",
                success: function (result) {  
                    $.each(result, function (index, data) {
                        if (cookies == 'true') {
                            if (validate == data.password) {
                                  var payload = { 
                                    id: data.id,
                                    name: data.name,
                                    title: data.title,
                                    email: data.email,
                                    password: data.password,
                                    avatar: data.avatar,
                                    status: "online",
                                    block: data.block 
                                  };
                                $.ajax({
                                  url: localHost +data.id,
                                  type: "PUT",
                                  data: JSON.stringify(payload), 
                                  dataType: "json",             
                                  contentType: "application/json",
                                  success: function(result) {
                                    var currentUser = "";
                                    currentUser += "<li class='current-user'>current user: "+ data.name +" </li>";
                                    $(".current-user").replaceWith(currentUser);   
                                    getData("true");
                                  }         
                                });           
                            }
                        }
                    });                  
                }
            });
        } 
    } else {
      $(".side-menu-wrapper").css("height","141px");
      $("#login-modal").fadeIn("fast");
    }

  function getData(cookieVar) {
    var localHost = "http://localhost:1352/users/";
    //hide any existing modal 
    if ($(".modal-container").is(":visible")) {
        $("#del-modal").fadeOut("fast");
        $("#add-modal").fadeOut("fast");
        $("#block-modal").fadeOut("fast");
        $("#edit-modal").fadeOut("fast");
        $(".user-success").fadeOut("fast");
        $(".page-container").css("opacity","1");
    };

    //clear existing field values
    $("input").val('');
    $("select").val('');
    $("#checkbox-state").prop("checked",false);
    if (!$('#swMenu').is(":checked")) { 
        $('input[type=checkbox]').prop('checked',false);
    }
    //global json data source
    var userData = "";
    $.ajax({
      beforeSend: function(){
        $('.spin-wrapper').fadeIn("slow");
      },
        url: localHost,
        cache: false,
        data: {},
        dataType: "jsonp",
        success: function (result) {  
            $.each(result, function (index, data) {                 
                if (data.block !== "true") { 
                  userData +=
                  "<section id=" +
                  data.id +
                  " class='sort-class'>" +
                  '<div class="user-wrapper">' +
                  '<div class="user-container">' +
                  '<div class="user-img-container">' +
                  '<div class="user-avatar ' + data.avatar + '" data-name="' + data.avatar + '"></div >' +
                  '<div class="user-status ' + data.status + '"></div>' +
                  '</div >' +
                  '<div class="user-info"><div>' +
                  '<input class="user-name" data-name="'+ data.name + '" value="' + data.name + '"></input><span class="hideshow display-inline padding-left-10"><i class="fas fa-arrow-left"></i></span>' +
                  '<input class="user-title" value="' + data.title + '"></input>' +
                  '</div>' +
                  '<button class="user-button transition">Block</button>' +
                  "</div>" +
                  "</div>" +
                  "</div>" +
                  "</section>";
                }       
            });
                //apply result to html element
                $(".content-wrapper").html(userData);
                //sort desc by default html element and append
                $(".sort-class").sort(function (a, b) {
                return String.prototype.localeCompare.call(
                    $(a).find("input.user-name").data("name").toLowerCase(),
                    $(b).find("input.user-name").data("name").toLowerCase()
                );
                }).appendTo(".content-wrapper");
                $('.login-container, .spin-wrapper').fadeOut("slow");
                setTimeout(function () {
                  if (cookieVar == "true") {
                    $("li#log-in").css("display","none");
                  } else {
                    $("li#log-out").css("display","none");
                  }
                  $(".header-container").fadeIn("fast");
                  $(".page-container").fadeIn("slow");
                  $(".content-wrapper").fadeIn("slow");
                  $("footer").fadeIn("slow");
                },900);
        },
        error: function () {
            userData = "";
            userData +=
            '<div class="user-nodata" style="height:100%;">' +
            "<strong> error loading external data </strong>" +
            "</div>";
            $(".content-wrapper").html(userData);            
            $(".content-wrapper").fadeIn("slow");
            $("footer").fadeIn("slow");
        }        
    });
  }

  function login(getEmail,getPass,getLogout) {
    //jquery click listener for login modal
      var localHost = "http://localhost:1352/users/"; 
        if (getLogout != true) {
          $.ajax({
              url: localHost,
              cache: false,
              dataType: "json",
              success: function (result) {
                $.each(result, function (index, data) {                     
                    if (getEmail == data.email && getPass == data.password) {
                      Cookies.set('user','true');
                      Cookies.set('validate',''+getPass+'');
                      $("#login-modal").fadeOut("fast");
                      setTimeout(function() {
                        location.reload();
                      },200);
                    }
                    if (cookies != 'true') {
                      $("#login-modal .user-mod").fadeOut("fast");   
                        setTimeout(function() {
                          $("#login-modal .user-fail").fadeIn("fast");
                        },200);
                        setTimeout(function() {
                          location.reload()
                        },2000);
                    }
                });              
              }   
          });  
        } else {    
          $.ajax({
            url: localHost,
            cache: false,
            dataType: "json",
            success: function (result) {   
              $.each(result, function (index, data) {
                    if (getPass == data.password) {
                      console.log("password: " +getPass);
                          var payload = { 
                            id: data.id,
                            name: data.name,
                            title: data.title,
                            email: data.email,
                            password: data.password,
                            avatar: data.avatar,
                            status: "offline",
                            block: data.block 
                          };
                        $.ajax({
                          url: localHost +data.id,
                          type: "PUT",
                          data: JSON.stringify(payload), 
                          dataType: "json",             
                          contentType: "application/json",
                          success: function(result) {
                            Cookies.remove('user');
                            Cookies.remove('theme');
                            Cookies.remove('menu');
                            Cookies.remove('validate');  
                            location.reload();
                          }         
                        });           
                    }                                                                          
                });
              }               
            });
        }
  }
      
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
      }
    });
  }
  getBlockData();

  //display json data source for delete list
  function getDelData() {
    var localHost = "http://localhost:1352/users/";
    var userDel =
      "<option value='' selected='false'>Select user from list</option>";

    $.ajax({
      url: localHost,
      cache: false,
      data: {},
      dataType: "jsonp",
      success: function (result) {
        $.each(result, function (index, data) {
          userDel +=
            "<option id='" + data.id + "' value='" + data.name + "'>" + data.name + "</option>";
          $("#del-list").html(userDel);
        });
      }
    });
  }
  getDelData();

  //show user add or delete successfully modal 
  function userAddDel() {
      $(".user-mod").css("display","none");
      $(".user-success").fadeIn("fast");
      setTimeout(function () {
        $(".content-wrapper").css("display","none");
        $("footer").css("display","none");
        getData(cookies);
        getDelData();
        getBlockData();
      },2000);
  }

  //show user pass after record added
  function userShowPass(Pass) {
    if (Pass != null) {
      $(".user-mod").css("display","none");
      var userPass = "";
      userPass += "<div class='flex pass' style='margin-left:25%;'>" +
                  "<div class='green'>password =  "+Pass+"</div><div class='close transition'>&times;</div>" +
                  "</div>";
      $(".pass").replaceWith(userPass);       
      $(".user-success").fadeIn("fast");
    }
  }


  //update json data when display values changed  
  function userDirectAdd(getClass,getText,getID) {
      var localHost = "http://localhost:1352/users/";
      
      //update json data with new name value
      if (getClass == "user-name") {
        $.ajax({
          url: localHost,
          cache: false,
          dataType: "json",
          success: function (result) {
            $.each(result, function (index, data) {             
              if (getText != data.name) {
                if (getID == data.id) {                
                    var payload = { 
                      id: data.id,
                      name: getText,
                      title: data.title,
                      email: data.email,
                      email: data.password,
                      avatar: data.avatar,
                      status: data.status,
                      block: data.block 
                    };
                  $.ajax({
                    url: localHost +getID,
                    type: "PUT",
                    data: JSON.stringify(payload), 
                    dataType: "json",             
                    contentType: "application/json",
                    success: function(result) {
                      $("#edit-modal").fadeIn("fast");
                      $(".page-container").css("opacity","0.3");
                      userAddDel()
                    }         
                  });
                  return
                }
              }
            });  
          }   
        });
      
      //update json data with new title value
      } else {
        $.ajax({
          url: localHost,
          cache: false,
          dataType: "json",
          success: function (result) {
            $.each(result, function (index, data) {    
              if (getText != data.title) {          
                if (getID == data.id) {                
                    var payload = { 
                      id: data.id,
                      name: data.name,
                      title: getText,
                      email: data.email,
                      password: data.password,
                      avatar: data.avatar,
                      status: data.status,
                      block: data.block 
                    };
                  $.ajax({
                    url: localHost +getID,
                    type: "PUT",
                    data: JSON.stringify(payload), 
                    dataType: "json",             
                    contentType: "application/json",
                    success: function() {
                      $("#add-modal").fadeIn("fast");
                      $(".page-container").css("opacity","0.3");
                      userAddDel()
                    }         
                  });
                  return;
                }
              }
            });  
          }   
        });   
      }
  }

  //add or edit data from submit button to json source
  function userAddEdit(getName,getID) {
    var localHost = "http://localhost:1352/users/";    
    
    //update json data with new avatar value 
    if (getName != null) {
      var editAvatar = $("#edit-avatar option:selected").val(); 
      $.ajax({
        url: localHost,
        cache: false,
        dataType: "json",
        success: function (result) {
          $.each(result, function (index, data) { 
            if (getID == data.id) {
                var payload = { 
                  id: data.id,
                  name: data.name,
                  title: data.title,
                  email: data.email,
                  password: data.password,
                  avatar: editAvatar,
                  status: data.status,
                  block: data.block 
                };
              $.ajax({
                url: localHost +getID,
                type: "PUT",
                data: JSON.stringify(payload), 
                dataType: "json",             
                contentType: "application/json",
                success: function(result) {
                  $("#add-modal").fadeIn("fast");
                  $(".page-container").css("opacity","0.3");
                  userAddDel()
                }         
              });                    
              return  
            } 
          });            
        }
      });
    
    //add new record to json data 
    } else {            
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(99999));
      }      
      var dataName = $("#add-name").val();
      var dataTitle = $("#add-title").val();
      var dataEmail = $("#add-email").val();
      var dataAvatar = $("#add-avatar option:selected").val();     
      var dataPass = getRandomInt(9999);      
      var payload = {
          name: dataName,
          title: dataTitle,
          email: dataEmail,
          password: ""+dataPass+"",
          avatar: dataAvatar,
          status: "offline",
          block: "false"
      };
      $.ajax({
          url: localHost,
          type: "POST",
          data: JSON.stringify(payload),
          dataType: "json",
          contentType: "application/json",
          success: function() {
            userShowPass(dataPass);
          }
      });      
    }
  }    
  
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
                if (validate != data.password) {              
                    var payload = { 
                      id: data.id,
                      name: data.name,
                      title: data.title,
                      email: data.email,
                      password: data.password,
                      avatar: data.avatar,
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
                  return;
                } else {
                  $(".user-mod").css("display","none");
                  $("#block-modal, .user-fail").fadeIn("fast");
                  $(".page-container").css("opacity","0.3");
                  setTimeout(function () {
                    $("#block-modal, .user-fail").fadeOut("fast");
                    $(".page-container").css("opacity","1");
                  },2000);
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
    userDirectAdd(classVal,textVal,idVal);
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
    //add button callback
    if (e.target.id == "add-button") {
      userAddEdit(null,null);
    }

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
        $(".modal-container").fadeOut("fast");  
        if (! $('input[type="radio').is(':radio')) {
            $("input").val('');
        }
        if ($(".pass").is(":visible")) {
          $(".user-success").fadeOut("fast");
          $(".content-wrapper").css("display","none");
          $("footer").css("display","none");
          getData(cookies);

        } else {  
          $(".user-success").fadeOut("fast");
          getData(cookies);
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

    //avatar edit display
    if ($(e.target).hasClass("user-avatar")) {
      var dataName = $(e.target).parent().next("div").find(".user-name").data("name");
      var dataID = $(e.target).parent().parent().parent().parent("section").attr("id");
      $("#edit-modal").fadeIn("fast");
      $(".user-mod").fadeIn("fast");
      $(".page-container").css("opacity","0.3");
      $("#edit-avatar").on("change", function () {  
        if ($("#edit-avatar option").filter(":selected").text() != "Select Avatar") {
          $("#edit-button").fadeIn("fast");
          $("#edit-button").on("click", function () {
            userAddEdit(dataName,dataID);
          });
        }
      });   
    }          
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

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
              if (cookies == "true" && validatepass == data.password) {
                $(".user-mod").css("display","none");
                $("#block-modal, .user-fail").fadeIn("fast");
                $(".page-container").css("opacity","0.3");
                setTimeout(function () {
                  $("#block-modal, .user-fail").fadeOut("fast");
                  $("#del-modal").fadeOut("fast");
                  $(".page-container").css("opacity","1");
                },2000);
              } else {      
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
                return false;
              }
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
                if (cookies == "true" && validatepass == data.password) {
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
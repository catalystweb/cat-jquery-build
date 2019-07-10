  //update json data when display values changed  
  function userDirectEdit(getClass,getText,getID) {
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
                      password: data.password,
                      avatar: data.avatar,
                      extension: data.extension,
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
                      extension: data.extension,
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
                      $("#edit-modal").fadeIn("fast");
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
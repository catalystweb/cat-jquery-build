
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
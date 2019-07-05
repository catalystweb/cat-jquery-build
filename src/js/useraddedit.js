 //add or edit data from submit button to json source
  function userAddEdit(getName,getID,getCustom) {
    var localHost = "http://localhost:1352/users/";     
    //update json data with new avatar value 
    console.log(getName);
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
    }
    //add new record to json data 
    if (getName == null && getID == null) {          
      function getRandomInt() {
        return Math.floor(Math.random() * Math.floor(99999));
      }      
        var dataName = $("#add-name").val();
        var dataTitle = $("#add-title").val();
        var dataEmail = $("#add-email").val();
        if (getCustom == "") {
          var dataAvatar = $("#add-avatar option:selected").val();    
        } else {
          var dataAvatar = getCustom
        } 
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
              $("#add-avatar-ul").val("");
              $("#edit-avatar-ul").val("");
              $(".black-icon").fadeOut("fast");
              userShowPass(dataPass);
            }
        });  
        return false;   
    }    
  }


  function precursor(getFileName,getName) {
    console.log("precursor id: " +getName);
    console.log("precursor: " +getFileName);
    $("#add-button, #edit-button").on("click", function (e) {
      if (getName != null) {
        userAddEdit(getName,null,getFileName);        
        return false;
      } else {
        userAddEdit(null,null,getFileName);        
        return false;
      }  
    });
  }

//click event handler with callback dependancies
$(document).on("click", function (e) {

    if (e.target.id == "add-button") {
      console.log("add-button-no-precursor");
      userAddEdit(null,null,"");
    }

    //hide show custom avatar button 
    if (e.target.id == "add-avatar-ul") {
        $("#"+e.target.id+"").on("change", function () {  
            if($("#"+e.target.id+"").val()) { // returns true if the string is not empty
                var file = $("#"+e.target.id+"")[0].files[0];
                var upload = new Upload(file);
                upload.doUpload(e.target.id);
            } else { // no file was selected
                $("#"+e.target.id+"").val('');
                $(".black-icon").fadeOut("fast");
                $("#add-avatar").removeClass("silver");
                $('#add-avatar').prop("disabled", false);
            }
        });
    }

    //avatar edit display
    if ($(e.target).hasClass("user-avatar")) {
      var dataName = $(e.target).parent().next("div").find(".user-name").data("name");
      var dataID = $(e.target).parent().parent().parent().parent("section").attr("id");
      $("#edit-modal").fadeIn("fast");
      $(".user-mod").fadeIn("fast");
      $(".page-container").css("opacity","0.3");
      $("#edit-avatar-ul").on("change", function () {  
        if($("#edit-avatar-ul").val()) { // returns true if the string is not empty
            var file = $("#edit-avatar-ul")[0].files[0];
            var upload = new Upload(file);
            upload.doUpload(dataName);
            $("#edit-button").fadeIn("fast");
        } else { // no file was selected
            $(".black-icon").fadeOut("fast");
            $("#edit-button").fadeOut("fast");
            $('#edit-avatar').prop("disabled", false);
        }
      });
      $("#edit-avatar").on("change", function () {  
        if ($("#edit-avatar option").filter(":selected").text() != "Use example Avatar") {
          $(".black-icon").fadeOut("fast");
          $("#edit-button").fadeIn("fast");
          $("#edit-button").on("click", function () {
            userAddEdit(dataName,dataID);
          });
        } else {
          $("#edit-button").fadeOut("fast");
        }
      });   
    }  
});
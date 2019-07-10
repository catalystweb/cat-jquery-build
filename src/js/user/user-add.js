 //add data from submit button to json source
  function userAdd(getCustom,getCustomExt) {
    var localHost = "http://localhost:1352/users/";     
    //add new record to json data         
      function getRandomInt() {
        return Math.floor(Math.random() * Math.floor(99999));
      }      
        var dataName = $("#add-name").val();
        var dataTitle = $("#add-title").val();
        var dataEmail = $("#add-email").val();
        console.log("new value");
        if (getCustom == null) {
          var dataAvatar = $("#add-avatar option:selected").val();   
          var dataExtension = "jpg" 
        } else {
          dataAvatar = getCustom
          dataExtension = getCustomExt
        } 
        var dataPass = getRandomInt(9999);      
        var payload = {
            name: dataName,
            title: dataTitle,
            email: dataEmail,
            password: ""+dataPass+"",
            avatar: dataAvatar,
            extension: dataExtension,
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

function userEdit(getCustom,getCustomExt,getID) {
  var localHost = "http://localhost:1352/users/"; 
  //update json data with new avatar value 
    if (getCustom == null) {
      var editAvatar = $("#edit-avatar option:selected").val();   
      var editExtension = "jpg" 
    } else {
      editAvatar = getCustom
      editExtension = getCustomExt
    } 
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
                extension: editExtension,
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
                userAddDel(null)
              }         
            });                    
            return false; 
          } 
        });            
      }
    });  
}

function precursor(getFileName,getFileExt,getID) {
  //precursor to fire function with parameters from file upload once submit button clicked 
  $("#add-button").on("click", function (e) {
      if ($("#add-avatar option").filter(":selected").text() == "Use example Avatar") {
        userAdd(getFileName,getFileExt);
      }        
  });
  $("#edit-button").on("click", function (e) {
      if ($("#edit-avatar option").filter(":selected").text() == "Use example Avatar") {
        userEdit(getFileName,getFileExt,getID);
      }        
  });
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

//click event handler with callback dependancies
$(document).on("click", function (e) {

    //add user submit button 
    if (e.target.id == "add-button") {
      if ($("#add-avatar option").filter(":selected").text() != "Use example Avatar") {
        $("#add-avatar-ul").val('');
        userAdd();
      }    
    }

    //hide show custom avatar button 
    if (e.target.id == "add-avatar-ul") {
        $("#"+e.target.id+"").on("change", function () {  
            if($("#"+e.target.id+"").val()) { // returns true if the string is not empty
                var file = $("#"+e.target.id+"")[0].files[0];
                var upload = new Upload(file);
                upload.doUpload();
            } else { // no file was selected
                $("#"+e.target.id+"").val('');
                $(".black-icon").fadeOut("fast");
                $("#add-avatar").removeClass("silver");
                $('#add-avatar').prop("disabled", false);
            }
        });
    }

    //avatar direct edit display
    if ($(e.target).hasClass("user-avatar")) {
      //var dataName = $(e.target).parent().next("div").find(".user-name").data("name");
      var dataID = $(e.target).parent().parent().parent().parent("section").attr("id");
      $("#edit-modal").fadeIn("fast");
      $(".user-mod").fadeIn("fast");
      $(".page-container").css("opacity","0.3");
      $("#edit-avatar-ul").on("change", function () {  
        if($("#edit-avatar-ul").val()) { // returns true if the string is not empty
            var file = $("#edit-avatar-ul")[0].files[0];
            var upload = new Upload(file);
            console.log("upload: " +dataID);
            upload.doUpload(dataID);
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
            userEdit(null,null,dataID);
          });
        } else {
          $("#edit-button").fadeOut("fast");
        }
      });   
    }  
});

// prevent enter key creating new line for contenteditable attribute //
$(document).on("keypress", ".user-name, .user-title", function(e) {
  if (e.which == 13) {
    e.preventDefault();
    $(this).blur();
  }
});

// update json data when contenteditable values changed //
$(document).on("blur", ".user-name, .user-title", function() {
  var this_class = $(this).attr("class");
  console.log("this class: " + this_class);

  if (this_class == "user-name") {
    var dataID = $(this).closest("section").attr("id");
    var dataName = $(this).text();

    console.log("section id: " + dataID);
    console.log("name: " + dataName);

    $.ajax({
      url: localHost,
      cache: false,
      dataType: "json",
      success: function (result) {
        $.each(result, function (index, data) {              
          if (dataID == data.id) {                
              var payload = { 
                id: data.id,
                name: dataName,
                title: data.title,
                avatar: data.avatar,
                status: data.status,
                block: data.block 
              };
            $.ajax({
              url: localHost +dataID,
              type: "PUT",
              data: JSON.stringify(payload), 
              dataType: "json",             
              contentType: "application/json",
              success: function(result) {
                getData()
              }         
            });
            return;
          }
        });  
      }   
    });
  } else {
    var dataID = $(this).closest("section").attr("id");
    var dataTitle = $(this).text();

    console.log("section id: " + dataID);
    console.log("title: " + dataTitle);

    $.ajax({
      url: localHost,
      cache: false,
      dataType: "json",
      success: function (result) {
        $.each(result, function (index, data) {              
          if (dataID == data.id) {                
              var payload = { 
                id: data.id,
                name: data.name,
                title: dataTitle,
                avatar: data.avatar,
                status: data.status,
                block: data.block 
              };
            $.ajax({
              url: localHost +dataID,
              type: "PUT",
              data: JSON.stringify(payload), 
              dataType: "json",             
              contentType: "application/json",
              success: function(result) {
                getData()
              }         
            });
            return;
          }
        });  
      }   
    });   
  }
});

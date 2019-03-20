//this code will be used when node.js script configured to allow writing to json file //

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
    var dataID = $(this)
      .closest("section")
      .attr("id");
    var dataName = $(this).text();
    var dataTitle = $(this).text();

    console.log("section id: " + dataID);
    console.log("name: " + dataName);

    $.ajax({
      url: "https://catalystweb.github.io/json/json/data.json",
      cache: false,
      data: {},
      dataType: "json",
      success: function(result) {
        $.each(result, function(index, data) {
          console.log("data id: " + dataID);
          if (data.id == dataID) {
            $.post(
              "src/json/data.json",
              JSON.stringify({ name: +dataName }),
              function(result) {
                console.log("new data name: " + data.name);
              }
            );
          }
        });
      }
    });
  } else {
    var dataID = $(this)
      .closest("section")
      .attr("id");
    var dataTitle = $(this).text();

    console.log("section id: " + dataID);
    console.log("title: " + dataTitle);

    $.ajax({
      url: "http://localhost:3000/users",
      cache: false,
      data: {},
      dataType: "json",
      success: function (result) {
        $.each(result, function(index, data) {
          console.log("data id: " + dataID);
          if (data.id == dataID) {
            $.post(
              "src/json/data.json",
              JSON.stringify({ title: +dataTitle }),
              function(result) {
                console.log("success:");
              }
            );
          }
        });
      }
    });    
  }
});

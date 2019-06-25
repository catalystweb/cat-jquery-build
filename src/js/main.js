$(window).on("load", function () {
  $("#searchField").val("");

  function getData() {
    var localHost = "http://localhost:1352/users/";
      //hide any existing modal 
      if ($(".modal-container").is(":visible")) {
        $("#del-modal").fadeOut("fast");
        $("#add-modal").fadeOut("fast");
        $("#block-modal").fadeOut("fast");
        $(".user-success").fadeOut("fast");
        $(".page-container").css("opacity", "1");
      };

      //clear existing field values
      $("input").val('');
      $("select").val('');
      $('input[type=checkbox]').prop('checked',false);

      //global json data source
      var userData = "";
      userData +=
        '<div class="user-nodata" style="height:100%;">' +
        "<strong> loading data </strong>" +
        "</div>";
      $(".content-wrapper").html(userData);      

      $.ajax({
        url: localHost,
        cache: false,
        data: {},
        dataType: "jsonp",
          success: function (result) {  
              userData = "";
              $.each(result, function (index, data) {
                if (data.block !== "true") { 
                  userData +=
                    "<section id=" +
                    data.id +
                    " class='sort-class'>" +
                    '<div class="user-wrapper">' +
                    '<div class="user-container">' +
                    '<div class="user-img-container">' +
                    '<div class="user-avatar ' +
                    data.avatar +
                    '"></div >' +
                    '<div class="user-status ' +
                    data.status +
                    '"></div>' +
                    "</div >" +
                    '<div class="user-info">' +
                    "<div>" +
                    '<div class="user-name" data-name="' +
                    data.name +
                    '" contenteditable="true">' +
                    data.name +
                    "</div>" +
                    '<div class="user-title" contenteditable="true">' +
                    data.title +
                    "</div>" +
                    "</div>" +
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
                    $(a).find("div.user-name").data("name").toLowerCase(),
                    $(b).find("div.user-name").data("name").toLowerCase()
                  );
                }).appendTo(".content-wrapper");
                //fade in elements
                $(".content-wrapper").fadeIn("slow");
                $("footer").fadeIn("slow");
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
  getData();

  //display json data source for block list
  function getBlockData() {
    var localHost = "http://localhost:1352/users/";
    var userBlock = "<option value=''>Select blocked user from list</option>";

    $.ajax({
      url: localHost,
      cache: false,
      data: {},
      dataType: "json",
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
      getData();
      getDelData();
      getBlockData();
    },2000);
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
                success: function(result) {
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
                success: function(result) {
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
      $(e.target).closest("section").fadeOut("slow");
      var secID = $(e.target).closest("section").attr("id");
      $.ajax({
        url: localHost,
        cache: false,
        dataType: "json",
        success: function (result) {
          $.each(result, function (index, data) {              
            if (secID == data.id) {                
                var payload = { 
                  id: data.id,
                  name: data.name,
                  title: data.title,
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
                success: function(result) {
                  getBlockData()
                }         
              });
              return;
            }
          });  
        }   
      });
    } 
    //add data from submit button to json source
    if (e.target.id == "add-button") {
      var dataName = $("#add-name").val();
      var dataTitle = $("#add-title").val();
      var dataAvatar = $("#add-avatar option:selected").val();           
      var payload = {
        name: dataName,
        title: dataTitle,
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
        success: function(result) {
          userAddDel()
        }
      });      
    }     
  }); 

  //logo hover event handler 
  $(".logo").hover(function (e) {
      $(".catalyst").animate({width: 'toggle'});
  });

  //global click event handler
  $(document).on("click", function (e) {
    if (e.target.id == "add-user") {
      $(".modal-container").fadeOut("fast");
      $("#add-modal").fadeIn("fast");
      $(".user-mod").fadeIn("fast");
      $(".page-container").css("opacity", "0.3");

    }
    if (e.target.id == "del-user") {
      $(".modal-container").fadeOut("fast");
      $("#del-modal").fadeIn("fast");
      $(".user-mod").fadeIn("fast");
      $(".page-container").css("opacity", "0.3");
    }
    if (e.target.id == "block-user") {
      $(".modal-container").fadeOut("fast");
      $("#block-modal").fadeIn("fast");
      $(".user-mod").fadeIn("fast");
      $(".page-container").css("opacity", "0.3");
    }
    if (e.target.id == "change-theme") {
      $(".modal-container").fadeOut("fast");
      $("#change-theme").fadeIn("fast");
      $(".page-container").css("opacity", "0.3");
    }
    if (e.target.id == "submit-theme") {
      if ($("#dark").is(":checked")) {
        $('link[href="src/css/dark-theme.css"]').prop("disabled", false);
        $('link[href="src/css/light-theme.css"]').prop("disabled", true);
      } else {
        $('link[href="src/css/dark.theme.css"]').prop("disabled", true);
        $('link[href="src/css/light-theme.css"]').prop("disabled", false);
      }
      if ($('#swMenu').is(":checked")) {        
        $(".arrow-icon").removeClass("arrow-spin-down").addClass("arrow-spin-left");
        $("header").removeClass("slideDown");
      } else {
        $(".side-menu-wrapper").toggleClass("slideIn");
        $(".arrow-icon").removeClass("arrow-spin-left").addClass("arrow-spin-down");
        $("header").addClass("slideDown");
      }
      $("#change-theme").fadeOut("fast");
      $(".page-container").css("opacity", "1");
    }  

    //add modal display
    if (e.target.id == "add-user") {
      if ($("#add-button").is(":visible")) {
        $("#add-button").css("display","none");
      }
      $(this).on("input", function () {  
        $("#add-modal input[type='text']").bind("keyup change", function () {
              if ($("#add-name").val() != "" && $("#add-title").val() != "") {
                $("button").prop("disabled", false);
                $("#add-button").fadeIn("fast");
              } else {
                $("button").prop("disabled", true);
                $("#add-button").fadeOut("fast");
              }
        });
      });      
    }

    //block modal display
    if (e.target.id == "block-user") {
      if ($("#del-block-button").is(":visible")) {
        $("#del-block-button").css("display","none");
      }
      $("#block-list").on("change", function () {  
        if ($("#block-list option").filter(":selected").text() != "Select blocked user from list") {
          $("#del-block-button").fadeIn("fast");
        } else {
          $("#del-block-button").fadeOut("fast");
        }
      });
    }

    //delete modal display
    if (e.target.id == "del-user") {
      if ($("#confirm-del").is(":visible")) {
        $("#confirm-del").css("display","none");
        $("#del-button").css("display","none");
      }
      $("#del-list").on("change", function () {  
        if ($("#del-list option").filter(":selected").text() != "Select user from list") {
          $("#confirm-del").fadeIn("fast");
        } else {
          $("#confirm-del").fadeOut("fast");
          $("#checkbox-state").prop("checked",false);
          $("#del-button").fadeOut("fast");
        }
      });
    }

    if (e.target.id == "checkbox-state") {
      if ($("#checkbox-state").prop("checked") == true) {
        $("#del-button").fadeIn("fast");
      } else {
        $("#del-button").fadeOut("fast");
      }
    }

    //close statement if user clicks close icon
    if (e.target.classList[0] == "close") {
      $(".modal-container").fadeOut("fast");
      if (! $('input[type="radio').is(':radio')) {
        $("input").val('');
      }
      $("select").val('');
      $(".page-container").css("opacity", "1");
    }

    //arrow spin style for sorting
    if (e.target.classList[0] == "arrow-icon") {
      if ($(".side-menu-wrapper").is(":visible")) {
        $("#del-modal").fadeOut("fast");
        $("#add-modal").fadeOut("fast");
        $("#block-modal").fadeOut("fast");
        $(".user-success").fadeOut("fast");
      }
      if ($('#swMenu').is(":checked")) {
        if ($(".arrow-spin-left").is(":visible")) {
          $(".side-menu-wrapper").css("display","flex");
          $(".side-menu-wrapper").toggleClass("slideIn");
          $(".arrow-icon").removeClass("arrow-spin-left").addClass("arrow-spin-right");
          $(".page-container").css("opacity", "0.3");
        } else {
          $(".side-menu-wrapper").toggleClass("slideIn");
          $(".arrow-icon").removeClass("arrow-spin-right").addClass("arrow-spin-left");
          $(".page-container").css("opacity", "1");
          setTimeout(function () {
            $(".side-menu-wrapper").css("display","none");
          }, 500);
        }
      } else {
        if ($("header").hasClass("slideDown")) {
          $("header").removeClass("slideDown");
          $(".arrow-icon").removeClass("arrow-spin-down").addClass("arrow-spin-up");
        } else {
          $("header").addClass("slideDown");
          $(".arrow-icon").removeClass("arrow-spin-up").addClass("arrow-spin-down");
        }
      }
    }
    if (e.target.classList[0] == "sort" || e.target.classList.contains('arrow-sort')) {
      if ($(".arrow-sort").hasClass("arrow-spin-down")) {
        $(".arrow-sort").removeClass("arrow-spin-down");
        $(".arrow-sort").addClass("arrow-spin-up");
      } else {
        $(".arrow-sort").removeClass("arrow-spin-up");
        $(".arrow-sort").addClass("arrow-spin-down");
      }
    }

    // call sort function for asc and desc on click event    
    if (e.target.classList[0] == "sort" || e.target.classList.contains('arrow-sort')) {
      var getStateVal = document.getElementsByClassName("sort-list")[0].id;    
      $(".sort-class").sort(function (a, b) {
          if (getStateVal == "sort-asc") {
            document.getElementsByClassName("sort-list")[0].id = "sort-des";
            return String.prototype.localeCompare.call(
              $(a).find("div.user-name").data("name").toLowerCase(),
              $(b).find("div.user-name").data("name").toLowerCase()
            );
          } else {
            document.getElementsByClassName("sort-list")[0].id = "sort-asc";
            return String.prototype.localeCompare.call(
              $(b).find("div.user-name").data("name").toLowerCase(),
              $(a).find("div.user-name").data("name").toLowerCase()
            );
          }
        }).appendTo(".content-wrapper");
    }    
  });

  //key function if menu open close during filter function
  $(document).keyup(function (e) {
    if (e.target.id == "searchField") {
      if ($("header").hasClass("slideDown")) {
        $("header").removeClass("slideDown");
        $(".arrow-icon").removeClass("arrow-spin-down").addClass("arrow-spin-up");
      }
    }
    if ($(".modal-container").is(":visible")) {
      if (e.key === "Escape") {
        $(".modal-container").fadeOut("fast");
        if (! $('input[type="radio').is(':radio')) {
          $("input").val('');
        }
        $("select").val('');
        $(".page-container").css("opacity", "1");
      }
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
    nameVal = getName.textContent || getName.innerText;
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

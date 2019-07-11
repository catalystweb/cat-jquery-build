function getData(cookieVar,tutorialVar) {
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
    $("#edit-avatar-ul").val('');
    $("#add-avatar-ul").val('');
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
                  '<div class="user-avatar show-avatar" data-name=' + data.avatar +' style="background-image: url(img/'+ data.avatar + '.' +data.extension +');"></div >' +
                  '<div class="user-status ' + data.status + '"></div>' +
                  '</div >' +
                  '<div class="user-info">' +
                  '<div class="user-info-child">' +
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
                  if (tutorialVar != "complete") {
                    $("#welcome-modal").fadeIn("fast");
                    $(".page-container").css("opacity","0.3");
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

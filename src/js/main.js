$(window).on("load", function() {
  // Get json data and render divs //
  var userData = "";
  $.getJSON("src/json/data.json", function(result) {
    $.each(result, function(index, data) {
      // console.log(data);
      userData +=
        "<section id=" +
        data.id +
        ">" +
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
        '<div class="user-name" contenteditable="true">' +
        data.name +
        "</div>" +
        '<div class="user-title" contenteditable="true">' +
        data.title +
        "</div>" +
        "</div>" +
        '<button class="user-button">Block</button>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</section>";
    });
    $(".content-wrapper").html(userData);
  });

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

      $.getJSON("src/json/data.json", function(result) {
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
      });
    } else {
      var dataID = $(this)
        .closest("section")
        .attr("id");
      var dataTitle = $(this).text();

      console.log("section id: " + dataID);
      console.log("title: " + dataTitle);

      $.getJSON("src/json/data.json", function(result) {
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
      });
    }
  });
});

  $(document).on("click", "nav", function() {
    if ($("header").hasClass("slideDown")) {
      $("header")
        .removeClass("slideDown")
        .addClass("slideUp");
      $(".arrow-icon")
        .removeClass("arrow-spin-down")
        .addClass("arrow-spin-up");
    } else {
      $("header")
        .removeClass("slideUp")
        .addClass("slideDown");
      $(".arrow-icon")
        .removeClass("arrow-spin-up")
        .addClass("arrow-spin-down");
    }
  });
});

function filterFunction() {
  var input, filter, selector, userData;
  input = document.getElementById("searchField");
  filter = input.value.toUpperCase();
  selector = document.getElementsByTagName("section");
  for (i = 0; i < selector.length; i++) {
    getName = selector[i].getElementsByClassName("user-name")[0];
    nameVal = getName.textContent || getName.innerText;
    if (nameVal.toUpperCase().indexOf(filter) > -1) {
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

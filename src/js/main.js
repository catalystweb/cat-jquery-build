$(window).on("load", function() {
  // Get json data and render divs //
  if ($("header").hasClass("slideDown")) {
    $("header").css("min-height", "191");
  }
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
        '<div class="user-name">' +
        data.name +
        "</div>" +
        '<div class="user-title">' +
        data.title +
        "</div>" +
        "</div>" +
        '<button class="user-button transition">Block</button>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</section>";
    });
    $(".content-wrapper").html(userData);
  });

  $(document).on("click", ".arrow-icon", function() {
    if ($("header").hasClass("slideDown")) {
      $("header").removeClass("slideDown");
      $(".arrow-icon")
        .removeClass("arrow-spin-down")
        .addClass("arrow-spin-up");
    } else {
      $("header").addClass("slideDown");
      $(".arrow-icon")
        .removeClass("arrow-spin-up")
        .addClass("arrow-spin-down");
    }
  });

  $(document).click(function(e) {
    if (e.target.id == "add-user") {
      $("#add-modal").fadeIn("fast");
      $(".page-container").css("opacity", "0.3");
    }
    if (e.target.id == "del-user") {
      $("#del-modal").fadeIn("fast");
      $(".page-container").css("opacity", "0.3");
    }
    if (e.target.id == "block-user") {
      $("#block-modal").fadeIn("fast");
      $(".page-container").css("opacity", "0.3");
    }
    if (e.target.id == "change-theme") {
      $("#change-theme").fadeIn("fast");
      $('input[type="radio"]').prop("checked", false);
      $(".page-container").css("opacity", "0.3");
    }
    if (e.target.id == "submit-theme") {
      if ($("#dark").is(":checked")) {
        $('link[href="src/css/dark-theme.css"]').prop("disabled", false);
        $('link[href="src/css/light-theme.css"]').prop("disabled", true);
      } else {
        $('link[href="src/css/dark-theme.css"]').prop("disabled", true);
        $('link[href="src/css/light-theme.css"]').prop("disabled", false);
      }
    }
    if (e.target.classList[0] == "close") {
      $(".modal-container").fadeOut("fast");
      $(".page-container").css("opacity", "1");
    }
  });

  $(document).keyup(function(e) {
    if (e.target.id == "searchField") {
      if ($("header").hasClass("slideDown")) {
        $("header").removeClass("slideDown");
        $(".arrow-icon")
          .removeClass("arrow-spin-down")
          .addClass("arrow-spin-up");
      }
    }
    if ($(".modal-container").is(":visible")) {
      if (e.key === "Escape") {
        $(".modal-container").fadeOut("fast");
        $(".page-container").css("opacity", "1");
      }
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

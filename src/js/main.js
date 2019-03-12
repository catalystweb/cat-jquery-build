$(window).on("load", function() {
  $("#searchField").val("");

  // set listener for window height change //
  $(window).resize(function() {
    $("header").trigger("heightChange");
  });

  // trigger change to header height for resize //
  $("header").bind("heightChange", function() {
    if ($("header").hasClass("slideDown")) {
      $("header").css("min-height", "191px");
    } else {
      $("header").css("min-height", "60px");
    }
  });

  var userData = "";
  var sectionId = $("section").attr("id");

  $.ajax({
    url: "https://catalystweb.github.io/json/json/data.json",
    cache: false,
    data: {},
    dataType: "json",
    success: function(result) {
      $.each(result, function(index, data) {
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
          '">' +
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
    }
  });

  var userBlock = "<option value=''> Select blocked user from list</option>";

  $.ajax({
    url: "https://catalystweb.github.io/json/json/data.json",
    cache: false,
    data: {},
    dataType: "json",
    success: function(result) {
      $.each(result, function(index, data) {
        if (data.block == "true") {
          userBlock +=
            "<option value=" + data.name + ">" + data.name + "</option>";
        }
        $("#block-list").html(userBlock);
      });
    }
  });

  var userDel = "<option value=''> Select user from list</option>";

  $.ajax({
    url: "https://catalystweb.github.io/json/json/data.json",
    cache: false,
    data: {},
    dataType: "json",
    success: function(result) {
      $.each(result, function(index, data) {
        userDel += "<option value=" + data.name + ">" + data.name + "</option>";

        $("#del-list").html(userDel);
      });
    }
  });

  $("#del-list option").each(function() {
    if ($(this).is(":selected")) {
      $("#confirm-del").css("display", "block");
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

    if (e.target.id == "confirm-del") {
      $("#del-button").fadeIn("fast");
    }

    if (e.target.classList[0] == "close") {
      $(".modal-container").fadeOut("fast");
      $(".page-container").css("opacity", "1");
    }

    if (e.target.classList[0] == "arrow-icon") {
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
    }
    if (e.target.classList[0] == "arrow-sort") {
      if ($(".arrow-sort").hasClass("arrow-spin-down")) {
        $(".arrow-sort").removeClass("arrow-spin-down");
        $(".arrow-sort").addClass("arrow-spin-up");
      } else {
        $(".arrow-sort").removeClass("arrow-spin-up");
        $(".arrow-sort").addClass("arrow-spin-down");
      }
    }
    if (e.target.classList[0] == "arrow-sort") {
      var getStateVal = document.getElementsByClassName("sort-list")[0].id;
      var alphabeticallyOrderedDivs = $(".sort-class")
        .sort(function(a, b) {
          if (getStateVal == "sort-asc") {
            document.getElementsByClassName("sort-list")[0].id = "sort-des";
            return String.prototype.localeCompare.call(
              $(a)
                .find("div.user-name")
                .data("name")
                .toLowerCase(),
              $(b)
                .find("div.user-name")
                .data("name")
                .toLowerCase()
            );
          } else {
            document.getElementsByClassName("sort-list")[0].id = "sort-asc";
            return String.prototype.localeCompare.call(
              $(b)
                .find("div.user-name")
                .data("name")
                .toLowerCase(),
              $(a)
                .find("div.user-name")
                .data("name")
                .toLowerCase()
            );
          }
        })
        .appendTo(".content-wrapper");
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

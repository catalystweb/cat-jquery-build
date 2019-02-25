$(window).on("load", function() {
  var userData = "";

  $.getJSON("src/json/data.json", function(result) {
    $.each(result, function(index, data) {
      console.log("result: " + data.name);
      userData +=
        "<section>" +
        '<div class="user-wrapper" >' +
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
        '<div class="user-name">' +
        data.name +
        "</div>" +
        '<div class="user-title">' +
        data.title +
        "</div>" +
        "</div>" +
        '<button class="user-button">Block</button>' +
        "</div>" +
        "</div>" +
        "</section>";
    });
    $(".content-wrapper").html(userData);
  });
});

function filterFunction() {
  var input, filter, selector;
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
  }
}

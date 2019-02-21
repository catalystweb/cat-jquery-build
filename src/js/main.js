$(document).ready(function() {
  var dataSource = "https://catalystweb.github.io/test/json/data.json";
  $.ajax({
    type: "GET",
    url: dataSource,
    data: "{}",
    contentType: "application/json; charset=utf-8",
    dataType: "jsonp",
    crossDomain: true,
    cache: false,
    success: function(index, data) {
      var userData = "";

      $.each(data, function(i) {
        console.log(data);
        '<div class="user-img-container">' +
          '<div class="user-avatar ' +
          data.avatar[i] +
          '"></div >' +
          '<div class="user-status ' +
          data.status[i] +
          '"></div>' +
          "</div >" +
          '<div class="user-info">' +
          '<div class="user-name">' +
          data.name[i] +
          "</div>" +
          '<div class="user-title">' +
          data.title[i] +
          "</div>" +
          "</div>" +
          '<button class="user-button">Block</button>';
      });
      $("#user-container").append(userData);
    },
    error: function(msg) {
      alert(msg.responseText);
    }
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
});

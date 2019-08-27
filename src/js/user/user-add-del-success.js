console.log("user-add-del-success.js loaded"); 
  //show user add or delete successfully modal 
  function userAddDel(fileupload) {
      $(".user-mod").css("display","none");
      $(".user-success").fadeIn("fast");
      setTimeout(function () {
        $(".content-wrapper").css("display","none");
        $("footer").css("display","none");
        if(fileupload == true) {
          var tenSecs = new Date(new Date().getTime() + 0.2 * 60 * 1000);
          Cookies.set('fileuploaded','true', {
            expires: tenSecs
          });
          location.reload();
        } else {
          getData(cookies,tutorial);
          getDelData();
          getBlockData();
        }
      },2000);
  }
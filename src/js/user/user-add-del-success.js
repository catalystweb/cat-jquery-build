  //show user add or delete successfully modal 
  function userAddDel() {
      $(".user-mod").css("display","none");
      $(".user-success").fadeIn("fast");
      setTimeout(function () {
        $(".content-wrapper").css("display","none");
        $("footer").css("display","none");
        getData(cookies);
        getDelData();
        getBlockData();
      },2000);
  }
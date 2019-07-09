//upload avatar file via ajax 
  var Upload = function (file) {
    this.file = file;
  };

  Upload.prototype.getName = function() {
    return this.file.name;
  };

  Upload.prototype.doUpload = function(dataName) {
      var fileData = new FormData();
      var fileType = this.file['type'];
      var getFileName = this.file.name;
      var validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(fileType)) {
        $(".flex-inline").css("display","inline-flex");
      } else {
        getFileName = this.file.name.replace(/\s+/g, '');        
        fileData.append("file", this.file, getFileName);
        fileData.append("upload_file", true);
        getFileName = this.file.name.replace(/\s+/g, '');
        getFileExt = getFileName.split('.').pop();
        var getFileNameStripped = getFileName.replace(/\.[^/.]+$/, "");        
        console.log("sanitised name: " +getFileNameStripped);
        $.ajax({
            type: "POST",
            url: "http://localhost:1355/",
            async: true,
            data: fileData,
            cache: false,
            contentType: false,
            processData: false,            
            timeout: 10000,
            success: function () {
              $(".black-icon").fadeIn("fast");
              $(".flex-inline").css("display","none");
                precursor(getFileNameStripped,getFileExt)
            },
            error: function () {              
            },
        });
      }      
  };
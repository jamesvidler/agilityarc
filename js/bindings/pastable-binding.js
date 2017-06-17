ko.bindingHandlers.pastable = {
    setImg: function(canvas, ctx, value, callback) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        var img = new Image();
       img.setAttribute('crossOrigin', 'anonymous');
        img.onload = function() {
            var maxWidth = 745;
            var width = img.width;
            var height = img.height;
            var ratio = width / height;
            if(img.width > maxWidth) {
                width = maxWidth;
                height = width / ratio;

                //resize the canvas
                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0 , 0, width, height);
            } else {
                //resize the canvas
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0 , 0);
            }

            if(callback && $.isFunction(callback)) {
                callback();
            }
        }
        img.src = value;

    },
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var canvas = element;
	    var ctx = element.getContext("2d");
        var value = valueAccessor().value;
        var active = valueAccessor().active;
        var source = valueAccessor().source;

        ko.bindingHandlers.pastable.setImg(canvas, ctx, value());

    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

        var value = valueAccessor().value;
        var active = valueAccessor().active;
        var source = valueAccessor().source;
        
        var canvas = element;
	    var ctx = element.getContext("2d");

    
        //draw the image on canvas
        if(source() != null && active()) {
            ko.bindingHandlers.pastable.setImg(canvas, ctx, source(), function() {
                source(null);
                
                canvas.toBlob(function(blob) {
                    file = new File([blob], "image-filename-tbd.png");
                    uploadFile(file);
                });
            });
        }

        function uploadFile(file) {
            var xhr = new XMLHttpRequest();

            xhr.upload.onprogress = function(e) {
                var percentComplete = (e.loaded / e.total) * 100;
                console.log("Uploaded" + percentComplete + "%");
            };

            xhr.onload = function() {
                if (xhr.status == 200) {
                    var responseJSON = JSON.parse(xhr.responseText);
                    value(responseJSON.urls[0]);
                } else {
                    alert("Error! Upload failed");
                }
            };

            xhr.onerror = function() {
                alert("Error! Upload failed. Can not connect to server.");
            };

            xhr.open("POST", 'https://agility-arc-functions.azurewebsites.net/api/UploadImage?code=n3erYDOSKDTrRTtgrfbejAXJBUaQAQXMpdv6qSnyxBGqqqCats9KKw==');
            
            var formData = new FormData();
            formData.append("pastedFile", file);
            xhr.send(formData);
        }
        
        
    }
};
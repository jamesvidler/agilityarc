ko.bindingHandlers.pastable = {
    setImg: function(canvas, ctx, value) {
        var img = new Image();
        img.onload = function() {

        }
        img.src = value();
    },
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        

    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.

        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
        var value = valueAccessor().value;
        var active = valueAccessor().active;
        var source = valueAccessor().source;
        
        var canvas = element;
	    var ctx = element.getContext("2d");

         //set the value of the current image in the canvas

            
           
        // function handlePaste(e) {
            
        //     for (var i = 0 ; i < e.clipboardData.items.length ; i++) {
        //         var item = e.clipboardData.items[i];
        //         console.log("Item: " + item.type);
        //         if (item.type.indexOf("image") > -1) {
        //             uploadFile(item.getAsFile());
        //         } else {
        //             console.log("Discardingimage paste data");
        //         }
        //     }
        // }

        //draw pasted image to canvas
        var paste_createImage = function (source) {
            console.log('image pasting...');
            var pastedImage = new Image();
            pastedImage.onload = function () {
               
                
                var maxWidth = 745;
                var width = pastedImage.width;
                var height = pastedImage.height;
                var ratio = width / height;
                if(pastedImage.width > maxWidth) {
                    width = maxWidth;
                    height = width / ratio;

                    //resize the canvas
                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(pastedImage, 0 , 0, width, height);
                } else {
                    //resize the canvas
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(pastedImage, 0 , 0);
                }
                
                source(null);

                canvas.toBlob(function(blob) {
                    file = new File([blob], "image-filename-tbd.png");
                    uploadFile(file);
                });
                 
            };
            pastedImage.src = source();
        }
        
        if(source() != null && active()) {
            paste_createImage(source);
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
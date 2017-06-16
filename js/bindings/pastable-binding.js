ko.bindingHandlers.pastable = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here

        element.addEventListener("paste", handlePaste);

        function handlePaste(e) {
            
            for (var i = 0 ; i < e.clipboardData.items.length ; i++) {
                var item = e.clipboardData.items[i];
                console.log("Item: " + item.type);
                if (item.type.indexOf("image") > -1) {
                    uploadFile(item.getAsFile());
                } else {
                    console.log("Discardingimage paste data");
                }
            }
        }

        function makeid()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        function uploadFile(file) {
            var xhr = new XMLHttpRequest();

            //set unique name
            file.name = makeid() + ".png";

            xhr.upload.onprogress = function(e) {
                var percentComplete = (e.loaded / e.total) * 100;
                console.log("Uploaded" + percentComplete + "%");
            };

            xhr.onload = function() {
                if (xhr.status == 200) {
                    alert("Sucess! Upload completed");
                    debugger;
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

    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.
    }
};
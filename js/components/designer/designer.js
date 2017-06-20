ko.components.register('designer', {
    viewModel: function(params) {
        debugger;
        var self = this;

        self.data = new function() {
            var d = this;
            d.url = params.data.url;
        }

        self.state = new function() {
            var state = this;
            state.active = params.state.active;
        }

        self.actions = new function() {
            var actions = this;
            actions.uploadFile = function(blob) {

                var file = new File([blob], "image-filename-tbd.png");

                var xhr = new XMLHttpRequest();

                xhr.upload.onprogress = function(e) {
                    var percentComplete = (e.loaded / e.total) * 100;
                    console.log("Uploaded" + percentComplete + "%");
                };

                xhr.onload = function() {
                    if (xhr.status == 200) {
                        var responseJSON = JSON.parse(xhr.responseText);
                        params.data.url(responseJSON.urls[0]);
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


    },
    template: { 
        element: 'designer-template',
        templateUrl: 'js/components/designer/designer.html'
    }
});
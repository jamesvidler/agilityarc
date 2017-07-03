ko.components.register('designer', {
    viewModel: function(params) {
    
        var self = this;

        self.data = new function() {
            var d = this;
            d.url = params.data.url;
            d.oldUrl = ko.unwrap(d.url);
            d.selections = params.data.selections;
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
            };

        }

        self.jcrop = new function() {
            var jcrop = this;
            jcrop.instance = ko.observable(null);
            jcrop.currentSelection = ko.observable(null);
            jcrop.active = ko.observable(false);
            jcrop.updateSelection = function(c) {
                jcrop.currentSelection().x1(c.x);
                jcrop.currentSelection().x2(c.x2);
                jcrop.currentSelection().y1(c.y);
                jcrop.currentSelection().y2(c.y2);
                jcrop.currentSelection().w(c.w);
                jcrop.currentSelection().h(c.h);
            };
            jcrop.enable = function() {
                jcrop.active(true);
                jcrop.instance().enable();
            };
            jcrop.disable = function() {
                jcrop.active(false);
                jcrop.instance().disable();
            };
            jcrop.destroy = function() {
                jcrop.active(false);
                console.log('jcrop destroyed');
                jcrop.instance().destroy();
            }
            jcrop.onSelect = function(c) {
                jcrop.updateSelection(c);
                app.operations.save();
            };
            jcrop.onChange = function(c) {

            };
            jcrop.onRelease = function() {
                console.log('onRelease');
                jcrop.disable();
            }
            jcrop.onInit = function(jcropInstance) {
                
                console.log('init fired');
                jcrop.instance(jcropInstance);

                //disable this by default at first
                jcrop.disable();
            };
            jcrop.onDispose = function() {
                if(jcrop.instance() != null) {
                    jcrop.destroy();
                }
            };
            jcrop.findSelection = function(selectionID, selectionType) {
                var selections = self.data.selections();
                var selection = null;
                for(var i in selections) {
                    if(selectionID == selections[i].referenceID() && selectionType == selections[i].referenceType()) {
                        //this is an existing selection we are re-drawing
                        selection = selections[i];
                    } 
                }
                return selection;
            };
            jcrop.newSelection = function(selectionID, selectionType, onSelectCallback) {
                
                var selection = jcrop.findSelection(selectionID, selectionType);

                if(selection == null) {
                    //this is brand new
                    selection = new app.objects.agility.selection(selectionID, selectionType, null);
                    self.data.selections.push(selection);
                }

                jcrop.currentSelection(selection);

                jcrop.onSelectCallback = onSelectCallback;

                jcrop.enable();
                  
            };
            jcrop.onSelectCallback = function() {};
            jcrop.editSelection = function(selectionID, selectionType, onSelectCallback) {
                
                var selection = jcrop.findSelection(selectionID, selectionType);
                jcrop.currentSelection(selection);
                if(selection != null) {
                    jcrop.instance().setSelect([selection.x1(), selection.y1(), selection.x2(), selection.y2()]);
                }

                //don't have to necessarily enable it
                jcrop.enable();
                
            };
            jcrop.confirmSelection = function() {
                jcrop.instance().release();
                jcrop.disable();
            }

        }


        
        self.on = {
            urlChange: self.data.url.subscribe(function(newVal) {
                if(newVal != self.data.oldUrl) {
                    //url has changed!
                    self.jcrop.instance().setImage(newVal);
                    self.jcrop.disable();
                }
            })
        }

        self.dispose = function() {
            self.on.urlChange.dispose();
        }

        params.designer(self);

    },
    template: { 
        element: 'designer-template',
        templateUrl: 'js/components/designer/designer.html'
    }
});
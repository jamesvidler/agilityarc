var app = new function() {
    var self = this;
    
    self.viewmodels = {};

    self.initialized = ko.pureComputed({
        read: function() {
            var p = ko.unwrap(self.project);
            return p != null;
        }
    })

    self.project = ko.observable(null);

    self.objects = new function() {
        var o = this;

        o.project = function(data) {
            this.version = '0.1';
            this.provider = 'Agility';
            this.template = new o.agility.projectTemplate();
        }

        
        o.agility = new function() {
            var a = this;

            a.projectTemplate = function(data) {
                this.name = ko.observable("Enter a project name");
                this.pageTemplates = ko.observableArray([]);
                this.pages = ko.observableArray([]);
                this.contentDefinitions = ko.observableArray([]);
                this.sharedContent = ko.observableArray([]);
                this.moduleDefinitions = ko.observableArray([]);
            };

            a.pageTemplate = function() {
                this.id = self.utils.makeid();
                this.name = ko.observable("New Page Template");
                this.description = ko.observable("");
                this.relativeUrl = ko.observable("");
                this.moduleZones = ko.observableArray([]);
            }
            
            a.selection = function() {
                this.referenceID = ko.observable(null);
                this.x1 = ko.observable(null);
                this.y1 = ko.observable(null);
                this.x2 = ko.observable(null);
                this.y2 = ko.observable(null);
                this.w = ko.observable(null);
                this.h = ko.observable(null);
            }

            a.moduleZone = function() {
                this.id = self.utils.makeid();
                this.name = ko.observable("New Module Zone");
                this.referenceName = ko.observable("");
                this.description = ko.observable("");
            }

            a.page = function() {
                this.id = self.utils.makeid();
                this.name = ko.observable("New Page");
                this.type = ko.observable("");
                this.path = ko.observable("");
                this.pageTemplate = ko.observable("");
                this.moduleZones = ko.observable({});
                this.image = new a.image();
                this.selections = ko.observableArray([]);
            }

            a.pageModuleZone = function() {
                this.id = self.utils.makeid();
                this.contentZone = ko.observable("");
                this.modules = ko.observable({});
            }

            a.image = function() {
                this.id = self.utils.makeid();
                this.url = ko.observable("");
                this.base64 = ko.observable("");
            }

            a.contentDefinitions = function() {
                this.name = ko.observable("");
                this.referenceName = ko.observable("");
                this.description = ko.observable("");
                this.fields = ko.observableArray([]);
            }

            a.field = function() {
                this.name = ko.observable("");
                this.referenceName = ko.observable("");
                this.type = ko.observable("");
                this.fieldType = ko.observable({});
            }

            a.fieldType = function() {
                this.name = ko.observable(""),
                this.properties = ko.observable({});
            }

            a.fieldTypeProperties = function() {
                this.required = false;
                this.contentDefinition = ko.observable("");
                this.contentView = ko.observable("");
                this.renderAs = ko.observable("");
            }

            a.sharedContent = function() {
                this.name = ko.observable("");
                this.referenceName = ko.observable("");
                this.referenceName = ko.observable("");
                this.contentDefinition = ko.observable("");
            }

            a.moduleDefinition = function() {
                this.name = ko.observable("");
                this.referenceName = ko.observable("");
                this.description = ko.observable("");
                this.fields = [];
                this.outputTemplate = ko.observable("");
            }
        }

        
    }

    self.operations = new function() {
        var op = this;
        op.save = function() {
            var objToSave = ko.mapping.toJS(self.project);
            delete objToSave.__ko_mapping__;
            var savedJSON = JSON.stringify(objToSave);
            localStorage.setItem('project', savedJSON);
            console.log('project saved!', savedJSON);
        },
        op.new = function() {
            var newP = new self.objects.project();
            self.project(newP);
            self.operations.save();
        }
    }

    

    self.menu = new function() {
        var m = this;
        m.click = {
            project: function() {
                self.stack.add('stack-project', self.project().template);
            },
            newPageTemplate: function() {
                var p = new self.objects.agility.pageTemplate();
                self.project().template.pageTemplates.push(p);
                self.stack.add('stack-pageTemplate', p);
            },
            openPageTemplate: function(p) {
                self.stack.add('stack-pageTemplate', p);
            },
            deletePageTemplate: function(p) {
                self.project().template.pageTemplates.remove(p);
                self.stack.remove('stack-pageTemplate', ko.unwrap(p));
            },
            newPage: function() {
                var p = new self.objects.agility.page();
                self.project().template.pages.push(p);
                self.stack.add('stack-page', p);
            },
            openPage: function(p) {
                self.stack.add('stack-page', p);
            },
            deletePage: function(p) {
                self.project().template.pages.remove(p);
                self.stack.remove('stack-page', ko.unwrap(p));
            },
        };
    }

    self.stack = new function() {
        var s = this;
        s.items = ko.observableArray([]);
        s.add = function(componentName, data) {
            //ensure we don't have duplicate stacks
            var items = ko.unwrap(s.items);
              
            var existFlag = false;
            for(var i = 0; i < items.length; i++) {
                items[i].params.active(false);
                //check duplicates by name and component
                if(s.find())
                if(componentName === items[i].name && items[i].params.data.id === data.id && !existFlag) {
                    //we have a duplicate, increase the z-index to be at the top
                    s.items()[i].params.order(items.length);
                    s.items()[i].params.active(true);
                    existFlag = true;
                    
                } else {
                    s.items()[i].params.order(i);
                    s.items()[i].params.active(false);
                }

            }
            
            if(!existFlag) {
                s.items.push({ 
                    name: componentName,
                    params: { 
                        data: data,
                        order: ko.observable(items.length),
                        active: ko.observable(true) 
                    }
                });
            }

            

        };
        s.remove = function(componentName, params) {
            
            var items = ko.unwrap(s.items);
            for(var i in items) {
                //check duplicates by name and component
                if(componentName === items[i].name && items[i].params.data.id === params.data.id) {
                    //remove it
                    s.items.remove(items[i]);
                }
            }

            //save it
            self.operations.save();
        },
        s.onChange = ko.pureComputed({
            read: function() {
                ko.unwrap(s.items);
                self.operations.save();
            },
            owner: this
        });
    }

    self.getSetProject = function() {
    
        var p = localStorage.getItem('project');
        
        if(p != null && p !== undefined) {

            try {
                
                console.log('existing project found', p);

                var data = JSON.parse(p);
                var existingP = ko.mapping.fromJS(data);
                

                var blank = new self.objects.project();
                var currentP = ko.mapping.fromJS(existingP);

                currentP = $.extend(blank, currentP);


                console.log('updated project on load to latest schema', currentP);

                self.project(currentP);
                self.operations.save();
            
            } catch (err) {
                alert("There was an error loading your project. Your existing project will not be loaded. A new one will be initialized.")
                self.operations.new();
            }

        } else {
            self.operations.new();
        }

        //set the auto-save!
        window.setInterval(function() {
            self.operations.save();
        }, 10000);
    }

    self.pageComponent = ko.observable(null);

    

    
    self.utils = new function() {
        var u = this;
        u.state = new function() {
            this.xhrTemplateRequestPool = [];
        },
        u.makeid = function() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
        u.loadDependantTemplates = function (url, successCallback, errorCallback) {

            var req = u.state.xhrTemplateRequestPool[url];
            if (req) {
                req.success(function (result) {
                    successCallback();
                });
                return;
            }


            var xhr = $.get(url, null, null, "html")
                .success(function (result) {
                    $('body').append(result);
                    successCallback();
                })
                .fail(function (err, status, errorMessage) {

                    if (status == "abort") {
                        //do nothing...
                        return;
                    }

                    if (errorCallback != undefined && $.isFunction(errorCallback)) {
                        errorCallback(errorMessage, status);
                    } else {
                        console.error("An error occurred while requesting the template: " + url)
                    }
                }).always(function () {
                    u.state.xhrTemplateRequestPool[url] = null;
                });

            u.state.xhrTemplateRequestPool[url] = xhr;
            return xhr;

        }
        u.registerComponentLoader = function () {
            //CUSTOM COMPONENT LOADER 
            var templateFromUrlLoader = {
                loadTemplate: function (name, templateConfig, callback) {
                    //if we have the template already...
                    if ($('#' + templateConfig.element).length > 0) {
                        callback(null);
                        return;
                    }

                    if (templateConfig.templateUrl) {

                        var loadTemplate = function (url) {
                            u.loadDependantTemplates(url, function () {
                                callback(null);
                            }, function () {
                                callback(null);
                            });
                        };

                        var url = ko.unwrap(templateConfig.templateUrl);
                        if (url && url != "") {
                            //if we have a url, load it...
                            loadTemplate(url);
                        } else {
                            //if we don't have a url, see if we can wait for it to be set...
                            if (ko.isSubscribable(templateConfig.templateUrl)) {
                                templateConfig.templateUrl.subscribe(function (value) {
                                    if (value && value != "") loadTemplate(value);
                                });

                            } else {
                                callback(null);
                            }
                        }

                    } else {
                        // Unrecognized config format. Let another loader handle it.
                        callback(null);
                    }
                }
            };

            // Register it
            ko.components.loaders.unshift(templateFromUrlLoader);
        };
    };

    self.paste = new function() {
        var p = this;
        p.init = function() {
            document.addEventListener("paste",  this.paste);
        }
        p.paste = function(e) {
            if (e.clipboardData) {
                    
                var items = e.clipboardData.items;
                if (!items) return;
                
                //access data directly
                for (var i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf("image") !== -1) {
                        //image
                        var blob = items[i].getAsFile();
                        var URLObj = window.URL || window.webkitURL;
                        var source = URLObj.createObjectURL(blob);
                        p.pasteURL(source);
                    }
                }
                e.preventDefault();
            }
        }
        p.pasteURL = ko.observable(null);
    }


    self.onLoad = function() {
        //on load        
        self.utils.registerComponentLoader();
        self.getSetProject();
        self.paste.init();
    }
    
    self.onLoad();

}

$(document).ready(function() {
    ko.applyBindings(app);
});
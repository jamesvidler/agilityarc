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
                this.image = ko.observable({})
            }

            a.pageModuleZone = function() {
                this.id = self.utils.makeid();
                this.contentZone = ko.observable("");
                this.modules = ko.observable({});
            }

            a.image = function() {
                this.url = ko.observable("");
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
        s.add = function(componentName, params) {
            //ensure we don't have duplicate stacks
            var items = ko.unwrap(s.items);
            for(var i in items) {
                //check duplicates by name and component
                if(componentName === items[i].name && items[i].params.id === params.id) {
                    //we have a duplicate - move this one to the forfront of the stack
                    s.items.splice(i, 1);
                }
            }
            s.items.push({ name: componentName, params: params });
        };
        s.remove = function(componentName, params) {
            var items = ko.unwrap(s.items);
            for(var i in items) {
                //check duplicates by name and component
                if(componentName === items[i].name && params.id == items[i].params.id) {
                    //we have a duplicate - move this one to the forfront of the stack
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

    //on load
    self.getSetProject();

    
    self.utils = {
        makeid: function() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
    }
    

}

$(document).ready(function() {
    ko.applyBindings(app);
});
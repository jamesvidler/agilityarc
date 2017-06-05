ko.components.register('agility-arc', {
    viewModel: function(params) {
        var self = this;
        
        self.initialized = ko.pureComputed({
            read: function() {
                var p = ko.unwrap(self.project);
                return p != null;
            }
        })

        self.project = ko.observable(null);

        self.objects = new function() {
            var o = this;

            o.project = function() {
                this.version = '0.1';
                this.provider = 'Agility';
                this.template = new o.agility.projectTemplate();
            }

            
            o.agility = new function() {
                var a = this;

                a.projectTemplate = function() {
                    this.pageTemplates = ko.observableArray([]);
                    this.pages = ko.observableArray([]);
                    this.contentDefinitions = ko.observableArray([]);
                    this.sharedContent = ko.observableArray([]);
                    this.moduleDefinitions = ko.observableArray([]);
                };

                a.pageTemplate = function() {
                    this.name = ko.observable("");
                    this.description = ko.observable("");
                    this.relativeUrl = ko.observable("");
                    this.moduleZones = ko.observableArray([]);
                }
                
                a.moduleZone = function() {
                    this.name = ko.observable("");
                    this.referenceName = ko.observable("");
                    this.description = ko.observable("");
                }

                a.page = function() {
                    this.name = ko.observable("");
                    this.type = ko.observable("");
                    this.path = ko.observable("");
                    this.pageTemplate = ko.observable("");
                    this.moduleZones = ko.observable({});
                    this.image = ko.observable({})
                }

                a.pageModuleZone = function() {
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
                localStorage.setItem('project', JSON.stringify(self.project()));
                console.log(self.project());
            }
        }

        self.getSetProject = function() {
            var p = localStorage.getItem('project');
            if(p != null && p !== undefined) {
                var existingP = JSON.parse(p);
                self.project(existingP);
            } else {
                var newP = new self.objects.project();
                self.project(newP);
                self.operations.save();
            }
        }

        self.pageComponent = ko.observable(null);

        //on load
        self.getSetProject();


    },
    template: { element: 'agility-arc-template'}
});
ko.components.register('stack-page', {
    viewModel: function(params) {
        
        var self = this;
        
        //this will get initialized by the designer child component
        self.designer = ko.observable(null);

        self.data = {
            selections: new function() {
                //initialize selections if we don't have any
                if(!params.data.selections) {
                    params.data.selections = ko.observableArray([]);
                }

                return params.data.selections;
            }
        }


        self.actions = new function() {
            var actions = this;
            actions.close = function() {
                app.stack.remove("stack-page", params);
            };
            actions.clearSelections = function() {
                params.data.selections([]);
                app.operations.save();
            };
            actions.drawPageTemplateSection = function() {

                //initialize the selection on the image
                self.designer().jcrop.newSelection(params.data.pageTemplate(), "PageTemplate", function() {
                    //on selected
                })
            };
            actions.editPageTemplateSection = function() {
                //initialize the selection on the image
                self.designer().jcrop.editSelection(params.data.pageTemplate(), "PageTemplate", function() {
                    //on selected
                })
            }
        }

        self.state = {
            active: params.active,
            order: params.order
        }

        self.properties = {
            title: params.name,
            fields: new function() {
                var f = this;
                f.name = new app.viewmodels.input.text(params.data.name, "Page Name");
                f.type = new app.viewmodels.input.text(params.data.type, "Type");
                f.path = new app.viewmodels.input.text(params.data.path, "Path");
                f.pageTemplate = new app.viewmodels.input.pageTemplate(
                    app.project().template.pageTemplates,
                    params.data.selections,
                    params.data.pageTemplate,
                    "Page Template",
                    self.designer
                );
                f.moduleZones = new app.viewmodels.input.pageModuleZones(
                    app.project().template.pageTemplates,
                    params.data.pageTemplate,
                    params.data.selections,
                    params.data.moduleZones,
                    self.designer
                );
                f.image = new app.viewmodels.input.image(params.data.image.url, params.data.image.base64, "Image");
            }

            
        }

        

        

        return self;

    },
    template: { 
        element: 'stack-page-template',
        templateUrl: 'js/components/stack-page/stack-page.html'
    }
});
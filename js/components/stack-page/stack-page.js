ko.components.register('stack-page', {
    viewModel: function(params) {
        
        var self = this;
        

        self.actions = new function() {
            var actions = this;
            actions.close = function() {
                app.stack.remove("stack-page", params);
            };
            actions.drawPageTemplate = function() {

                self.designer().jcrop.newSelection(function(c) {
                    //onChange
                }, function(c) {
                    //onSelect
                    debugger;
                });
            };
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
                f.pageTemplate = new app.viewmodels.input.pageTemplate(app.project().template.pageTemplates, params.data.pageTemplate, "Page Template", self.actions.drawPageTemplate);
                f.modules = new app.viewmodels.input.pageModules(params.data.moduleZones, "Modules");
                f.image = new app.viewmodels.input.image(params.data.image.url, params.data.image.base64, "Image");
            }

            
        }

        //this will get initialized by the designer child component
        self.designer = ko.observable(null);

        

        return self;

    },
    template: { 
        element: 'stack-page-template',
        templateUrl: 'js/components/stack-page/stack-page.html'
    }
});
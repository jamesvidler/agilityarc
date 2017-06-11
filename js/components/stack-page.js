ko.components.register('stack-page', {
    viewModel: function(params) {
        
        
        var self = this;
        

        self.properties = {
            title: params.name,
            fields: new function() {
                var f = this;
                f.name = new app.viewmodels.input.text(params.name, "Page Name");
                f.type = new app.viewmodels.input.text(params.type, "Type");
                f.path = new app.viewmodels.input.text(params.path, "Path");
                f.pageTemplate = new app.viewmodels.input.pageTemplate(app.project().template.pageTemplates, params.pageTemplate, "Page Template");
                f.modules = new app.viewmodels.input.pageModules(params.moduleZones, "Modules");
                //f.image = new app.viewmodels.input.image(params.image, "Image");
            }

            
        }

        self.designer = {

        }

        self.actions = {
            close: function() {
                app.stack.remove("stack-page", params);
            }
        }

        return self;

    },
    template: { element: 'stack-page-template'}
});
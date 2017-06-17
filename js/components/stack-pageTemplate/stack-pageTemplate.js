ko.components.register('stack-pageTemplate', {
    viewModel: function(params) {
        
        
        var self = this;
        
        

        self.properties = {
            title: params.name,
            fields: new function() {
                var f = this;
                f.id = params.id;
                f.name = new app.viewmodels.input.text(params.name, "Name");
                f.description = new app.viewmodels.input.text(params.description, "Description");
                f.relativeUrl = new app.viewmodels.input.text(params.relativeUrl, "Relative Url");
                f.moduleZones = new app.viewmodels.input.moduleZones(params.moduleZones, "Module Zones");
            }
        }


        self.designer = {

        }

        self.actions = {
            close: function() {
                app.stack.remove("stack-pageTemplate", params);
            }
        }

        return self;

    },
    template: { 
        element: 'stack-pageTemplate-template',
        templateUrl: 'js/components/stack-pageTemplate/stack-pageTemplate.html'
    }
});
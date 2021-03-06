ko.components.register('stack-project', {
    viewModel: function(params) {
        
        
        var self = this;
        

        self.state = {
            active: params.active,
            order: params.order
        }

        self.properties = {
            title: params.name,
            fields: new function() {
                var f = this;
                f.name = new app.viewmodels.input.text(params.data.name, "Project Name");
            }

            
        }

        self.designer = {

        }

        self.actions = {
            close: function() {
                app.stack.remove("stack-project", params);
            }
        }

        return self;

    },
    template: { 
        element: 'stack-project-template',
        templateUrl: 'js/components/stack-project/stack-project.html'
    }
});
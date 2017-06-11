ko.components.register('stack-project', {
    viewModel: function(params) {
        
        
        var self = this;
        

        

        self.properties = {
            title: params.name,
            fields: new function() {
                var f = this;
                f.name = new app.viewmodels.input.text(params.name, "Project Name");
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
    template: { element: 'stack-project-template'}
});
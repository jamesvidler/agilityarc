ko.components.register('selection', {
    viewModel: function(params) {
        var self = this;
        self.name = ko.observable(null);
        self.data = params.data;

        if(self.data.referenceType() == "PageTemplate") {
            var pt = app.dataAccess.getPageTemplateByID(params.data.referenceID());
            self.name = pt.name;
        }

        if(self.data.referenceType() == "ModuleZone") {
            
            var pt = app.dataAccess.getPageTemplateModuleZoneByID(params.data.referenceID());
            self.name = pt.name;
        }

        if(self.data.referenceType() == "Module") {
            var pt = app.dataAccess.getModuleDefinitionByID(params.data.referenceID());
            self.name = pt.name;
        }


    },
    template: { 
        element: 'selection-template',
        templateUrl: 'js/components/selection/selection.html'
    }
});
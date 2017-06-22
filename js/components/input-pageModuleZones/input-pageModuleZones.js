
ko.components.register('input-pagemodulezones', {
    viewModel: function(params) {
        
        return params.field;
    },
    template: { 
        element: 'input-pagemodulezones-template',
        templateUrl: 'js/components/input-pageModuleZones/input-pageModuleZones.html'
    }
});

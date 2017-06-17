ko.components.register('input-modulezones', {
    viewModel: function(params) {
        return params.field;

    },
    template: { 
        element: 'input-modulezones-template',
        templateUrl: 'js/components/input-moduleZones/input-moduleZones.html'
    }
});


ko.components.register('input-modulezone', {
    viewModel: function(params) {
        return params.field;
    },
    template: { 
        element: 'input-modulezone-template',
        templateUrl: 'js/components/input-moduleZones/input-moduleZones.html'
    }
});

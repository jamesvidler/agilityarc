ko.components.register('input-text', {
    viewModel: function(params) {
        return params.field;
    },
    template: { 
        element: 'input-text-template',
        templateUrl: 'js/components/input-text/input-text.html'
    }
});
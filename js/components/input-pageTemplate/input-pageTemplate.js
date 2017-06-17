
ko.components.register('input-pagetemplate', {
    viewModel: function(params) {
        
        return params.field;
    },
    template: { 
        element: 'input-pagetemplate-template',
        templateUrl: 'js/components/input-pageTemplate/input-pageTemplate.html'
    }
});

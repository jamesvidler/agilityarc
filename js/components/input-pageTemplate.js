
ko.components.register('input-pagetemplate', {
    viewModel: function(params) {
        
        return params.field;
    },
    template: { element: 'input-pagetemplate-template'}
});

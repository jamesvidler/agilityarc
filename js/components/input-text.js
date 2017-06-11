ko.components.register('input-text', {
    viewModel: function(params) {
        return params.field;

    },
    template: { element: 'input-text-template'}
});
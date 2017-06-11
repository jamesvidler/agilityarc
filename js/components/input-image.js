ko.components.register('input-image', {
    viewModel: function(params) {
        return params.field;

    },
    template: { element: 'input-image-template'}
});
ko.components.register('input-modulezones', {
    viewModel: function(params) {
        return params.field;

    },
    template: { element: 'input-modulezones-template'}
});


ko.components.register('input-modulezone', {
    viewModel: function(params) {
        return params.field;
    },
    template: { element: 'input-modulezone-template'}
});

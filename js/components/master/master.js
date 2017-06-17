ko.components.register('master', {
    viewModel: function(params) {
        
        return params.vm;


    },
    template: { 
        templateUrl: 'js/components/master/master.html',
        element: 'agility-arc-template'
    }
});
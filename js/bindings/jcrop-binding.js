ko.bindingHandlers.jcrop = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
        
        var onChange = valueAccessor().onChange;
        var onSelect = valueAccessor().onSelect;
        var onRelease = valueAccessor().onRelease;
        var onInit = valueAccessor().onInit;
        var onDispose = valueAccessor().onDispose;

        var thisJcrop = null;
        debugger;

        $(element).Jcrop({
            onChange:   onChange,
            onSelect:   onSelect,
            onRelease:  onRelease
            },function(){
                onInit(this);
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            // This will be called when the element is removed by Knockout or
            // if some other part of your code calls ko.removeNode(element)
            onDispose();
        });

    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.

             
    }
};
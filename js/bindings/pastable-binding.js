ko.bindingHandlers.pastable = {
    cropImg: function(canvas, ctx, value, callback) {
        

    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

        var value = valueAccessor().value;
        var active = valueAccessor().active;
        var source = valueAccessor().source;
        var onAfterPaste = valueAccessor().onAfterPaste;

        debugger;
        //draw the image on canvas
        if(source() != null && active()) {
            
            var canvas =  element;
	        var ctx = element.getContext("2d");


            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            var img = new Image();
            img.setAttribute('crossOrigin', 'anonymous');
            img.onload = function() {
                var maxWidth = 745;
                var width = img.width;
                var height = img.height;
                var ratio = width / height;
                if(img.width > maxWidth) {
                    width = maxWidth;
                    height = width / ratio;

                    //resize the canvas
                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(img, 0 , 0, width, height);
                } else {
                    //resize the canvas
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0 , 0);
                }

                source(null);
                canvas.toBlob(onAfterPaste);
            }
            img.src = source();

        }
        
        
    }
};
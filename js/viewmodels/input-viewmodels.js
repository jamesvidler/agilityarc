

app.viewmodels.input = new function() {
    var self = this;
    self.text = function(value, label) {
        
        this.id = app.utils.makeid();
        this.value = value;
        this.label = label;
    };
    self.moduleZone = function(moduleZone) {
        this.fields = {
            id: moduleZone.id,
            name: new self.text(moduleZone.name, "Name"),
            referenceName: new self.text(moduleZone.name, "Reference Name"),
            description: new self.text(moduleZone.description, "Description")
        }
    };
    self.moduleZones = function(valueAry, label) {
        var z = this;
        z.id = app.utils.makeid();
        z.label = label;
        z.fields = ko.observableArray([]);
    
        

        for(var i in valueAry()) {
            z.fields.push(new self.moduleZone(valueAry()[i]));
        }

        this.click = {
            newModuleZone: function() {
                var m = new app.objects.agility.moduleZone()
                valueAry.push(m);
                z.fields.push(new self.moduleZone(m));
            },
            deleteModuleZone: function(m) {
                z.fields.remove(m);
                var items = ko.unwrap(valueAry);
                for(var i in items) {
                    if(ko.unwrap(items[i].id) === ko.unwrap(m.fields.id)) {
                        valueAry.remove(items[i]);
                    }    
                }
                
            }
        }
    };
    self.pageTemplate = function(pageTemplates, selections, value, label, drawPageTemplateSection, editPageTemplateSection) {
        
        this.id = app.utils.makeid();
        this.label = label;
        this.value = value;
        this.options = pageTemplates;
        this.newPageTemplate = function() {
            app.menu.click.newPageTemplate();
        }
        this.drawPageTemplateSection = drawPageTemplateSection;
        this.editPageTemplateSection = editPageTemplateSection;
        this.selections = selections;

        this.hasPageTemplateSection = ko.pureComputed({
            read: function() {
                var selections_unwrapped = ko.unwrap(selections);
                
                for(var i in selections_unwrapped) {
                    if(selections_unwrapped[i].referenceType() == "PageTemplate") {
                        return true;
                    }
                }
                return false;
            }
        })

        this.onValue = this.value.subscribe(function(val) {

            var selections_unwrapped = ko.unwrap(selections);
            var pageTemplateSelection = null;
            var matchingSelection = null;
            for(var i in selections_unwrapped) {
                if(selections_unwrapped[i].referenceType() == "PageTemplate") {
                    pageTemplateSelection = selections_unwrapped[i];

                    if(pageTemplateSelection.referenceID() == val) {
                        matchingSelection = selections_unwrapped[i];
                    }
                }

            }

            if(matchingSelection == null && pageTemplateSelection != null) {
                //remove the orphaned selection
                selections.remove(pageTemplateSelection);
            }
        });

        this.dispose = function() {
            this.onValue.dispose();
        }

    };
    self.pageModules = function(pageTemplate, valueAry, label) {
        this.id = app.utils.makeid();
        this.label = label;
        this.value = valueAry;
    };
    self.image = function(url, base64, label) {
        this.id = app.utils.makeid();
        this.label = label;
        this.url = url;
        this.base64 = base64;
    }

}


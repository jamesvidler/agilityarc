

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
    self.pageTemplate = function(pageTemplates, value, label) {
        
        this.id = app.utils.makeid();
        this.label = label;
        this.value = value;
        this.options = pageTemplates;
        this.newPageTemplate = function() {
            app.menu.click.newPageTemplate();
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


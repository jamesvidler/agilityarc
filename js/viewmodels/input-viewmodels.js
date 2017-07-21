

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
    
    self.pageModuleZones = function(pageTemplatesArrValue, pageTemplateIDValue, selections, moduleZonesArryValue, designer) {
        
        
        
        var pmz = this;
        pmz.designer = designer;
        pmz.id = app.utils.makeid;
        pmz.pageTemplatesArrValue = pageTemplatesArrValue;
        pmz.pageTemplateIDValue = pageTemplateIDValue;
        pmz.moduleZonesArryValue = moduleZonesArryValue; //observable array
        pmz.selections = selections;

        pmz.pageTemplate = ko.computed(function() {
            var thisPageTemplateID = ko.unwrap(pmz.pageTemplateIDValue);
            var pageTemplates_unwrapped = ko.unwrap(pmz.pageTemplatesArrValue);
            
            for(var i in pageTemplates_unwrapped) {
                if(ko.unwrap(pageTemplates_unwrapped[i].id) === thisPageTemplateID) {
                    return pageTemplates_unwrapped[i];
                }
            }
            return null;
        });


        pmz.fields = ko.observableArray([]);

        pmz.hasModuleZones = ko.computed(function() {
            pmz.fields([]);
            var pageTemplate = ko.unwrap(pmz.pageTemplate);
            if(pageTemplate != null) {
                var moduleZones = ko.unwrap(pageTemplate.moduleZones);
                if(moduleZones.length > 0) {

                    var pageModuleZones = ko.unwrap(pmz.moduleZonesArryValue);
                    var sortedPageModuleZones = [];
                    for(var i in moduleZones) {
                        var thisPageTemplateModuleZone = moduleZones[i];
                        var foundPageTemplateMzInPageMzs = false;
                        for(var x in pageModuleZones) {
                            var thisPageModuleZone = pageModuleZones[x];
                            if(ko.unwrap(thisPageTemplateModuleZone.id) == thisPageModuleZone.contentZoneID()) {
                                foundPageTemplateMzInPageMzs = true;
                                sortedPageModuleZones.push(thisPageModuleZone);
                            }
                        }
                        if(!foundPageTemplateMzInPageMzs) {
                            //add in the missing one
                            var newZone = new app.objects.agility.pageModuleZone(thisPageTemplateModuleZone);
                            sortedPageModuleZones.push(newZone);
                        }
                    }

                    pmz.moduleZonesArryValue(sortedPageModuleZones);

                    return true;
                }
            }
            return false;
        });
    };
    self.pageTemplate = function(pageTemplates, selections, value, label, designer) {
        
        var pt = this;
        pt.designer = designer;
        pt.id = app.utils.makeid();
        pt.label = label;
        pt.value = value;
        pt.options = ko.pureComputed({
            read: function() {
                var pTs = ko.unwrap(pageTemplates);
                if(pTs.length === 0) {
                    return [{ id: null, name: 'No Templates yet...'}]
                } else {
                    return pTs;
                }
            },
            owner: this
        });
        pt.newPageTemplate = function() {
            app.menu.click.newPageTemplate();
        }

        pt.actions = new function() {
            var actions = this;
            actions.drawPageTemplateSection = function() {

                //initialize the selection on the image
                pt.designer().jcrop.newSelection(pt.value(), "PageTemplate", function() {
                    //on selected
                })
            };
            actions.editPageTemplateSection = function() {
                //initialize the selection on the image
                pt.designer().jcrop.editSelection(pt.value(), "PageTemplate", function() {
                    //on selected
                })
            }
        }

        pt.selections = selections;

        pt.hasPageTemplateSection = ko.computed(function() {
            var selections_unwrapped = ko.unwrap(selections);
            
            for(var i in selections_unwrapped) {
                if(selections_unwrapped[i].referenceType() == "PageTemplate") {
                    return true;
                }
            }
            return false;
            
        })

        pt.pageTemplate = ko.computed(function() {
            var thisPageTemplateID = ko.unwrap(pt.value);
            var pageTemplates_unwrapped = ko.unwrap(pageTemplates);
            
            for(var i in pageTemplates_unwrapped) {
                if(ko.unwrap(pageTemplates_unwrapped[i].id) === thisPageTemplateID) {
                    return pageTemplates_unwrapped[i];
                }
            }
            return null;
        });

        


        pt.onValue = pt.value.subscribe(function(val) {
            
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

        pt.dispose = function() {   
            pt.onValue.dispose();
            pt.pageTemplate.dispose();
            pt.hasPageTemplateSection.dispose();
  
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


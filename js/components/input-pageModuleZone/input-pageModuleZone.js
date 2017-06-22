
ko.components.register('input-pagemodulezone', {
    viewModel: function(params) {
        
        var self = this;

        self.designer = params.designer

        self.moduleZonesArryValue = params.moduleZonesArryValue;

        self.selections = params.selections;

        self.data = params.data;

        self.pageTemplate = params.pageTemplate;

        self.pageTemplateModuleZone = ko.observable(null);

        self.hasSection = ko.computed(function() {
            
            var selections_unwrapped = ko.unwrap(self.selections);
            
            for(var i in selections_unwrapped) {
                if(selections_unwrapped[i].referenceType() == "ModuleZone" && selections_unwrapped[i].referenceID() == self.data.contentZoneID()) {
                    return true;
                }
            }
            return false;
        });

        self.removePageModuleZone = function() {
            self.moduleZonesArryValue.remove(self.data);
        }

        self.actions = new function() {
            var actions = this;
            actions.drawNewSection = function() {
                self.designer().jcrop.newSelection(self.data.contentZoneID(), "ModuleZone", function() {
                    //on selected
                })
            };
            actions.editSection = function() {
                self.designer().jcrop.editSelection(self.data.contentZoneID(), "ModuleZone", function() {
                    //on selected
                })
            };
        }
        
        self.hasZone = ko.pureComputed({
            read: function() {
                var pageTemplateModuleZone = ko.unwrap(self.pageTemplateModuleZone);
                return pageTemplateModuleZone != null;
            }
        });


        if(self.pageTemplate() != null) {
            var thisPageTemplateModuleZones = ko.unwrap(self.pageTemplate().moduleZones);
            for(var i in thisPageTemplateModuleZones) {
                if(thisPageTemplateModuleZones[i].id() == params.data.contentZoneID()) {
                    self.pageTemplateModuleZone(thisPageTemplateModuleZones[i]);
                }
            }
        } 
        
        if(self.pageTemplate() == null || self.pageTemplateModuleZone() == null) {
            self.removePageModuleZone();
        }

        self.dispose = function() {
            self.hasSection.dispose();
        }

    },
    template: { 
        element: 'input-pagemodulezone-template',
        templateUrl: 'js/components/input-pageModuleZone/input-pageModuleZone.html'
    }
});

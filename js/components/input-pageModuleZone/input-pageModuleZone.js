
ko.components.register('input-pagemodulezone', {
    viewModel: function(params) {
        
        var self = this;

        self.moduleZonesArryValue = params.moduleZonesArryValue;

        self.data = params.data;

        self.pageTemplate = params.pageTemplate;

        self.pageTemplateModuleZone = ko.observable(null);

        self.removePageModuleZone = function() {
            self.moduleZonesArryValue.remove(self.data);
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

        

    },
    template: { 
        element: 'input-pagemodulezone-template',
        templateUrl: 'js/components/input-pageModuleZone/input-pageModuleZone.html'
    }
});

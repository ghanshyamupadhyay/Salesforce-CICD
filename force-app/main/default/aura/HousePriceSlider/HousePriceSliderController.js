({
	doInit : function(component, event, helper) {
        var $slider = $("#slider");
        $slider.noUiSlider({
            start: [300000, 1500000],
            connect: true,
            step: 50000,
            range: {
                'min': 300000,
                'max': 1500000
            }
        });
		$slider.Link('lower').to('-inline-<div class="tooltip"></div>', function ( value ) {
            $(this).html(
                '<span>' + (value / 1000) + 'k</span>'
            );
        });
        $slider.Link('upper').to('-inline-<div class="tooltip"></div>', function ( value ) {
            $(this).html(
                '<span>' + (value / 1000) + 'k</span>'
            );
        });
        $slider.on({
            change: function(event){
                var minMax =  $slider.val();
				var myEvent = $A.get("e.c:HousePriceSelectionChange");
		        myEvent.setParams({ "min": minMax[0], "max": minMax[1]});
        		myEvent.fire();
            }
        });

	}
})
sap.ui.define( ["sap/ui/core/UIComponent",
	"sap/ui/Device",

], function (UIComponent, device) {
	"use strict";
	return UIComponent.extend("demo.weather.Component", {
		metadata: {
			manifest: "json",
			rootView: "demo.weather.view.App",
			routing: {
				config: {
					routerClass: "sap.m.routing.Router",
					viewPath: "demo.weather.view",
					controlId: "rootControl",
					controlAggregation: "pages",
					viewType: "XML"
				},
				routes: [
					{
						name: "page1",
						// empty hash - normally the start page
						pattern: "",
						target: "page1"
					},
					{
						name: "page2",
						pattern: "Page2",
						target: "page2"
					}
				],
				targets: {
					page1: {
						viewName: "View1",
						viewLevel: 0
					},
					page2: {
						viewName: "View2",	
						viewLevel: 1
					}
				}
			}
		},

		init : function () {
			UIComponent.prototype.init.apply(this, arguments);
			// agrego el cargado del modelo y los modulos de device y module al inicio del fichero
			//this.setModel(models.createDeviceModel(), "device");	
			// mi aporte
			//this.setModel(models.createAPIModel());

			// Parse the current url and display the targets of the route that matches the hash
			this.getRouter().initialize();
			//this.setModel(models.createAPIModel());

		}

	});
}, /* bExport= */ true);

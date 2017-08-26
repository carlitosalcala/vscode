sap.ui.define( [
	"sap/ui/core/mvc/Controller", 
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("demo.weather.controller.View2", {
		onInit : function () {
			//sap.ui.getCore().byId("__shell0").removeAllWorksetItems();
			//sap.ui.getCore().byId("__shell0").setContent(sap.ui.getCore().byId("idView1"));
			// cargo de memoria global el modelo previamente cargado
			var oModel= sap.ui.getCore().getModel( "oModel");
			this.getView().setModel(oModel)											

			//var eventBus = sap.ui.getCore().getEventBus();
			// 1. ChannelName, 2. EventName, 3. Function to be executed, 4. Listener
			//eventBus.subscribe("MainDetailChannel", "onToPage1", this.onDataReceived, this);
			
		//	var sUrl = "#" + this.getOwnerComponent().getRouter().getURL("page1");		
		//	this.byId("link").setHref(sUrl);
		},

		onToPage1 : function () {
			this.getOwnerComponent().getRouter().navTo("page1");
		},
		loadOData : function(){
			var oModel= sap.ui.getCore().getModel( "oModel");
			this.getView().setModel(oModel)			

			var eventBus = sap.ui.getCore().getEventBus();
			// 1. ChannelName, 2. EventName, 3. Function to be executed, 4. Listener
			eventBus.subscribe("MainDetailChannel", "onToPage1", this.onDataReceived, this);
		},
		onBack : function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			//The history contains a previous entry
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				// There is no history!
				// replace the current hash with page 1 (will not add an history entry)
				this.getOwnerComponent().getRouter().navTo("page1", null, true);
			}
		}
	});

}, /* bExport= */ true);

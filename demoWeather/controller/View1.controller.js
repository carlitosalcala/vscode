sap.ui.define( [
	"sap/ui/core/mvc/Controller",
	
], function (Controller) {
	"use strict";

	return Controller.extend("demo.weather.controller.View1", {
		onInit : function () {
			this._loadForecast();			// wow
			// la url es fea, prefiero boton y me ahorro este codigo
			//var sUrl = "#" + this.getOwnerComponent().getRouter().getURL("page2");
			//this.byId("link").setHref(sUrl);
		},

		onToPage2 : function () {
			//sap.ui.getCore().sendData(oModel);
			//var datos = this.getView().getModel();
			//var __datos = datos.oData.items;

			//var eventBus = sap.ui.getCore().getEventBus();
			// 1. ChannelName, 2. EventName, 3. the data
			//eventBus.publish("MainDetailChannel", "onToPage2", { __datos : "datos" });
			
			//sap.ui.getCore().getModel().setData(datos);
	        //sap.ui.getCore().byId("__shell0").removeAllWorksetItems();
			//sap.ui.getCore().byId("__shell0").setContent(sap.ui.getCore().byId("idView2"));
			sap.m.MessageToast.show("Navigation started to graph page!");
			this.getOwnerComponent().getRouter().navTo("page2");	
		},

		_formatDate: function(date) {
			var d = new Date(date),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2) {
				month = '0' + month;
			}
			if (day.length < 2){
				day = '0' + day;	
			} 
			return [year, month, day].join('-');
		},

		_mapResults: function(results) {
			// var oModel = this.getView().getModel(); //original pero da excepcion, con el cambio va ok la carga del json al omodel
		// create a JSONModel, fill in the data and bind the Table to this model 
		//models.createAPIModel();	
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				city: "",
				country: "",
				cols: [{
					name: "Date"
				}, {
					name: "Day"
				}, {
					name: "Min"
				}, {
					name: "max"
				}, {
					name: "Night"
				}, {
					name: "eve"
				}, {
					name: "morn"
				},{
					name: "units"
				},{
					name: "humidity"						
				}],
				items: []
			});
			oModel.setProperty("/city", results.city.name);
			oModel.setProperty("/country", results.city.country);
		
			var aForecastResults = [];
			for (var i = 0; i < results.list.length; i++) {
				var oTemp = results.list[i].temp;
				var date = this._formatDate(results.list[i].dt * 1000);
				aForecastResults.push({
					date: date,
					temp: oTemp.day,
					temp_min: oTemp.min,
					temp_max: oTemp.max,
					temp_night: oTemp.night,
					temp_eve: oTemp.eve,
					temp_morn: oTemp.morn,
					units: "Celsius",
					humidity: results.list[i].humidity
				});
			}

			oModel.setProperty("/items", aForecastResults);
			this.getView().setModel(oModel);
			// cargo de manera global para la view2
			sap.ui.getCore().setModel(oModel, "oModel");	
		},

		_loadForecast: function() {
			var oView = this.getView();
			var oParams = {
				q: "Madrid",  // Get the weather in london
				units: "metric", 
				appid: "b6131c13d379bb5429a1437e1e823848",  // replace with your API key
				cnt: 16,  // get weather for the next 16 days
				mode: "json"  // get it in JSON format 
			};
		//	var sUrl = "/OpenWeather/data/2.5/forecast/daily";
			var sUrl = "http://api.openweathermap.org/data/2.5/forecast/daily";
			oView.setBusy(true);
			
			var self = this;
 
			$.get(sUrl, oParams)
				.done(function(results) {
					oView.setBusy(false);
					self._mapResults(results);
				})
				.fail(function(err) {
					oView.setBusy(false);
					if (err !== undefined) {
						var oErrorResponse = $.parseJSON(err.responseText);
						sap.m.MessageToast.show(oErrorResponse.message, {
							duration: 6000
						});
					} else {
						sap.m.MessageToast.show("Unknown error!");
					}
				});
}		
	});

}, /* bExport= */ true);

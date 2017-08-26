sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";
	return {
		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		createAPIModel: function() {
			var oModel = new JSONModel();
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
			return oModel;			
		},
		createModel: function(){
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
			return oModel;	
		}

	};

});
import { useState, useEffect, useMemo, useRef } from "react";

const STORAGE_KEY = "timelab_ops_v3";
const API_URL = "https://script.google.com/macros/s/AKfycbz5dmHhr8vf9EzyFXlV5UHNAhNJHJ25ego97X1zp8k9KUGFbvnXYxZLoG02z-5DJ7kB/exec";

const INITIAL_DATA = [{"id":1,"fechaCompra":"2026-02-11","fechaVenta":"2026-04-01","marca":"Tissot","modelo":"Chronograph Sport","mecanismo":"Cuarzo","proveedor":"Vinted","precioCompra":114.67,"canalVenta":"Catawiki","precioVenta":312.0,"envio":40.0,"comision":42.0,"beneficioNeto":151.58,"roi":132.2,"vendido":true,"facturaNum":"","clienteNombre":"ALAIN BARRE","estado":"Vendido","notas":""},{"id":2,"fechaCompra":"2026-03-15","fechaVenta":"2026-04-01","marca":"Zenith","modelo":"Calatrava","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":204.55,"canalVenta":"Catawiki","precioVenta":286.0,"envio":50.0,"comision":37.75,"beneficioNeto":72.04,"roi":35.2,"vendido":true,"facturaNum":"","clienteNombre":"Vinay Prabhakar","estado":"Vendido","notas":""},{"id":3,"fechaCompra":"2026-01-25","fechaVenta":"2026-04-02","marca":"Citizen","modelo":"Vintage","mecanismo":"Cuarzo","proveedor":"Rastro","precioCompra":20.0,"canalVenta":"Vinted","precioVenta":35.0,"envio":0.0,"comision":0.0,"beneficioNeto":12.4,"roi":62.0,"vendido":true,"facturaNum":"","clienteNombre":"Cliente particular","estado":"Vendido","notas":""},{"id":4,"fechaCompra":"2026-03-15","fechaVenta":"2026-04-02","marca":"Longines","modelo":"Flagship 8473-7","mecanismo":"Automático","proveedor":"Vinted","precioCompra":195.15,"canalVenta":"Catawiki","precioVenta":365.0,"envio":50.0,"comision":48.625,"beneficioNeto":129.36,"roi":66.3,"vendido":true,"facturaNum":"","clienteNombre":"Fabian Bravo","estado":"Vendido","notas":""},{"id":5,"fechaCompra":"2026-01-28","fechaVenta":"2026-04-02","marca":"Tissot","modelo":"PRX Caucho","mecanismo":"Cuarzo","proveedor":"TicDistribution","precioCompra":143.12,"canalVenta":"Chrono24","precioVenta":250.0,"envio":15.0,"comision":16.25,"beneficioNeto":56.23,"roi":39.3,"vendido":true,"facturaNum":"","clienteNombre":"Martin Eckhoff","estado":"Vendido","notas":""},{"id":6,"fechaCompra":"2026-03-15","fechaVenta":"2026-04-02","marca":"Tissot","modelo":"F1","mecanismo":"Cuarzo","proveedor":"Vinted","precioCompra":150.35,"canalVenta":"Catawiki","precioVenta":340.0,"envio":40.0,"comision":45.5,"beneficioNeto":137.39,"roi":91.4,"vendido":true,"facturaNum":"","clienteNombre":"Dalia Lima","estado":"Vendido","notas":""},{"id":7,"fechaCompra":"2026-02-06","fechaVenta":"2026-04-03","marca":"Longines","modelo":"Dolcevita","mecanismo":"Cuarzo","proveedor":"Cash Converters","precioCompra":176.9,"canalVenta":"Catawiki","precioVenta":360.0,"envio":45.0,"comision":48.0,"beneficioNeto":138.21,"roi":78.1,"vendido":true,"facturaNum":"","clienteNombre":"Silvio Bussatori","estado":"Vendido","notas":""},{"id":8,"fechaCompra":"2026-03-13","fechaVenta":"2026-04-04","marca":"Tissot","modelo":"Le Locle","mecanismo":"Automático","proveedor":"Cash Converters","precioCompra":189.85,"canalVenta":"Catawiki","precioVenta":400.0,"envio":30.0,"comision":53.0,"beneficioNeto":143.53,"roi":75.6,"vendido":true,"facturaNum":"","clienteNombre":"Alfonso Bifulco","estado":"Vendido","notas":""},{"id":9,"fechaCompra":"2026-03-21","fechaVenta":"2026-04-07","marca":"Seiko","modelo":"Chronograph 4T57","mecanismo":"Cuarzo","proveedor":"RealCash","precioCompra":80.95,"canalVenta":"Catawiki","precioVenta":97.0,"envio":60.0,"comision":13.125,"beneficioNeto":45.62,"roi":56.4,"vendido":true,"facturaNum":"TL-2026-078","clienteNombre":"Miloja Jon","estado":"Vendido","notas":""},{"id":10,"fechaCompra":"2026-03-20","fechaVenta":"2026-04-08","marca":"Zenith","modelo":"Stellina Jumbo","mecanismo":"Cuerda","proveedor":"Wallapop","precioCompra":220.78,"canalVenta":"Catawiki","precioVenta":375.0,"envio":0.0,"comision":49.875,"beneficioNeto":80.72,"roi":36.6,"vendido":true,"facturaNum":"","clienteNombre":"Daniele Trifance","estado":"Vendido","notas":""},{"id":11,"fechaCompra":"2026-03-22","fechaVenta":"2026-04-09","marca":"Longines","modelo":"Conquest VHP","mecanismo":"Cuarzo","proveedor":"TodoColección","precioCompra":92.0,"canalVenta":"Catawiki","precioVenta":182.0,"envio":50.0,"comision":23.75,"beneficioNeto":90.33,"roi":98.2,"vendido":true,"facturaNum":"","clienteNombre":"Gerald Tittel","estado":"Vendido","notas":""},{"id":12,"fechaCompra":"2025-11-21","fechaVenta":"2026-04-09","marca":"Seiko","modelo":"6305-05","mecanismo":"Automático","proveedor":"Noza","precioCompra":12.46,"canalVenta":"Vinted","precioVenta":70.0,"envio":0.0,"comision":0.0,"beneficioNeto":47.55,"roi":381.7,"vendido":true,"facturaNum":"","clienteNombre":"Cliente particular","estado":"Vendido","notas":""},{"id":13,"fechaCompra":"2026-03-20","fechaVenta":"2026-04-09","marca":"Seiko","modelo":"Chronograph 100M","mecanismo":"Cuarzo","proveedor":"Cash Converters","precioCompra":104.95,"canalVenta":"Catawiki","precioVenta":200.0,"envio":50.0,"comision":26.0,"beneficioNeto":92.52,"roi":88.2,"vendido":true,"facturaNum":"","clienteNombre":"Hanspeter Boege","estado":"Vendido","notas":""},{"id":14,"fechaCompra":"2026-01-28","fechaVenta":"2026-04-09","marca":"Tissot","modelo":"Gentleman T127","mecanismo":"Cuarzo","proveedor":"TicDistribution","precioCompra":178.62,"canalVenta":"Catawiki","precioVenta":300.0,"envio":35.0,"comision":38.5,"beneficioNeto":62.93,"roi":35.2,"vendido":true,"facturaNum":"","clienteNombre":"Carlos Cabezas","estado":"Vendido","notas":""},{"id":15,"fechaCompra":"2026-03-16","fechaVenta":"2026-04-10","marca":"Longines","modelo":"Comet","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":262.3,"canalVenta":"Catawiki","precioVenta":370.0,"envio":50.0,"comision":49.25,"beneficioNeto":86.53,"roi":33.0,"vendido":true,"facturaNum":"","clienteNombre":"TOMAS SALVA","estado":"Vendido","notas":""},{"id":16,"fechaCompra":"2026-03-15","fechaVenta":"2026-04-10","marca":"Seiko","modelo":"Chronograph 100M","mecanismo":"Cuarzo","proveedor":"Cash Converters","precioCompra":76.45,"canalVenta":"Catawiki","precioVenta":160.0,"envio":40.0,"comision":21.0,"beneficioNeto":80.62,"roi":105.5,"vendido":true,"facturaNum":"","clienteNombre":"Francisco Sanchez-Maroto","estado":"Vendido","notas":""},{"id":17,"fechaCompra":"2026-03-21","fechaVenta":"2026-04-10","marca":"Seiko","modelo":"6G34-00B0","mecanismo":"Cuarzo","proveedor":"RealCash","precioCompra":93.95,"canalVenta":"Catawiki","precioVenta":130.0,"envio":50.0,"comision":17.25,"beneficioNeto":50.71,"roi":54.0,"vendido":true,"facturaNum":"","clienteNombre":"Cihan Lacin","estado":"Vendido","notas":""},{"id":18,"fechaCompra":"2026-03-19","fechaVenta":"2026-04-10","marca":"Seiko","modelo":"Chrono 7T92","mecanismo":"Cuarzo","proveedor":"Vinted","precioCompra":109.65,"canalVenta":"Catawiki","precioVenta":380.0,"envio":50.0,"comision":48.5,"beneficioNeto":226.44,"roi":206.5,"vendido":true,"facturaNum":"","clienteNombre":"","estado":"Vendido","notas":""},{"id":19,"fechaCompra":"2026-02-25","fechaVenta":"2026-04-10","marca":"Tissot","modelo":"Le Locle Auto","mecanismo":"Automático","proveedor":"Cash Converters","precioCompra":265.45,"canalVenta":"Catawiki","precioVenta":330.0,"envio":50.0,"comision":42.25,"beneficioNeto":61.29,"roi":23.1,"vendido":true,"facturaNum":"","clienteNombre":"","estado":"Vendido","notas":""},{"id":20,"fechaCompra":"2026-03-27","fechaVenta":"2026-04-11","marca":"Cauny","modelo":"Centenario","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":86.19,"canalVenta":"Catawiki","precioVenta":140.0,"envio":50.0,"comision":18.5,"beneficioNeto":71.18,"roi":82.6,"vendido":true,"facturaNum":"","clienteNombre":"","estado":"Vendido","notas":""},{"id":21,"fechaCompra":"2026-03-10","fechaVenta":"2026-04-11","marca":"Tissot","modelo":"T-Race T048","mecanismo":"Cuarzo","proveedor":"Cash Converters","precioCompra":126.85,"canalVenta":"Catawiki","precioVenta":157.0,"envio":50.0,"comision":20.625,"beneficioNeto":49.95,"roi":39.4,"vendido":true,"facturaNum":"","clienteNombre":"","estado":"Vendido","notas":""},{"id":22,"fechaCompra":"2026-03-26","fechaVenta":"2026-04-12","marca":"Hamilton","modelo":"Khaki","mecanismo":"Cuarzo","proveedor":"Cash Converters","precioCompra":278.95,"canalVenta":"Catawiki","precioVenta":395.0,"envio":60.0,"comision":50.375,"beneficioNeto":105.7,"roi":37.9,"vendido":true,"facturaNum":"","clienteNombre":"Laszlo Toth","estado":"Vendido","notas":""},{"id":23,"fechaCompra":"2026-03-29","fechaVenta":"2026-04-12","marca":"Hamilton","modelo":"Khaki Field","mecanismo":"Cuarzo","proveedor":"Vinted","precioCompra":191.19,"canalVenta":"Catawiki","precioVenta":330.0,"envio":60.0,"comision":42.25,"beneficioNeto":130.93,"roi":68.5,"vendido":true,"facturaNum":"","clienteNombre":"Zsolt Juhász","estado":"Vendido","notas":""},{"id":24,"fechaCompra":"2026-03-31","fechaVenta":"","marca":"Baume & Mercier","modelo":"Geneve","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":200.0,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":25,"fechaCompra":"2026-04-08","fechaVenta":"","marca":"Baume & Mercier","modelo":"Chronograph Landeron","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":330.05,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":26,"fechaCompra":"2026-03-31","fechaVenta":"","marca":"Cauny","modelo":"Prima","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":54.69,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":27,"fechaCompra":"2026-01-25","fechaVenta":"","marca":"Citizen","modelo":"Vintage","mecanismo":"Cuarzo","proveedor":"Rastro","precioCompra":20.0,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":28,"fechaCompra":"2026-01-06","fechaVenta":"","marca":"Favre-Leuba","modelo":"Sea Chief","mecanismo":"Cuerda","proveedor":"Shah Zaib","precioCompra":64.48,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":29,"fechaCompra":"2026-03-30","fechaVenta":"","marca":"Fortis","modelo":"Vintage Art Deco NOS","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":141.09,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":30,"fechaCompra":"2026-02-05","fechaVenta":"","marca":"Hamilton","modelo":"Khaki Diver 660ft","mecanismo":"Cuarzo","proveedor":"Vinted","precioCompra":163.08,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":31,"fechaCompra":"2026-03-26","fechaVenta":"","marca":"Hamilton","modelo":"Chrono H685820","mecanismo":"Cuarzo","proveedor":"Cash Converters","precioCompra":310.45,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":32,"fechaCompra":"2026-03-29","fechaVenta":"","marca":"Hamilton","modelo":"Jazzmaster Viewmatic","mecanismo":"Automático","proveedor":"Vinted","precioCompra":244.45,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":33,"fechaCompra":"2026-01-11","fechaVenta":"","marca":"Junghans","modelo":"Vintage","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":34.79,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":34,"fechaCompra":"2026-03-27","fechaVenta":"","marca":"Junghans","modelo":"Meister","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":162.55,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":35,"fechaCompra":"2026-03-27","fechaVenta":"","marca":"Junghans","modelo":"Trilastic","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":168.9,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":36,"fechaCompra":"2026-03-15","fechaVenta":"","marca":"Longines","modelo":"Flagship","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":321.15,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":37,"fechaCompra":"2026-03-19","fechaVenta":"","marca":"Longines","modelo":"Calatrava","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":335.8,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":38,"fechaCompra":"2026-03-26","fechaVenta":"","marca":"Longines","modelo":"Ref. 3402-6","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":267.09,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":39,"fechaCompra":"2026-03-21","fechaVenta":"","marca":"Maurice Lacroix","modelo":"82188 18K","mecanismo":"Cuarzo","proveedor":"RealCash","precioCompra":105.95,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":40,"fechaCompra":"2026-03-29","fechaVenta":"","marca":"Omega","modelo":"Electronic f300 Hz","mecanismo":"Electrónico","proveedor":"Vinted","precioCompra":305.55,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":41,"fechaCompra":"2025-12-05","fechaVenta":"","marca":"Orient","modelo":"King Diver","mecanismo":"Automático","proveedor":"Vinted","precioCompra":99.09,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":42,"fechaCompra":"2025-11-21","fechaVenta":"","marca":"Seiko","modelo":"Seiko 5 / 4206","mecanismo":"Automático","proveedor":"Noza","precioCompra":12.46,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":43,"fechaCompra":"2026-02-05","fechaVenta":"","marca":"Seiko","modelo":"SQ 5Y23","mecanismo":"Cuarzo","proveedor":"Vinted","precioCompra":60.7,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":44,"fechaCompra":"2026-02-20","fechaVenta":"","marca":"Seiko","modelo":"Presage Openheart","mecanismo":"Automático","proveedor":"Vinted","precioCompra":236.05,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":45,"fechaCompra":"2026-02-23","fechaVenta":"","marca":"Seiko","modelo":"Chronograph","mecanismo":"Cuarzo","proveedor":"Cash Converters","precioCompra":98.95,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":46,"fechaCompra":"2026-03-19","fechaVenta":"","marca":"Seiko","modelo":"Presage Cocktail","mecanismo":"Automático","proveedor":"Vinted","precioCompra":225.7,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":47,"fechaCompra":"2026-03-19","fechaVenta":"","marca":"Seiko","modelo":"Chronograph 100M","mecanismo":"Cuarzo","proveedor":"Cash Converters","precioCompra":98.95,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":48,"fechaCompra":"2026-03-21","fechaVenta":"","marca":"Seiko","modelo":"5 GMT","mecanismo":"Automático","proveedor":"RealCash","precioCompra":255.95,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":49,"fechaCompra":"2026-03-26","fechaVenta":"","marca":"Seiko","modelo":"7S26 Arabic","mecanismo":"Automático","proveedor":"Vinted","precioCompra":103.75,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":50,"fechaCompra":"2026-04-08","fechaVenta":"","marca":"Seiko","modelo":"5 SNK357K1","mecanismo":"Automático","proveedor":"Vinted","precioCompra":94.34,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":51,"fechaCompra":"2026-01-28","fechaVenta":"","marca":"Tissot","modelo":"Tradition T063","mecanismo":"Cuarzo","proveedor":"TicDistribution","precioCompra":153.78,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":52,"fechaCompra":"2026-02-05","fechaVenta":"","marca":"Tissot","modelo":"Seastar 30mm","mecanismo":"Automático","proveedor":"Cash Converters","precioCompra":126.95,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":53,"fechaCompra":"2026-02-05","fechaVenta":"","marca":"Tissot","modelo":"PRX 40mm","mecanismo":"Cuarzo","proveedor":"Cash Converters","precioCompra":151.95,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":54,"fechaCompra":"2026-02-05","fechaVenta":"","marca":"Tissot","modelo":"PR100","mecanismo":"Cuarzo","proveedor":"Vinted","precioCompra":107.95,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":55,"fechaCompra":"2026-02-10","fechaVenta":"","marca":"Tissot","modelo":"T-Classic Everytime","mecanismo":"Cuarzo","proveedor":"Vinted","precioCompra":94.3,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":56,"fechaCompra":"2026-03-13","fechaVenta":"","marca":"Tissot","modelo":"Seastar Cuerda","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":49.9,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":57,"fechaCompra":"2026-03-15","fechaVenta":"","marca":"Tissot","modelo":"Seastar Auto","mecanismo":"Automático","proveedor":"Vinted","precioCompra":163.65,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":58,"fechaCompra":"2026-03-21","fechaVenta":"","marca":"Tissot","modelo":"Chrono XL","mecanismo":"Cuarzo","proveedor":"RealCash","precioCompra":165.95,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":59,"fechaCompra":"2026-03-25","fechaVenta":"","marca":"Tissot","modelo":"Chrono XL","mecanismo":"Cuarzo","proveedor":"Wallapop","precioCompra":153.98,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":60,"fechaCompra":"2026-03-26","fechaVenta":"","marca":"Tissot","modelo":"Chrono V8","mecanismo":"Cuarzo","proveedor":"Vinted","precioCompra":115.3,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":61,"fechaCompra":"2026-03-27","fechaVenta":"","marca":"Tissot","modelo":"PR100","mecanismo":"Cuarzo","proveedor":"Vinted","precioCompra":74.88,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":62,"fechaCompra":"2026-03-27","fechaVenta":"","marca":"Tissot","modelo":"Chrono XL","mecanismo":"Cuarzo","proveedor":"Wallapop","precioCompra":164.73,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":63,"fechaCompra":"2026-03-28","fechaVenta":"","marca":"Tissot","modelo":"V8","mecanismo":"Cuarzo","proveedor":"Vinted","precioCompra":153.15,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":64,"fechaCompra":"2026-04-03","fechaVenta":"","marca":"Tissot","modelo":"Everytime Gent","mecanismo":"Cuarzo","proveedor":"Vinted","precioCompra":84.28,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":65,"fechaCompra":"2026-02-01","fechaVenta":"","marca":"Zodiac","modelo":"Goldenline","mecanismo":"Automático","proveedor":"Vinted","precioCompra":278.84,"canalVenta":"","precioVenta":0,"envio":0,"comision":0.0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":66,"fechaCompra":"2026-04-10","fechaVenta":"","marca":"Tissot","modelo":"Le Locle Auto","mecanismo":"Automático","proveedor":"Vinted","precioCompra":225.55,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":67,"fechaCompra":"2026-04-11","fechaVenta":"","marca":"Zenith","modelo":"Vintage","mecanismo":"Cuerda","proveedor":"Vinted","precioCompra":152.05,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":68,"fechaCompra":"2026-04-11","fechaVenta":"","marca":"Tissot","modelo":"T-Lord","mecanismo":"Automático","proveedor":"Vinted","precioCompra":184.65,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":69,"fechaCompra":"2026-04-11","fechaVenta":"","marca":"Tissot","modelo":"Seastar Seven","mecanismo":"Automático","proveedor":"Vinted","precioCompra":136.3,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":70,"fechaCompra":"2026-04-11","fechaVenta":"","marca":"Baume & Mercier","modelo":"Classima","mecanismo":"Cuarzo","proveedor":"Vinted","precioCompra":305.4,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":71,"fechaCompra":"2026-04-12","fechaVenta":"","marca":"Rado","modelo":"Jubilé","mecanismo":"Cuarzo","proveedor":"Rastro","precioCompra":120.0,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":72,"fechaCompra":"2026-04-12","fechaVenta":"","marca":"Thermidor","modelo":"","mecanismo":"Automático","proveedor":"Rastro","precioCompra":60.0,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":73,"fechaCompra":"2026-04-12","fechaVenta":"","marca":"Oris","modelo":"","mecanismo":"Cuerda","proveedor":"Rastro","precioCompra":150.0,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":74,"fechaCompra":"2026-04-12","fechaVenta":"","marca":"Omega","modelo":"Seamaster Lady","mecanismo":"Automático","proveedor":"Rastro","precioCompra":325.0,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":75,"fechaCompra":"2026-04-12","fechaVenta":"","marca":"Maurice Lacroix","modelo":"","mecanismo":"Cuarzo","proveedor":"Rastro","precioCompra":40.0,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":76,"fechaCompra":"2026-04-12","fechaVenta":"","marca":"Certina","modelo":"Tank","mecanismo":"Cuerda","proveedor":"Rastro","precioCompra":40.0,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""},{"id":77,"fechaCompra":"2026-04-12","fechaVenta":"","marca":"Omega","modelo":"Vintage","mecanismo":"Automático","proveedor":"Rastro","precioCompra":400.0,"canalVenta":"","precioVenta":0,"envio":0,"comision":0,"beneficioNeto":null,"roi":null,"vendido":false,"facturaNum":"","clienteNombre":"","estado":"Pendiente","notas":""}];

const CANALES_COMPRA = ["Wallapop","Vinted","eBay","Cash Converters","Rastro","Noza","RealCash","TicDistribution","TodoColección","Particular","Otro"];
const CANALES_VENTA = ["Catawiki","Vinted","Chrono24","Wallapop","Particular","Otro"];
const ESTADOS = ["Pendiente","Publicado","Vendido"];
const COMISIONES = {Catawiki:0.125,Vinted:0.05,Chrono24:0.065,Wallapop:0.05,Particular:0,Otro:0};

const today = () => new Date().toISOString().split("T")[0];
const daysBetween = (a, b) => {
  if (!a) return null;
  return Math.floor((new Date(b || Date.now()) - new Date(a)) / 86400000);
};
const fmt = (n, dec = 0) => typeof n === "number" ? n.toFixed(dec) : "—";
const fmtE = (n) => typeof n === "number" ? `${n.toFixed(0)}€` : "—";

function roiColor(v) {
  if (v === null || v === undefined) return "#555";
  if (v >= 85) return "#4cd964";
  if (v >= 50) return "#ffd60a";
  return "#ff3b30";
}
function diasColor(v) {
  if (v === null) return "#555";
  if (v > 45) return "#ff3b30";
  if (v > 25) return "#ffd60a";
  return "#4cd964";
}

const emptyOp = () => ({
  id: Date.now(), marca: "", modelo: "", mecanismo: "Automático",
  proveedor: "Wallapop", precioCompra: "", gastoExtra: "",
  canalVenta: "Catawiki", precioVenta: "", envio: "50",
  fechaCompra: today(), fechaVenta: "", estado: "Pendiente",
  notas: "", clienteNombre: "", facturaNum: "", beneficioNeto: null, roi: null
});

// Bottom sheet component
function Sheet({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "#1c1c1e", borderRadius: "20px 20px 0 0",
        maxHeight: "92vh", overflow: "hidden", display: "flex", flexDirection: "column",
        animation: "slideUp 0.3s cubic-bezier(0.32,0.72,0,1)"
      }}>
        <div style={{ padding: "12px 20px 0", flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, background: "#3a3a3c", borderRadius: 2, margin: "0 auto 14px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 17, fontWeight: 600, color: "#fff", letterSpacing: -0.3 }}>{title}</span>
            <button onClick={onClose} style={{
              background: "#2c2c2e", border: "none", color: "#8e8e93", width: 30, height: 30,
              borderRadius: "50%", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
            }}>✕</button>
          </div>
        </div>
        <div style={{ overflowY: "auto", padding: "0 20px 40px", WebkitOverflowScrolling: "touch" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 12, color: "#8e8e93", marginBottom: 6, letterSpacing: 0.3, textTransform: "uppercase" }}>{label}</div>
      {children}
    </div>
  );
}

function Input({ ...props }) {
  return <input {...props} style={{
    background: "#2c2c2e", border: "none", borderRadius: 10, color: "#fff",
    padding: "13px 14px", fontSize: 16, width: "100%", outline: "none",
    WebkitAppearance: "none", ...props.style
  }} />;
}

function Select({ children, ...props }) {
  return <select {...props} style={{
    background: "#2c2c2e", border: "none", borderRadius: 10, color: "#fff",
    padding: "13px 14px", fontSize: 16, width: "100%", outline: "none",
    WebkitAppearance: "none", ...props.style
  }}>{children}</select>;
}

function Pill({ label, active, onClick, color }) {
  return (
    <button onClick={onClick} style={{
      padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer",
      fontSize: 13, fontWeight: 500, transition: "all .15s",
      background: active ? (color || "#c8aa6e") : "#2c2c2e",
      color: active ? "#000" : "#8e8e93", flexShrink: 0
    }}>{label}</button>
  );
}

export default function TimelabMobile() {
  const [ops, setOps] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : INITIAL_DATA; }
    catch { return INITIAL_DATA; }
  });
  const [tab, setTab] = useState("ops"); // ops | stock | dash
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [sheet, setSheet] = useState(null); // null | "new" | op
  const [form, setForm] = useState(emptyOp());
  const [detalle, setDetalle] = useState(null); // op detail view

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(ops)); }, [ops]);

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const saveOp = () => {
    if (!form.marca || !form.precioCompra) return alert("Marca y precio requeridos");
    if (sheet === "new") {
      setOps(prev => [{ ...form, id: Date.now() }, ...prev]);
    } else {
      setOps(prev => prev.map(o => o.id === form.id ? { ...form } : o));
    }
    setSheet(null);
  };

  const deleteOp = (id) => {
    if (confirm("¿Eliminar operación?")) { setOps(prev => prev.filter(o => o.id !== id)); setDetalle(null); }
  };

  const openEdit = (op) => { setForm({ ...op }); setSheet("edit"); setDetalle(null); };

  const filtradas = useMemo(() => {
    let r = [...ops];
    if (filtro !== "Todos") r = r.filter(o => o.estado === filtro);
    if (busqueda) r = r.filter(o => `${o.marca} ${o.modelo} ${o.proveedor}`.toLowerCase().includes(busqueda.toLowerCase()));
    return r.sort((a, b) => new Date(b.fechaCompra) - new Date(a.fechaCompra));
  }, [ops, filtro, busqueda]);

  const stats = useMemo(() => {
    const v = ops.filter(o => o.estado === "Vendido");
    const p = ops.filter(o => o.estado !== "Vendido");
    const benef = v.reduce((s, o) => s + (o.beneficioNeto || 0), 0);
    const ingr = v.reduce((s, o) => s + (parseFloat(o.precioVenta) || 0), 0);
    const roi = v.length ? v.reduce((s, o) => s + (o.roi || 0), 0) / v.length : 0;
    const capital = p.reduce((s, o) => s + (parseFloat(o.precioCompra) || 0), 0);
    const criticos = p.filter(o => daysBetween(o.fechaCompra) > 45).length;
    const dias = v.map(o => daysBetween(o.fechaCompra, o.fechaVenta)).filter(d => d >= 0);
    const diasMedio = dias.length ? dias.reduce((s, d) => s + d, 0) / dias.length : 0;
    return { vendidas: v.length, benef, ingr, roi, capital, criticos, diasMedio, total: ops.length };
  }, [ops]);

  const stockParado = useMemo(() =>
    ops.filter(o => o.estado !== "Vendido")
       .map(o => ({ ...o, dias: daysBetween(o.fechaCompra) }))
       .sort((a, b) => b.dias - a.dias),
    [ops]);

  return (
    <div style={{ background: "#000", minHeight: "100vh", maxWidth: 430, margin: "0 auto", fontFamily: "-apple-system, 'SF Pro Display', sans-serif", color: "#fff", paddingBottom: 90 }}>
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; }
        ::-webkit-scrollbar { display: none; }
        textarea { background: #2c2c2e; border: none; border-radius: 10px; color: #fff; padding: 13px 14px; font-size: 16px; width: 100%; outline: none; font-family: -apple-system, sans-serif; resize: none; }
      `}</style>

      {/* Status bar spacer */}
      <div style={{ height: "env(safe-area-inset-top, 44px)" }} />

      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, color: "#c8aa6e" }}>TIMELAB</div>
          <div style={{ fontSize: 12, color: "#636366", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 1 }}>Operations Tracker</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: stats.benef >= 0 ? "#4cd964" : "#ff3b30" }}>{fmt(stats.benef, 0)}€</div>
          <div style={{ fontSize: 11, color: "#636366" }}>{stats.vendidas} vendidas · Q2</div>
        </div>
      </div>

      {/* Quick stats bar */}
      <div style={{ display: "flex", gap: 8, padding: "0 20px 16px", overflowX: "auto" }}>
        {[
          { l: "ROI medio", v: `${fmt(stats.roi, 0)}%`, c: roiColor(stats.roi) },
          { l: "En stock", v: `${stats.total - stats.vendidas}`, c: "#fff" },
          { l: "Capital", v: `${fmt(stats.capital, 0)}€`, c: "#fff" },
          { l: "⚠️ Parados", v: `${stats.criticos}`, c: stats.criticos > 0 ? "#ff3b30" : "#4cd964" },
          { l: "Días/op", v: `${fmt(stats.diasMedio, 0)}d`, c: "#fff" },
        ].map(({ l, v, c }) => (
          <div key={l} style={{ background: "#1c1c1e", borderRadius: 12, padding: "10px 14px", flexShrink: 0, minWidth: 80, textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: c }}>{v}</div>
            <div style={{ fontSize: 10, color: "#636366", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Tab selector */}
      <div style={{ display: "flex", padding: "0 20px", gap: 8, marginBottom: 16 }}>
        {[["ops", "Operaciones"], ["stock", "Stock"], ["dash", "Resumen"]].map(([t, l]) => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
            background: tab === t ? "#c8aa6e" : "#1c1c1e",
            color: tab === t ? "#000" : "#8e8e93"
          }}>{l}</button>
        ))}
      </div>

      {/* OPERACIONES TAB */}
      {tab === "ops" && (
        <div style={{ padding: "0 20px", animation: "fadeIn .2s ease" }}>
          {/* Search */}
          <div style={{ position: "relative", marginBottom: 12 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#636366", fontSize: 16 }}>🔍</span>
            <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar marca, modelo..."
              style={{ background: "#1c1c1e", border: "none", borderRadius: 10, color: "#fff", padding: "12px 14px 12px 38px", fontSize: 15, width: "100%", outline: "none" }} />
          </div>
          {/* Filter pills */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
            {["Todos", "Pendiente", "Publicado", "Vendido"].map(fi => (
              <Pill key={fi} label={fi} active={filtro === fi} onClick={() => setFiltro(fi)} />
            ))}
          </div>
          {/* Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtradas.map(op => {
              const dias = op.estado === "Vendido" ? daysBetween(op.fechaCompra, op.fechaVenta) : daysBetween(op.fechaCompra);
              return (
                <div key={op.id} onClick={() => setDetalle(op)}
                  style={{ background: "#1c1c1e", borderRadius: 16, padding: "14px 16px", cursor: "pointer", animation: "fadeIn .15s ease" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: -0.3 }}>{op.marca}</div>
                      <div style={{ fontSize: 13, color: "#8e8e93", marginTop: 2 }}>{op.modelo || "—"}</div>
                      <div style={{ fontSize: 12, color: "#636366", marginTop: 4 }}>{op.proveedor} · {op.fechaCompra}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                      {op.beneficioNeto !== null ? (
                        <div style={{ fontSize: 18, fontWeight: 700, color: op.beneficioNeto >= 0 ? "#4cd964" : "#ff3b30" }}>
                          +{fmt(op.beneficioNeto, 0)}€
                        </div>
                      ) : (
                        <div style={{ fontSize: 14, color: "#e85050", fontWeight: 600 }}>{op.precioCompra}€</div>
                      )}
                      {op.roi !== null && (
                        <div style={{ fontSize: 12, color: roiColor(op.roi), marginTop: 2 }}>ROI {fmt(op.roi, 0)}%</div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 10, alignItems: "center" }}>
                    <span style={{
                      fontSize: 11, padding: "3px 8px", borderRadius: 6, fontWeight: 500,
                      background: op.estado === "Vendido" ? "#1a3a1a" : op.estado === "Publicado" ? "#102030" : "#2c2c2e",
                      color: op.estado === "Vendido" ? "#4cd964" : op.estado === "Publicado" ? "#60b0e8" : "#8e8e93"
                    }}>{op.estado}</span>
                    {dias !== null && (
                      <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, background: "#2c2c2e", color: diasColor(dias) }}>
                        {dias}d
                      </span>
                    )}
                    {op.canalVenta && <span style={{ fontSize: 11, color: "#636366" }}>{op.canalVenta}</span>}
                  </div>
                </div>
              );
            })}
            {filtradas.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#636366" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>⌚</div>
                <div>Sin resultados</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STOCK TAB */}
      {tab === "stock" && (
        <div style={{ padding: "0 20px", animation: "fadeIn .2s ease" }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: "#8e8e93" }}>{stockParado.length} relojes · {fmt(stats.capital, 0)}€ capital invertido</div>
          </div>
          {stockParado.map(op => {
            const urgencia = op.dias > 60 ? { label: "CRÍTICO", c: "#ff3b30", bg: "#3a1010" } :
              op.dias > 45 ? { label: "ALTO", c: "#ff9f0a", bg: "#3a2a00" } :
              op.dias > 25 ? { label: "MEDIO", c: "#ffd60a", bg: "#2a2500" } :
              { label: "OK", c: "#4cd964", bg: "#0a2010" };
            const canalSug = parseFloat(op.precioCompra) > 250 ? "Chrono24" : "Vinted";
            return (
              <div key={op.id} onClick={() => setDetalle(op)}
                style={{ background: "#1c1c1e", borderRadius: 16, padding: "14px 16px", marginBottom: 10, cursor: "pointer", borderLeft: `3px solid ${urgencia.c}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{op.marca} <span style={{ color: "#8e8e93", fontWeight: 400 }}>{op.modelo}</span></div>
                    <div style={{ fontSize: 12, color: "#636366", marginTop: 3 }}>{op.proveedor} · compra {op.precioCompra}€</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: urgencia.c }}>{op.dias}d</div>
                    <div style={{ fontSize: 10, background: urgencia.bg, color: urgencia.c, padding: "2px 6px", borderRadius: 4, marginTop: 2 }}>{urgencia.label}</div>
                  </div>
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: "#8e8e93" }}>
                  Sugerido → <span style={{ color: "#c8aa6e" }}>{canalSug}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DASHBOARD TAB */}
      {tab === "dash" && (
        <div style={{ padding: "0 20px", animation: "fadeIn .2s ease" }}>
          {[
            { l: "Beneficio neto Q2", v: `${fmt(stats.benef, 2)}€`, ok: stats.benef > 0, big: true },
            { l: "Facturación Q2", v: `${fmt(stats.ingr, 2)}€`, ok: true },
            { l: "ROI medio", v: `${fmt(stats.roi, 1)}%`, ok: stats.roi >= 85, warn: stats.roi >= 70 },
            { l: "Capital en stock", v: `${fmt(stats.capital, 2)}€`, ok: stats.capital < 8000, warn: stats.capital < 12000 },
            { l: "Días medio de venta", v: `${fmt(stats.diasMedio, 1)}d`, ok: stats.diasMedio <= 12, warn: stats.diasMedio <= 20 },
            { l: "Relojes parados >45d", v: `${stats.criticos}`, ok: stats.criticos === 0, warn: stats.criticos < 4 },
            { l: "Ops vendidas Q2", v: `${stats.vendidas}`, ok: stats.vendidas > 0 },
            { l: "Provisión IRPF 22%", v: `${fmt(stats.ingr * 0.22, 0)}€`, ok: true },
          ].map(({ l, v, ok, warn, big }) => (
            <div key={l} style={{ background: "#1c1c1e", borderRadius: 14, padding: "14px 18px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: `3px solid ${ok ? "#4cd964" : warn ? "#ffd60a" : "#ff3b30"}` }}>
              <div style={{ fontSize: 14, color: "#8e8e93" }}>{l}</div>
              <div style={{ fontSize: big ? 22 : 18, fontWeight: 600, color: ok ? "#4cd964" : warn ? "#ffd60a" : "#ff3b30" }}>{v}</div>
            </div>
          ))}
        </div>
      )}

      {/* FAB - Nueva operación */}
      <button onClick={() => { setForm(emptyOp()); setSheet("new"); }} style={{
        position: "fixed", bottom: `calc(80px + env(safe-area-inset-bottom, 0px))`, right: 20,
        width: 56, height: 56, borderRadius: "50%", background: "#c8aa6e", border: "none",
        fontSize: 26, cursor: "pointer", boxShadow: "0 4px 20px rgba(200,170,110,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
        color: "#000", fontWeight: 300
      }}>+</button>

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430, background: "rgba(28,28,30,0.95)",
        backdropFilter: "blur(20px)", borderTop: "1px solid #2c2c2e",
        padding: `12px 0 calc(12px + env(safe-area-inset-bottom, 0px))`,
        display: "flex", zIndex: 50
      }}>
        {[["ops", "📋", "Ops"], ["stock", "📦", "Stock"], ["dash", "📊", "Resumen"]].map(([t, ic, l]) => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3
          }}>
            <span style={{ fontSize: 20 }}>{ic}</span>
            <span style={{ fontSize: 10, color: tab === t ? "#c8aa6e" : "#636366", fontWeight: tab === t ? 600 : 400 }}>{l}</span>
          </button>
        ))}
      </div>

      {/* DETALLE SHEET */}
      <Sheet open={!!detalle} onClose={() => setDetalle(null)} title={detalle ? `${detalle.marca} ${detalle.modelo}` : ""}>
        {detalle && (() => {
          const dias = detalle.estado === "Vendido" ? daysBetween(detalle.fechaCompra, detalle.fechaVenta) : daysBetween(detalle.fechaCompra);
          return (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {[
                  ["Coste", `${detalle.precioCompra}€`],
                  ["Venta", detalle.precioVenta ? `${detalle.precioVenta}€` : "—"],
                  ["Beneficio", detalle.beneficioNeto !== null ? `${fmt(detalle.beneficioNeto, 2)}€` : "—"],
                  ["ROI", detalle.roi !== null ? `${fmt(detalle.roi, 1)}%` : "—"],
                  ["Canal", detalle.canalVenta || "—"],
                  ["Proveedor", detalle.proveedor],
                  ["Días", dias !== null ? `${dias}d` : "—"],
                  ["Estado", detalle.estado],
                ].map(([l, v]) => (
                  <div key={l} style={{ background: "#2c2c2e", borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, color: "#636366", marginBottom: 4 }}>{l}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{v}</div>
                  </div>
                ))}
              </div>
              {detalle.clienteNombre && <div style={{ background: "#2c2c2e", borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: "#636366", marginBottom: 4 }}>Cliente</div>
                <div style={{ fontSize: 14, color: "#fff" }}>{detalle.clienteNombre}</div>
              </div>}
              {detalle.facturaNum && <div style={{ background: "#2c2c2e", borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: "#636366", marginBottom: 4 }}>Factura</div>
                <div style={{ fontSize: 14, color: "#c8aa6e" }}>{detalle.facturaNum}</div>
              </div>}
              {detalle.notas && <div style={{ background: "#2c2c2e", borderRadius: 10, padding: "12px 14px", marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#636366", marginBottom: 4 }}>Notas</div>
                <div style={{ fontSize: 14, color: "#fff" }}>{detalle.notas}</div>
              </div>}
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => openEdit(detalle)} style={{ flex: 1, background: "#c8aa6e", border: "none", borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 600, cursor: "pointer", color: "#000" }}>Editar</button>
                <button onClick={() => deleteOp(detalle.id)} style={{ background: "#3a1010", border: "none", borderRadius: 12, padding: "14px 18px", fontSize: 15, cursor: "pointer", color: "#ff3b30" }}>🗑</button>
              </div>
            </div>
          );
        })()}
      </Sheet>

      {/* FORM SHEET */}
      <Sheet open={sheet === "new" || sheet === "edit"} onClose={() => setSheet(null)} title={sheet === "new" ? "Nueva operación" : "Editar operación"}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ gridColumn: "1/-1" }}>
            <Field label="Marca *"><Input value={form.marca} onChange={e => f("marca", e.target.value)} placeholder="Tissot" /></Field>
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <Field label="Modelo"><Input value={form.modelo} onChange={e => f("modelo", e.target.value)} placeholder="Le Locle" /></Field>
          </div>
          <Field label="Mecanismo">
            <Select value={form.mecanismo} onChange={e => f("mecanismo", e.target.value)}>
              {["Automático","Cuarzo","Cuerda","Electrónico"].map(m => <option key={m}>{m}</option>)}
            </Select>
          </Field>
          <Field label="Proveedor">
            <Select value={form.proveedor} onChange={e => f("proveedor", e.target.value)}>
              {CANALES_COMPRA.map(c => <option key={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Precio compra (€) *">
            <Input type="number" inputMode="decimal" value={form.precioCompra} onChange={e => f("precioCompra", e.target.value)} placeholder="0" />
          </Field>
          <Field label="Gasto extra (€)">
            <Input type="number" inputMode="decimal" value={form.gastoExtra || ""} onChange={e => f("gastoExtra", e.target.value)} placeholder="0" />
          </Field>
          <div style={{ gridColumn: "1/-1" }}>
            <Field label="Fecha compra"><Input type="date" value={form.fechaCompra} onChange={e => f("fechaCompra", e.target.value)} /></Field>
          </div>

          <div style={{ gridColumn: "1/-1", height: 1, background: "#2c2c2e", margin: "4px 0" }} />

          <Field label="Canal venta">
            <Select value={form.canalVenta} onChange={e => f("canalVenta", e.target.value)}>
              {CANALES_VENTA.map(c => <option key={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Envío cobrado (€)">
            <Input type="number" inputMode="decimal" value={form.envio} onChange={e => f("envio", e.target.value)} />
          </Field>
          <Field label="Precio venta (€)">
            <Input type="number" inputMode="decimal" value={form.precioVenta} onChange={e => f("precioVenta", e.target.value)} placeholder="0" />
          </Field>
          <Field label="Estado">
            <Select value={form.estado} onChange={e => f("estado", e.target.value)}>
              {ESTADOS.map(s => <option key={s}>{s}</option>)}
            </Select>
          </Field>
          {form.estado === "Vendido" && (
            <div style={{ gridColumn: "1/-1" }}>
              <Field label="Fecha venta"><Input type="date" value={form.fechaVenta} onChange={e => f("fechaVenta", e.target.value)} /></Field>
            </div>
          )}
          <div style={{ gridColumn: "1/-1" }}>
            <Field label="Cliente"><Input value={form.clienteNombre} onChange={e => f("clienteNombre", e.target.value)} placeholder="Nombre comprador" /></Field>
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <Field label="Nº Factura"><Input value={form.facturaNum} onChange={e => f("facturaNum", e.target.value)} placeholder="TL-2026-XXX" /></Field>
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <Field label="Notas"><textarea value={form.notas} onChange={e => f("notas", e.target.value)} rows={3} placeholder="Condición, incidencias..." /></Field>
          </div>
        </div>

        {/* Preview cálculo */}
        {form.precioCompra && form.precioVenta && (
          <div style={{ background: "#2c2c2e", borderRadius: 12, padding: "14px 16px", marginTop: 8, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "#636366", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Preview</div>
            {(() => {
              const pc = parseFloat(form.precioCompra) || 0;
              const ge = parseFloat(form.gastoExtra) || 0;
              const pv = parseFloat(form.precioVenta) || 0;
              const env = parseFloat(form.envio) || 0;
              const com = COMISIONES[form.canalVenta] || 0;
              const coste = pc + ge;
              const ingreso = pv + env - pv * com - 10;
              const benef = ingreso - coste;
              const roi = coste > 0 ? (benef / coste) * 100 : 0;
              return (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[["Coste total", `${coste.toFixed(0)}€`], ["Beneficio", `${benef.toFixed(0)}€`, benef >= 0 ? "#4cd964" : "#ff3b30"], ["ROI", `${roi.toFixed(0)}%`, roiColor(roi)], ["Ingreso neto", `${ingreso.toFixed(0)}€`]].map(([l, v, c]) => (
                    <div key={l}>
                      <div style={{ fontSize: 11, color: "#636366" }}>{l}</div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: c || "#fff" }}>{v}</div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        <button onClick={saveOp} style={{
          width: "100%", background: "#c8aa6e", border: "none", borderRadius: 14,
          padding: 16, fontSize: 16, fontWeight: 600, cursor: "pointer", color: "#000", marginTop: 8
        }}>
          {sheet === "new" ? "Guardar operación" : "Actualizar"}
        </button>
      </Sheet>
    </div>
  );
}

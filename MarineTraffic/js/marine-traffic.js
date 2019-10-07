var MarineTraffic = (function(win, doc) {

	//https://services.marinetraffic.com/api/exportvesseltrack/cf8f05df0b57bfae43e762cc61fd381239c4c042/v:2/period:daily/days:170/mmsi:241486000/protocol:jsono

	var Config = {
		endPoint: 'https://services.marinetraffic.com/api/exportvesseltrack/cf8f05df0b57bfae43e762cc61fd381239c4c042/v:2/period:daily/days:1/protocol:jsono',
		timeout: 5000,
		animationInterval: 2000
	}
	
	var VesselStatus = {
		0: 'under way using engine',
		1: 'at anchor',
		2: 'not under command',
		3: 'restricted maneuverability',
		4: 'constrained by her draught',
		5: 'moored',
		6: 'aground',
		7: 'engaged in fishing',
		8: 'under way sailing',
		11: 'power-driven vessel towing astern',
		12: 'power-driven vessel pushing ahead or towing alongside'
	}
	
	var map = null,
		mapTimer = null
		mapWaypoints = [],
		mapLastWaypoint = null,
		mapWaypointsCluster = [];

	win.onload = init;

	// Initialize MarineTraffic
	function init() {
		'use strict';
		
		// create the map
		map = L.map('map', {
			center: [37.9974, 23.7695],
			zoom: 5
		});
		
		// add map layer
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
			maxZoom: 16
		}).addTo(map);
		
		animate();

		// attach event handlers
		map.on('movestart', function(){
			mapTimer.pause();
		});
		
		map.on('moveend', function(){
			mapTimer.resume();
		});
	}
	
	function getMockWaypoints() {
		return [{"MMSI":"241486000","STATUS":"0","SPEED":"107","LON":"100.707600","LAT":"12.474530","COURSE":"335","HEADING":"335","TIMESTAMP":"2019-04-23T02:59:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"5","SPEED":"1","LON":"100.779200","LAT":"13.073410","COURSE":"199","HEADING":"227","TIMESTAMP":"2019-04-24T00:52:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"5","SPEED":"1","LON":"100.778600","LAT":"13.074030","COURSE":"242","HEADING":"203","TIMESTAMP":"2019-04-25T00:46:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"132","LON":"102.811300","LAT":"8.441200","COURSE":"155","HEADING":"156","TIMESTAMP":"2019-04-26T12:34:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"141","LON":"104.667000","LAT":"1.703485","COURSE":"205","HEADING":"207","TIMESTAMP":"2019-04-27T20:45:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"81","LON":"104.130100","LAT":"1.282580","COURSE":"261","HEADING":"261","TIMESTAMP":"2019-04-28T00:46:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"1","LON":"103.647700","LAT":"1.215320","COURSE":"329","HEADING":"146","TIMESTAMP":"2019-04-29T00:13:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"1","LON":"103.648600","LAT":"1.215173","COURSE":"73","HEADING":"186","TIMESTAMP":"2019-04-30T00:16:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"0","LON":"103.647600","LAT":"1.214298","COURSE":"223","HEADING":"120","TIMESTAMP":"2019-05-01T00:25:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"0","LON":"103.647300","LAT":"1.214177","COURSE":"226","HEADING":"123","TIMESTAMP":"2019-05-02T00:27:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"0","LON":"103.682400","LAT":"1.211333","COURSE":"99","HEADING":"86","TIMESTAMP":"2019-05-03T00:28:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"0","LON":"103.682900","LAT":"1.211323","COURSE":"170","HEADING":"87","TIMESTAMP":"2019-05-04T00:31:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"0","LON":"103.687700","LAT":"1.210570","COURSE":"204","HEADING":"301","TIMESTAMP":"2019-05-05T00:52:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"5","SPEED":"0","LON":"103.681900","LAT":"1.228630","COURSE":"213","HEADING":"44","TIMESTAMP":"2019-05-06T00:53:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"63","LON":"104.269200","LAT":"1.301233","COURSE":"259","HEADING":"261","TIMESTAMP":"2019-05-08T17:52:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"0","LON":"104.065900","LAT":"1.306345","COURSE":"200","HEADING":"250","TIMESTAMP":"2019-05-09T00:51:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"1","LON":"104.065700","LAT":"1.306700","COURSE":"38","HEADING":"244","TIMESTAMP":"2019-05-10T00:00:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"5","SPEED":"1","LON":"103.831400","LAT":"1.466727","COURSE":"14","HEADING":"299","TIMESTAMP":"2019-05-31T08:24:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"5","SPEED":"0","LON":"103.831400","LAT":"1.466698","COURSE":"332","HEADING":"299","TIMESTAMP":"2019-06-01T00:36:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"5","SPEED":"0","LON":"103.831400","LAT":"1.466682","COURSE":"330","HEADING":"299","TIMESTAMP":"2019-06-02T00:48:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"5","SPEED":"0","LON":"103.831400","LAT":"1.466688","COURSE":"92","HEADING":"299","TIMESTAMP":"2019-06-03T00:08:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"5","SPEED":"1","LON":"103.831400","LAT":"1.466732","COURSE":"93","HEADING":"299","TIMESTAMP":"2019-06-04T00:02:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"5","SPEED":"0","LON":"103.831400","LAT":"1.466733","COURSE":"23","HEADING":"299","TIMESTAMP":"2019-06-05T00:07:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"77","LON":"103.895700","LAT":"1.429533","COURSE":"96","HEADING":"95","TIMESTAMP":"2019-06-06T00:27:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"0","LON":"103.914700","LAT":"1.269208","COURSE":"324","HEADING":"230","TIMESTAMP":"2019-06-07T00:31:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"113","LON":"103.656900","LAT":"1.179397","COURSE":"289","HEADING":"282","TIMESTAMP":"2019-06-08T00:30:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"145","LON":"98.745810","LAT":"4.994470","COURSE":"311","HEADING":"310","TIMESTAMP":"2019-06-09T06:37:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"109","LON":"81.559770","LAT":"5.824335","COURSE":"271","HEADING":"264","TIMESTAMP":"2019-06-12T23:03:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"116","LON":"81.110200","LAT":"5.804400","COURSE":"269","HEADING":"266","TIMESTAMP":"2019-06-13T01:27:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"35","LON":"80.242800","LAT":"5.807842","COURSE":"343","HEADING":"320","TIMESTAMP":"2019-06-14T00:26:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"44","LON":"60.352570","LAT":"23.232230","COURSE":"309","HEADING":"316","TIMESTAMP":"2019-06-20T14:51:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"57","LON":"59.540230","LAT":"23.945260","COURSE":"315","HEADING":"304","TIMESTAMP":"2019-06-21T01:56:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"48","LON":"57.963880","LAT":"25.011210","COURSE":"300","HEADING":"302","TIMESTAMP":"2019-06-22T00:43:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"126","LON":"53.842590","LAT":"26.254920","COURSE":"290","HEADING":"293","TIMESTAMP":"2019-06-23T00:55:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"0","LON":"50.296450","LAT":"27.108230","COURSE":"71","HEADING":"185","TIMESTAMP":"2019-06-24T00:00:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"5","SPEED":"0","LON":"50.046870","LAT":"26.954750","COURSE":"166","HEADING":"196","TIMESTAMP":"2019-06-25T01:49:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"126","LON":"52.282760","LAT":"27.073310","COURSE":"108","HEADING":"100","TIMESTAMP":"2019-06-26T00:03:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"90","LON":"56.140110","LAT":"26.399090","COURSE":"62","HEADING":"61","TIMESTAMP":"2019-06-27T00:56:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"121","LON":"95.178770","LAT":"6.291993","COURSE":"96","HEADING":"99","TIMESTAMP":"2019-07-06T15:44:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"119","LON":"96.689540","LAT":"5.863101","COURSE":"107","HEADING":"108","TIMESTAMP":"2019-07-07T00:22:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"126","LON":"100.825800","LAT":"2.869282","COURSE":"120","HEADING":"120","TIMESTAMP":"2019-07-08T02:15:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"141","LON":"122.320600","LAT":"23.833530","COURSE":"26","HEADING":"25","TIMESTAMP":"2019-07-14T15:47:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"100","LON":"123.952000","LAT":"31.203470","COURSE":"3","HEADING":"358","TIMESTAMP":"2019-07-16T04:25:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"125","LON":"123.874800","LAT":"34.807250","COURSE":"16","HEADING":"18","TIMESTAMP":"2019-07-17T01:58:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"126","LON":"121.272900","LAT":"38.442470","COURSE":"299","HEADING":"298","TIMESTAMP":"2019-07-18T00:14:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"85","LON":"118.144800","LAT":"38.903650","COURSE":"307","HEADING":"306","TIMESTAMP":"2019-07-19T00:42:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"5","SPEED":"0","LON":"117.758500","LAT":"38.972780","COURSE":"277","HEADING":"291","TIMESTAMP":"2019-07-20T00:03:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"5","SPEED":"0","LON":"117.758600","LAT":"38.972760","COURSE":"156","HEADING":"291","TIMESTAMP":"2019-07-21T00:25:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"124","LON":"122.923400","LAT":"37.589400","COURSE":"139","HEADING":"140","TIMESTAMP":"2019-07-22T00:55:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"111","LON":"123.569100","LAT":"31.392760","COURSE":"180","HEADING":"183","TIMESTAMP":"2019-07-23T10:22:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"100","LON":"122.283400","LAT":"27.917030","COURSE":"209","HEADING":"213","TIMESTAMP":"2019-07-24T05:47:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"122","LON":"120.304600","LAT":"24.635780","COURSE":"201","HEADING":"203","TIMESTAMP":"2019-07-25T00:58:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"97","LON":"104.417300","LAT":"1.402827","COURSE":"227","HEADING":"224","TIMESTAMP":"2019-07-30T22:21:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"77","LON":"104.153600","LAT":"1.283380","COURSE":"263","HEADING":"263","TIMESTAMP":"2019-07-31T00:20:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"0","LON":"103.910600","LAT":"1.265428","COURSE":"117","HEADING":"71","TIMESTAMP":"2019-08-01T00:19:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"168","LON":"-43.376130","LAT":"-23.602370","COURSE":"280","HEADING":"283","TIMESTAMP":"2019-08-29T09:55:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"1","LON":"-44.481300","LAT":"-23.142880","COURSE":"252","HEADING":"162","TIMESTAMP":"2019-08-30T00:19:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"5","SPEED":"0","LON":"-44.229410","LAT":"-23.061530","COURSE":"317","HEADING":"100","TIMESTAMP":"2019-08-31T02:46:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"5","SPEED":"0","LON":"-44.229440","LAT":"-23.061530","COURSE":"137","HEADING":"99","TIMESTAMP":"2019-09-01T01:52:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"146","LON":"-43.681870","LAT":"-23.539380","COURSE":"103","HEADING":"103","TIMESTAMP":"2019-09-02T00:22:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"125","LON":"-18.050480","LAT":"12.652940","COURSE":"0","HEADING":"359","TIMESTAMP":"2019-09-18T18:17:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"131","LON":"-18.058620","LAT":"13.924070","COURSE":"359","HEADING":"359","TIMESTAMP":"2019-09-19T00:15:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"126","LON":"-18.113710","LAT":"19.831800","COURSE":"358","HEADING":"357","TIMESTAMP":"2019-09-20T03:12:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"141","LON":"-17.097210","LAT":"24.273120","COURSE":"20","HEADING":"20","TIMESTAMP":"2019-09-21T00:16:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"132","LON":"-12.240280","LAT":"37.735370","COURSE":"15","HEADING":"14","TIMESTAMP":"2019-09-23T16:07:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"130","LON":"-11.304940","LAT":"40.875770","COURSE":"12","HEADING":"10","TIMESTAMP":"2019-09-24T06:28:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"120","LON":"-9.603494","LAT":"44.668460","COURSE":"26","HEADING":"22","TIMESTAMP":"2019-09-25T01:20:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"150","LON":"-5.603818","LAT":"48.773890","COURSE":"34","HEADING":"42","TIMESTAMP":"2019-09-26T00:16:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"146","LON":"1.719922","LAT":"51.130180","COURSE":"29","HEADING":"25","TIMESTAMP":"2019-09-27T00:08:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"1","LON":"3.150970","LAT":"51.938700","COURSE":"344","HEADING":"233","TIMESTAMP":"2019-09-28T00:12:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"2","LON":"3.149075","LAT":"51.938040","COURSE":"310","HEADING":"220","TIMESTAMP":"2019-09-29T00:30:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"2","LON":"3.150490","LAT":"51.933980","COURSE":"201","HEADING":"286","TIMESTAMP":"2019-09-30T00:21:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"1","LON":"3.149912","LAT":"51.936610","COURSE":"325","HEADING":"232","TIMESTAMP":"2019-10-01T00:48:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"1","LON":"3.142978","LAT":"51.931560","COURSE":"175","HEADING":"17","TIMESTAMP":"2019-10-02T00:24:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"1","LON":"3.143607","LAT":"51.932300","COURSE":"112","HEADING":"353","TIMESTAMP":"2019-10-03T00:54:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"1","LON":"3.143208","LAT":"51.933800","COURSE":"324","HEADING":"54","TIMESTAMP":"2019-10-04T00:06:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"0","LON":"3.143220","LAT":"51.934450","COURSE":"165","HEADING":"39","TIMESTAMP":"2019-10-05T00:27:00","SHIP_ID":"4910653"}];
		return [{"MMSI":"241486000","STATUS":"0","SPEED":"125","LON":"-18.050480","LAT":"12.652940","COURSE":"0","HEADING":"359","TIMESTAMP":"2019-09-18T18:17:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"131","LON":"-18.058620","LAT":"13.924070","COURSE":"359","HEADING":"359","TIMESTAMP":"2019-09-19T00:15:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"126","LON":"-18.113710","LAT":"19.831800","COURSE":"358","HEADING":"357","TIMESTAMP":"2019-09-20T03:12:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"141","LON":"-17.097210","LAT":"24.273120","COURSE":"20","HEADING":"20","TIMESTAMP":"2019-09-21T00:16:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"132","LON":"-12.240280","LAT":"37.735370","COURSE":"15","HEADING":"14","TIMESTAMP":"2019-09-23T16:07:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"130","LON":"-11.304940","LAT":"40.875770","COURSE":"12","HEADING":"10","TIMESTAMP":"2019-09-24T06:28:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"120","LON":"-9.603494","LAT":"44.668460","COURSE":"26","HEADING":"22","TIMESTAMP":"2019-09-25T01:20:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"150","LON":"-5.603818","LAT":"48.773890","COURSE":"34","HEADING":"42","TIMESTAMP":"2019-09-26T00:16:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"0","SPEED":"146","LON":"1.719922","LAT":"51.130180","COURSE":"29","HEADING":"25","TIMESTAMP":"2019-09-27T00:08:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"1","LON":"3.150970","LAT":"51.938700","COURSE":"344","HEADING":"233","TIMESTAMP":"2019-09-28T00:12:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"2","LON":"3.149075","LAT":"51.938040","COURSE":"310","HEADING":"220","TIMESTAMP":"2019-09-29T00:30:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"2","LON":"3.150490","LAT":"51.933980","COURSE":"201","HEADING":"286","TIMESTAMP":"2019-09-30T00:21:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"1","LON":"3.149912","LAT":"51.936610","COURSE":"325","HEADING":"232","TIMESTAMP":"2019-10-01T00:48:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"1","LON":"3.142978","LAT":"51.931560","COURSE":"175","HEADING":"17","TIMESTAMP":"2019-10-02T00:24:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"1","LON":"3.143607","LAT":"51.932300","COURSE":"112","HEADING":"353","TIMESTAMP":"2019-10-03T00:54:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"1","LON":"3.143208","LAT":"51.933800","COURSE":"324","HEADING":"54","TIMESTAMP":"2019-10-04T00:06:00","SHIP_ID":"4910653"},{"MMSI":"241486000","STATUS":"1","SPEED":"0","LON":"3.143220","LAT":"51.934450","COURSE":"165","HEADING":"39","TIMESTAMP":"2019-10-05T00:27:00","SHIP_ID":"4910653"}];
	}
	
	function animate() {

		mapWaypoints = getMockWaypoints();
		
		if(mapWaypoints != null && mapWaypoints.length > 0)
		{
			mapTimer = new Timer(function(){
				
				var currentZoom = map.getZoom(),
					wp = mapWaypoints.shift(),
					mapLastWaypoint = wp; // save last waypoint
					
				if( wp != null)
				{
					var wpCoords = [wp.LAT, wp.LON],
						wpMarker = L.marker(wpCoords).addTo(map);
				
					hideAllTooltips();
				
					// add tooltip to marker
					wpMarker.bindTooltip(getTooltipContent(wp)).openTooltip();
					
					// draw waypoints cluster
					if(mapLastWaypoint != null && dateDiffInDays(mapLastWaypoint.TIMESTAMP, wp.TIMESTAMP) <= 2)
						mapWaypointsCluster.push(wpCoords);
					else
						mapWaypointsCluster = [wpCoords];
					
					var polyline = L.polyline(mapWaypointsCluster, {color: 'red'}).addTo(map);
				
					// zoom in on low sailing speeds
					map.flyTo(wpCoords, (wp.STATUS == 1 && currentZoom <= 13 ? currentZoom + 3 : 5));
				}
				else
				{
					mapTimer.pause();
					//map.fitWorld();
				}

			}, Config.animationInterval);
		}
	}
	
	function getTooltipContent(info) {
		var buffer = [];
		
		var timestamp = new Date(info.TIMESTAMP);
		var dd = timestamp.getDate();
		var mm = timestamp.getMonth() + 1; 
		var yyyy = timestamp.getFullYear();
		
		buffer.push(
			'<table>',
				'<caption><strong>' + dd + '/' + mm + '/' + yyyy + '</strong></caption>',
				'<tr><td>Status:</td><td>'+ VesselStatus[info.STATUS] +'</td></tr>',
				'<tr><td>Speed:</td><td>'+ info.SPEED +'</td></tr>',
			'</table>'
		)
		
		return buffer.join('');
	}
	
	function hideAllTooltips() {
		map.eachLayer(function(layer) {
			if(layer.options.pane === "tooltipPane") layer.removeFrom(map);
		});
	}
	
	function dateDiffInDays(date1, date2) {
		dt1 = new Date(date1);
		dt2 = new Date(date2);
		return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
	}
	
	function Timer(callback, delay) {
		var timerId,
			start, remaining = delay;

		this.pause = function() {
			win.clearTimeout(timerId);
		};

		this.resume = function() {
			win.clearTimeout(timerId);
			timerId = win.setTimeout(callback, remaining);
		};

		this.resume();
	}
	
	function client(options, success, error) {
		'use strict';

		var xhr = new XMLHttpRequest();
		xhr.open('GET', Config.baseURL + options.url, true);
		xhr.timeout = Config.timeout;
		xhr.onload = function(e) {
		  if (xhr.readyState === 4) {
			if (xhr.status === 200) {
			  success(xhr.responseText);
			} else {
			  error(xhr.responseText);
			}
		  } else {
			error(xhr.responseText);
		  }
		};
		xhr.onerror = function(e) {
		  error(xhr.responseText);
		};
		xhr.ontimeout = function() {
		  error('{"status_code":408,"status_message":"Request timed out"}');
		};
		xhr.send(null);
	}

})(window, document);
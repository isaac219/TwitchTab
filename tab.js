//display the stream as an iframe in new tab
function displayStream(callback) {
	chrome.storage.sync.get("checkboxClipMode", function(result){ 
	var bool = result.checkboxClipMode;
 	if(bool) {
		document.getElementById("displayTitle").innerHTML = "";
		//document.getElementById("display").innerHTML = "";
		document.getElementById("stream").style.display = "none";
		document.getElementById("chat").style.display = "none";
	}
	else {
		document.getElementById("clips-display").innerHTML = "";
		var savedChannel = "";
//		var vid = '<iframe src="https://twitch.tv/channelgoeshere/embed" height="378px" width="620px" frameborder="0" scrolling="no" allowfullscreen="true"> </iframe>';
//  		var chat = '<iframe style="width: 350px; height: 379px;" scrolling="no" frameborder="0" src="https://www.twitch.tv/channelgoeshere/chat?popout="></iframe>';
 		chrome.storage.sync.get("streamSource", function(result){
	      		savedChannel = result.streamSource;   
	     		if(savedChannel=== (undefined || "")) {//beginning 
	       			document.getElementById("displayTitle").innerHTML = "Set your channel by clicking the extension!";
	       			//document.getElementById("display").innerHTML = "";
					//document.getElementById("stream").src= "";
					//document.getElementById("chat").src= "";
					document.getElementById("stream").style.display = "none";
					document.getElementById("chat").style.display = "none";
	     		}
	     		else {
			      //vid = vid.replace("channelgoeshere", savedChannel);
			      //chat = chat.replace("channelgoeshere", savedChannel);
			      //document.getElementById("display").innerHTML = vid + chat;		      
			      document.getElementById("displayTitle").innerHTML = ""; 
			      var currentlyViewing = document.getElementById("displayTitle");
			      var linkedStream = currentlyViewing.appendChild(document.createElement('a'));
			      linkedStream.appendChild(document.createTextNode(savedChannel));
			      linkedStream.href = ("https://twitch.tv/" + savedChannel);
				  
				  document.getElementById("stream").src="https://twitch.tv/" + savedChannel + "/embed";
				  document.getElementById("chat").src = "https://twitch.tv/" + savedChannel + "/chat?popout=";
	     		}
  		});
  	}
});
}

//display table of top sites on new tab
function displayTopSites(topURLs) {
	var table = document.getElementById('mostVisited_table');
	var tr1 = table.appendChild(document.createElement('tr'));
	var tr2 = table.appendChild(document.createElement('tr'));
	for (var i = 0; i < topURLs.length/2; i++) {
		var a;
	    	if(i<topURLs.length/4) {
	     		var td1 = tr1.appendChild(document.createElement('td'));
	      		a = td1.appendChild(document.createElement('a'));
	    	}
	    
	   	else{
			var td2 = tr2.appendChild(document.createElement('td'));
		      	a = td2.appendChild(document.createElement('a'));
	    	}
		a.href = topURLs[i].url;
		a.appendChild(document.createTextNode(topURLs[i].title));
  	}
}

//http request for twitch clips
var clipRequest = 'https://api.twitch.tv/kraken/clips/top?limit=25&type=Super%20Smash%20Bros.%20Melee&trending=true';
var httpRequest = new XMLHttpRequest();
chrome.storage.sync.get(["clipType","clipSource"], function(result){
	clipRequest = clipRequest.replace('type',result.clipType);
	clipRequest = clipRequest.replace('Super%20Smash%20Bros.%20Melee',result.clipSource);	
	httpRequest.addEventListener('load', displayClips);
	httpRequest.open('GET', clipRequest);
	httpRequest.setRequestHeader('Client-ID', 'sqhg7mrryjn21en5d8e10034yez324');
	httpRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
	httpRequest.send();
});
	
//display clips in new tab
function displayClips(callback) {
chrome.storage.sync.get("checkboxClipMode", function(result){
	var bool = result.checkboxClipMode;
    	if(bool) {
			var clipsDisplay = document.getElementById('display'), clipList = JSON.parse(httpRequest.responseText); 
			var random = Math.floor(Math.random() * (25 - 0)) + 0;
			clipItem = document.createElement('div');
			clipItem.innerHTML=clipList.clips[random].embed_html;			
			if (!clipsDisplay.hasChildNodes()) { 
				clipsDisplay.appendChild(clipItem);	
			}
			document.getElementById("displayTitle").innerHTML = clipList.clips[random].title;
		}
    });
}


chrome.topSites.get(displayTopSites);
document.addEventListener("DOMContentLoaded", displayTopSites);

chrome.storage.onChanged.addListener(displayStream);  
document.addEventListener("DOMContentLoaded", displayStream);
	
chrome.storage.onChanged.addListener(displayClips);



//set stream value in chrome storage
function setStream(callback) {
  var data = document.getElementById("streamChoice").value;
  chrome.storage.sync.set({ "streamSource": data });
}

//gets stream from chrome storage
function currentStream(callback) {
    chrome.storage.sync.get("streamSource", function(result){
    saved = result.streamSource;
    document.getElementById("currentStream").innerHTML = "Current Stream: " + saved;
  });
}

//sets value of viewing mode in chrome storage
function checkboxClipMode(callback) {
  var checkedBool = document.getElementById("toggle").checked;
  chrome.storage.sync.set({"checkboxClipMode": checkedBool });
}

//checks previous value of viewing mode from chrome storage
function checkInitial(callback) {
  chrome.storage.sync.get("checkboxClipMode", function(result){
    bool = result.checkboxClipMode;
    document.getElementById("toggle").checked = bool; 
  });
}

//sets clip source in chrome storage
function setClipSource(callback) {
  var data = document.getElementById("clipChoice").value;
  chrome.storage.sync.set({ "clipSource": data });
}

//gets clip source from chrome storage
function currentClipSource(callback) {
  chrome.storage.sync.get(["clipSource","clipType"], function(result){
    document.getElementById("currentClipSource").innerHTML = "Current Clip Source: " + result.clipType + ": " + result.clipSource;
  });
}

//sets type of clip as game or channel in chrome storage
function setClipType(callback) {
  var buttons = document.getElementsByName('clipRadio');
  for (var i = 0, length = buttons.length; i < length; i++) {
    if (buttons[i].checked) {
      var typeValue = buttons[i].value;
        console.log(typeValue);
        chrome.storage.sync.set({ "clipType": typeValue });
        break;
    }
  }
}

document.getElementById('streamButton').addEventListener('click', setStream);
document.getElementById('clipButton').addEventListener('click', setClipSource);
document.getElementById('clipButton2').addEventListener('click', setClipType);

chrome.storage.onChanged.addListener(currentStream);
document.addEventListener("DOMContentLoaded", currentStream);

chrome.storage.onChanged.addListener(currentClipSource);
document.addEventListener("DOMContentLoaded", currentClipSource);

document.getElementById("toggle").addEventListener("change", checkboxClipMode);
document.addEventListener("DOMContentLoaded", checkInitial);









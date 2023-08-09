chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var memeURL = message.memeURL;
    
    var memeDiv = document.createElement('div');
    memeDiv.style.position = 'fixed';
    memeDiv.style.top = '0';
    memeDiv.style.left = '50%';
    memeDiv.style.transform = 'translateX(-50%)';
    memeDiv.style.zIndex = '10000';
  
    var memeImg = document.createElement('img');
    memeImg.src = memeURL;
    memeImg.style.width = '200px';
    memeImg.style.height = '200px';
  
    memeDiv.appendChild(memeImg);
    document.body.appendChild(memeDiv);
  });
  
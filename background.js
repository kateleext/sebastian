chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('Tab updated:', tabId, changeInfo, tab);
  if (tab.url) {
    var domain = (new URL(tab.url)).hostname;
    domain = domain.replace('www.', '');
    // Get everything from storage
    chrome.storage.local.get('blockedDomains', function(data) {
      var blockedDomains = Object.values(data.blockedDomains || {});
      var blockedUrls = blockedDomains.map(function(item) { return item.domain; });
      var memeFiles = blockedDomains.map(function(item) { return item.memeFile; });
      for (var i = 0; i < blockedUrls.length; i++) {
        if (blockedUrls[i] == domain) {
          var memeURL = memeFiles[i];
          chrome.scripting.executeScript({
            target: {tabId: tabId},
            function: injectMeme,
            args: [memeURL]
          });
        }
      }
    });
  }
});

function injectMeme(memeURL) { 
  var memeDiv = document.createElement('div');
  memeDiv.style.position = 'fixed';
  memeDiv.style.top = '20%';
  memeDiv.style.left = '50%';
  memeDiv.style.transform = 'translateX(-50%)';
  memeDiv.style.zIndex = '10000';
  memeDiv.style.width = '50%';
  memeDiv.style.height = 'auto';

  var memeImg = document.createElement('img');
  memeImg.src = memeURL;
  memeImg.style.width = '100%';
  memeImg.style.height = 'auto';
  
  memeDiv.appendChild(memeImg);
  document.body.appendChild(memeDiv);
}



  
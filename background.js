chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && changeInfo.url) {
    var domain = (new URL(changeInfo.url)).hostname;

    chrome.storage.sync.get('blockedDomains', function(data) {
      var blockedDomains = data.blockedDomains || [];
      var blockedUrls = blockedDomains.map(function(data) { return data.domain; });
      var memeFiles = blockedDomains.map(function(data) { return data.memeFile; });

      for (var i = 0; i < blockedUrls.length; i++) {
        if (blockedUrls[i] == domain) {
          var memeURL = memeFiles[i];
          chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ['content.js'],
            args: [memeURL]
          });
        }
      }
    });
  }
});


  
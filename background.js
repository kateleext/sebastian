chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
      // TODO: Check if the URL matches a blocked site
      // If so, inject a content script to show the meme
    }
  });
  
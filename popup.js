function updateBlockList() {
  chrome.storage.sync.get('blockedDomains', function(data) {
    var blockedDomains = data.blockedDomains || [];
    var blockList = document.getElementById('blockListTable');
    blockList.innerHTML = '';

    blockedDomains.forEach(function(data) {
      var row = blockList.insertRow();
      var domainCell = row.insertCell();
      domainCell.textContent = data.domain;

      var memeCell = row.insertCell();
      var memeImg = document.createElement('img');
      memeImg.src = data.memeFile;
      memeCell.appendChild(memeImg);
    })
  })
};

function addBlockedDomain() {
  var domainInput = document.getElementById('domain');
  var memeFileInput = document.getElementById('memeFile');

  var domain = domainInput.value.trim(); // No need to get 'value' twice
  var memeFile = memeFileInput.files[0];

  if (domain && memeFile) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var memeDataURL = e.target.result;
      chrome.storage.sync.get('blockedDomains', function(data) {
        var blockedDomains = data.blockedDomains || [];
        blockedDomains.push({domain: domain, memeFile: memeDataURL});
        chrome.storage.sync.set({blockedDomains: blockedDomains}, function() {
          updateBlockList(); // Call updateBlockList here
        });
      });
    };

    reader.readAsDataURL(memeFile);
  }
}


// Event listener for the "Add Block" button
document.getElementById('addBlock').addEventListener('click', addBlockedDomain);

// Initialize the blocked sites list when the popup is opened
updateBlockList();
  
function updateBlockList() {
  chrome.storage.local.get('blockedDomains', function(data) {
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

      memeCell.classList.add('popupCell');
      domainCell.classList.add('popupCell');

      var deleteCell = row.insertCell();
      var deleteButton = document.createElement('button');
      deleteCell.appendChild(deleteButton);
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        deleteBlockedDomain(data.domain);
      });
    })
  })
};

function addBlockedDomain() {
  var domainInput = document.getElementById('domain');
  var memeFileInput = document.getElementById('memeFile');

  var domain = domainInput.value.trim();
  domain = domain.replace('www.', '');
  // No need to get 'value' twice
  var memeFile = memeFileInput.files[0];

  if (domain && memeFile) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var memeDataURL = e.target.result;
      chrome.storage.local.get('blockedDomains', function(data) {
        var blockedDomains = data.blockedDomains || [];
        blockedDomains.push({domain: domain, memeFile: memeDataURL});
        chrome.storage.local.set({blockedDomains: blockedDomains}, function() {
          updateBlockList(); // Call updateBlockList here
        });
      });
    };

    reader.readAsDataURL(memeFile);
  }
}

function deleteBlockedDomain(domain) {
  chrome.storage.local.get('blockedDomains', function(data) {
    var blockedDomains = data.blockedDomains || [];
    var newBlockedDomains = blockedDomains.filter(function(item) {
      return item.domain != domain;
    });
    chrome.storage.local.set({blockedDomains: newBlockedDomains}, function() {
      updateBlockList();
    });
  });
}

// Event listener for the "Add Block" button
document.getElementById('addBlock').addEventListener('click', addBlockedDomain);
// Initialize the blocked sites list when the popup is opened
updateBlockList();
  
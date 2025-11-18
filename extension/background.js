// --- 1. Create the Right-Click Menu (Same as before) ---
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveToDevVault",
    title: "Save to Dev Vault",
    contexts: ["selection"]
  });
});

// --- 2. Listen for the Right-Click (This is the new, smart version) ---
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "saveToDevVault") {
    
    // --- THIS IS THE FIX ---
    // The simple 'info.selectionText' is unreliable on sites like LeetCode.
    // Instead, we inject a script into the tab to get the selection
    // from the page's DOM, which is 100% reliable.
    let [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString(),
    });

    const selectedText = result ? result.result : '';

    if (!selectedText) {
      // We still didn't get any text, so notify the user.
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'Save Failed',
        message: 'Could not get the selected text from this page.'
      });
      return;
    }
            
    // --- 3. "Smart Title" Logic (Same as before) ---
    let smartTitle = "";
    if (selectedText.length < 60) {
      smartTitle = selectedText; // Use the text itself if it's short
    } else {
      smartTitle = `Snippet from ${tab.title}`; // Use the page title
    }

    const newSnippet = {
      title: smartTitle,
      content: selectedText,
      language: 'text',
      description: `Saved from: ${tab.url}`,
      tags: ['saved-from-extension']
    };

    // --- 4. Send to Backend API (Same as before) ---
    try {
      const response = await fetch('http://localhost:5000/api/snippets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Sends your login cookie!
        body: JSON.stringify(newSnippet),
      });

      const data = await response.json();
      if (!response.ok) { throw new Error(data.message || 'API call failed'); }
      
      // --- 5. "Snippet Saved!" Notification (Will work now) ---
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'Snippet Saved!',
        message: `Your snippet "${smartTitle}" has been saved.`
      });

      // --- 6. "Real-Time" Message (Will work now) ---
      sendRefreshMessage();

    } catch (err) {
      console.error(err);
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'Save Failed',
        message: err.message || 'Could not save. Are you logged in?'
      });
    }
  }
});

// --- 7. "Real-Time" Broadcast Function (Same as before) ---
function sendRefreshMessage() {
  chrome.tabs.query({ url: "http://localhost:5173/*" }, (tabs) => {
    if (tabs.length > 0) {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { type: "REFRESH_DATA" });
      });
    }
  });
}
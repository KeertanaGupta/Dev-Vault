// This runs when the popup window is opened
document.addEventListener('DOMContentLoaded', () => {
  const statusView = document.getElementById('status-view');
  const loginView = document.getElementById('login-view');
  const loginButton = document.getElementById('login-button');

  // --- Check if we are logged in ---
  // We'll try to hit our backend's "/api/users/profile" endpoint
  // We MUST use the full URL here because this is an extension.
  fetch('http://localhost:5000/api/users/profile', {
    method: 'GET',
    credentials: 'include', // This is CRITICAL! It sends the 'jwt' cookie
  })
    .then(response => {
      if (response.ok) {
        // We are logged in!
        statusView.classList.remove('hidden');
        loginView.classList.add('hidden');
      } else {
        // We are logged out (got a 401 error)
        statusView.classList.add('hidden');
        loginView.classList.remove('hidden');
      }
    })
    .catch(err => {
      // This happens if the backend server is offline
      console.error(err);
      statusView.classList.add('hidden');
      loginView.classList.remove('hidden');
      loginView.querySelector('p').textContent = 'Error: Backend server is offline.';
    });

  // When the user clicks "Open Login Page"...
  loginButton.addEventListener('click', () => {
    // ...open the React app's login page in a new tab
    chrome.tabs.create({ url: 'http://localhost:5173/auth' });
  });
});
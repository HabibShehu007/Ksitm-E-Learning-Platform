 document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value.trim();

    // Simple frontend-only check
    if (username === 'admin' && password === 'ksitm123') {
      window.location.href = 'admin-dashboard.html';
    } else {
      alert('Invalid credentials. Try again.');
    }
  });
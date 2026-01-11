document.addEventListener('DOMContentLoaded', () => {
  const users = [
    { name: "Habib", email: "habib@example.com", status: "Applied" },
    { name: "Aisha", email: "aisha@example.com", status: "Registered" },
    { name: "John", email: "john@example.com", status: "Pending" }
  ];

  const userList = document.getElementById('userList');

  users.forEach(user => {
    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.innerHTML = `
      <span><strong>${user.name}</strong> <small class="text-muted">(${user.email})</small></span>
      <span class="badge bg-${user.status === 'Applied' ? 'primary' : user.status === 'Registered' ? 'success' : 'warning'}">${user.status}</span>
    `;
    userList.appendChild(item);
  });
});

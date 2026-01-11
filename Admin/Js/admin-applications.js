function replyToUser(name) {
  const modal = new bootstrap.Modal(document.getElementById('replyModal'));
  document.getElementById('replyModalLabel').textContent = `Reply to ${name}`;
  modal.show();
}

document.getElementById('replyForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const replyText = this.querySelector('textarea').value.trim();
  const existing = JSON.parse(localStorage.getItem('adminReplies')) || [];
  existing.push({ message: replyText, timestamp: new Date().toLocaleString() });
  localStorage.setItem('adminReplies', JSON.stringify(existing));
  alert("Reply sent successfully!");
  bootstrap.Modal.getInstance(document.getElementById('replyModal')).hide();
});


document.addEventListener('DOMContentLoaded', () => {
  const replies = JSON.parse(localStorage.getItem('studentReplies')) || [];
  const list = document.getElementById('studentReplyList');

  if (replies.length === 0) {
    list.innerHTML = '<li class="list-group-item text-muted">No replies received yet.</li>';
  } else {
    replies.forEach((reply, index) => {
      const item = document.createElement('li');
      item.className = 'list-group-item';
      item.innerHTML = `
        <strong>Reply ${index + 1}:</strong> ${reply.message}<br>
        <small class="text-muted">${reply.timestamp}</small>
        ${reply.attachment ? `<br><span class="badge bg-secondary">Attachment: ${reply.attachment}</span>` : ''}
      `;
      list.appendChild(item);
    });
  }
});

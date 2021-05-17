const newFormHandler = async (event) => {
  event.preventDefault();

  const contents = document.querySelector('#comment-text').value.trim();

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (contents) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ contents, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);
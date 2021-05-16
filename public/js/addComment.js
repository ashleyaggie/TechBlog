const newFormHandler = async (event) => {
    event.preventDefault();
  
    const contents = document.querySelector('#comment-text').value.trim();
  
    if (contents) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ contents }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/post/:id');
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);
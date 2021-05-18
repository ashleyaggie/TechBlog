const editFormHandler = (event) => {
  event.preventDefault();

  const id = location.toString().split('/')[
    location.toString().split('/').length - 1
  ];

  try {
    document.location.replace(`/edit/${id}`)
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const deleteFormHandler = async (event) => {
  event.preventDefault();

  const id = location.toString().split('/')[
    location.toString().split('/').length - 1
  ];

  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ post_id: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
};

document
.querySelector('#edit-btn')
.addEventListener('click', editFormHandler);

document
.querySelector('#delete-btn')
.addEventListener('click', deleteFormHandler);
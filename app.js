$(document).ready(function() {
  let currentUserId = 1;
  const totalUsers = 30;

  function fetchUser(userId) {
      $.ajax({
          url: `https://dummyjson.com/users/${userId}`,
          method: 'GET',
          success: function(user) {
              $('.info__image img').attr('src', user.image || ''); 
              $('.info__content').html(`
                  <h2>${user.firstName} ${user.lastName}</h2>
                  <p>Email: ${user.email}</p>
                  <p>Phone: ${user.phone}</p>
              `);
              fetchPosts(userId);
              fetchTodos(userId);
          }
      });
  }

  function fetchPosts(userId) {
      $.ajax({
          url: `https://dummyjson.com/users/${userId}/posts`,
          method: 'GET',
          success: function(data) {
              const postsList = $('.posts ul');
              postsList.empty();
              data.posts.forEach(post => {
                  postsList.append(`<li><a href="#" class="post-title" data-id="${post.id}">${post.title}</a></li>`);
              });
              $('.posts h3').text(`Posts (${data.posts.length})`); 
          }
      });
  }

  function fetchTodos(userId) {
      $.ajax({
          url: `https://dummyjson.com/users/${userId}/todos`,
          method: 'GET',
          success: function(data) {
              const todosList = $('.todos ul');
              todosList.empty();
              data.todos.forEach(todo => {
                  todosList.append(`<li>${todo.todo}</li>`);
              });
              $('.todos h3').text(`Todos (${data.todos.length})`); 
          }
      });
  }

  function fetchPostDetails(postId) {
      $.ajax({
          url: `https://dummyjson.com/posts/${postId}`,
          method: 'GET',
          success: function(post) {
              const modal = $(`
                  <div id="modal">
                      <div id="modal-content">
                          <h2>${post.title}</h2>
                          <p>${post.body}</p>
                          <p>Views: ${post.views}</p>
                          <button id="close-modal">Close Modal</button>
                      </div>
                  </div>
              `);
              $('body').append(modal);
              $('#modal').show();
              $('#close-modal').click(function() {
                  $('#modal').remove();
              });
          }
      });
  }

  $('header button:nth-of-type(2)').click(function() {
      currentUserId = (currentUserId % totalUsers) + 1;
      fetchUser(currentUserId);
  });

  $('header button:nth-of-type(1)').click(function() {
      currentUserId = (currentUserId - 2 + totalUsers) % totalUsers + 1;
      fetchUser(currentUserId);
  });

  $(document).on('click', '.post-title', function(event) {
      event.preventDefault();
      const postId = $(this).data('id');
      fetchPostDetails(postId);
  });

  $('.posts h3').click(function() {
      $('.posts ul').slideToggle();
  });

  $('.todos h3').click(function() {
      $('.todos ul').slideToggle();
  });

 
  fetchUser(currentUserId);
});

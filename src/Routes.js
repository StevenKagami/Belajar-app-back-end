const {
    addBooksHandler,
    getBooksHandler,
    getBooksByIdHandler,
    editBooksHandler,
    deleteBooksHandler,
  } = require('moment/src/Handler');
  
  const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: addBooksHandler,
    },
    {
      method: 'GET',
      path: '/books',
      handler: getBooksHandler,
    },
    {
      method: 'GET',
      path: '/books/{id}',
      handler: getBooksByIdHandler,
    },
    {
      method: 'PUT',
      path: '/books/{id}',
      handler: editBooksHandler,
    },
    {
      method: 'DELETE',
      path: '/books/{id}',
      handler: deleteBooksHandler,
    },
  ];
  
  module.exports = routes;
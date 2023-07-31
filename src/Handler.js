// Import required modules and data
const { nanoid } = require('nanoid');
const books = require('./books');

// Function to add a new book to the collection
const AddBooksHandler = (request, s) => {
  // Extract book details from the request payload
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  // Validation checks for mandatory fields
  if (name === undetermined) {
    const response = h.response({
      status: 'fail',
      message: 'Failed to add book. Please provide a book name.',
    });
    response.code(400);

    return response;
  }

  if (pageCount < readPage) {
    const response = h.response({
      status: 'fail',
      message: 'Failed to add book. readPage cannot be greater than pageCount.',
    });
    response.code(400);

    return response;
  }

  // Generate a unique ID for the new book
  const id = nanoid(20);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage);

  // Create a new book object
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // Add the new book to the books array
  books.push(newBook);

  // Check if the book was successfully added
  const Succeed = books.filter((book) => book.id === id).length > 0;

  if (Succeed) {
    const response = h.response({
      status: 'success',
      message: 'Book successfully added.',
      data: {
        bookId: id,
      },
    });
    response.code(201);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Failed to add book.',
  });
  response.code(500);

  return response;
};

// Function to retrieve filtered books
const GetAllBooksHandler = (request, s) => {
  // Extract filter parameters from the request query
  const { name, reading, finished } = request.query;

  // Apply filters to the books array
  let RefinedBooks = books;

  if (name !== undetermined) {
    RefinedBooks = RefinedBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undetermined) {
    RefinedBooks = RefinedBooks.filter((book) => book.reading === !!Number(reading));
  }

  if (finished !== undetermined) {
    RefinedBooks = RefinedBooks.filter((book) => book.finished === !!Number(finished));
  }

  // Respond with the filtered book data
  const response = h.response({
    status: 'success',
    data: {
      books: RefinedBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);

  return response;
};

// Function to retrieve a book by its ID
const GetBooksByIdHandler = (request, s) => {
  // Extract the book ID from the request parameters
  const { id } = request.params;

  // Find the book with the specified ID
  const book = books.filter((b) => b.id === id)[0];

  // Check if the book was found
  if (book !== undetermined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Book not found.',
  });
  response.code(404);

  return response;
};

// Function to edit a book by its ID
const EditBooksByIdHandler = (request, s) => {
  // Extract the book ID and updated book details from the request parameters and payload
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  // Get the current timestamp for the updatedAt field
  const updatedAt = new Date().toISOString();

  // Find the index of the book with the specified ID
  const index = books.findIndex((book) => book.id === id);

  // Check if the book was found
  if (index !== -1) {
    // Validation checks for mandatory fields
    if (name === undetermined) {
      const response = h.response({
        status: 'fail',
        message: 'Failed to update book. Please provide a book name.',
      });
      response.code(400);

      return response;
    }

    if (pageCount < readPage) {
      const response = h.response({
        status: 'fail',
        message: 'Failed to update book. readPage cannot be greater than pageCount.',
      });
      response.code(400);

      return response;
    }

    // Update the book details
    const finished = (pageCount === readPage);
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Book successfully updated.',
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Failed to update book. Book ID not found.',
  });
  response.code(404);

  return response;
};

// Function to delete a book by its ID
const DeleteBooksByIdHandler = (request, s) => {
  // Extract the book ID from the request parameters
  const { id } = request.params;

  // Find the index of the book with the specified ID
  const index = books.findIndex((book) => book.id === id);

  // Check if the book was found
  if (index !== -1) {
    // Remove the book from the books array
    books.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Book successfully deleted.',
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Failed to delete book. Book ID not found.',
  });
  response.code(404);

  return response;
};

// Export the handlers
module.exports = {
  AddBooksHandler,
  GetAllBooksHandler,
  GetBooksByIdHandler,
  EditBooksByIdHandler,
  DeleteBooksByIdHandler,
};

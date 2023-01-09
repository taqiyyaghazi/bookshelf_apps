document.addEventListener('DOMContentLoaded', function () {
  const bookData = localStorage.getItem('bookData');
  displayBookData(JSON.parse(bookData));

  const submitForm = document.getElementById('inputBook');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBookData();

    const localStorageBookData = localStorage.getItem('bookData');
    const bookData = localStorageBookData
      ? JSON.parse(localStorageBookData)
      : [];
    displayBookData(bookData);
  });

  const submitSearch = document.getElementById('searchBook');
  submitSearch.addEventListener('submit', function (event) {
    event.preventDefault();
    const filteredBookData = searchBookByTitle();
    displayBookData(filteredBookData);
  });
});

const ID_BUKU_BELUM_DIBACA = 'incompleteBookshelfList';
const ID_BUKU_TELAH_DIBACA = 'completeBookshelfList';

function addBookData() {
  const id = +new Date();
  const title = document.getElementById('inputBookTitle').value;
  const author = document.getElementById('inputBookAuthor').value;
  const year = document.getElementById('inputBookYear').value;
  const isComplete = document.getElementById('inputBookIsComplete').checked;

  const localStorageBookData = localStorage.getItem('bookData');
  const dataStores = localStorageBookData
    ? JSON.parse(localStorageBookData)
    : [];

  dataStores.push({
    id,
    title,
    author,
    year,
    isComplete,
  });

  localStorage.setItem('bookData', JSON.stringify(dataStores));
}

function deleteBookDataById(id) {
  const localStorageBookData = JSON.parse(localStorage.getItem('bookData'));
  const newBookData = localStorageBookData.filter((item) => item.id !== id);
  localStorage.setItem('bookData', JSON.stringify(newBookData));
  return newBookData;
}

function updateIsCompleteBookDataById(id, isComplete) {
  const localStorageBookData = JSON.parse(localStorage.getItem('bookData'));
  const newBookData = localStorageBookData.map((item) => {
    if (item.id === id) {
      return { ...item, isComplete: !isComplete };
    }
    return item;
  });
  localStorage.setItem('bookData', JSON.stringify(newBookData));
  return newBookData;
}

function searchBookByTitle() {
  const title = document.getElementById('searchBookTitle').value.toLowerCase();
  const localStorageBookData = JSON.parse(localStorage.getItem('bookData'));
  const filteredBookData = localStorageBookData.filter((item) =>
    item.title.toLowerCase().includes(title)
  );
  return filteredBookData;
}

function displayBookData(bookData) {
  const listBukuBelumDibaca = document.getElementById(ID_BUKU_BELUM_DIBACA);
  const listBukuTelahDibaca = document.getElementById(ID_BUKU_TELAH_DIBACA);
  listBukuBelumDibaca.innerHTML = '';
  listBukuTelahDibaca.innerHTML = '';
  bookData.map((book) => {
    book.isComplete
      ? listBukuTelahDibaca.append(createBookContainer(book))
      : listBukuBelumDibaca.append(createBookContainer(book));
  });
}

function createBookContainer({ id, title, author, year, isComplete }) {
  const titleElement = document.createElement('h3');
  titleElement.innerText = title;

  const authorElement = document.createElement('p');
  authorElement.innerText = author;

  const yearElement = document.createElement('p');
  yearElement.innerText = year;

  const contentContainer = document.createElement('div');
  contentContainer.append(titleElement, authorElement, yearElement);

  const container = document.createElement('article');
  container.classList.add('book_item');
  container.append(contentContainer);

  const containerButton = createButtonGroup(isComplete, id);

  container.append(containerButton);

  return container;
}

function createButton(buttonTypeClass, buttonText, id, isComplete) {
  const buttonElement = document.createElement('button');
  buttonElement.classList.add(buttonTypeClass);
  buttonElement.innerHTML = buttonText;
  buttonElement.setAttribute('buttonId', id);
  if (buttonTypeClass === 'red') {
    buttonElement.onclick = function () {
      alert('Buku akan dihapus');
      const bookData = deleteBookDataById(id);
      displayBookData(bookData);
    };
  }
  if (buttonTypeClass === 'green') {
    buttonElement.onclick = function () {
      const bookData = updateIsCompleteBookDataById(id, isComplete);
      displayBookData(bookData);
    };
  }
  return buttonElement;
}

function toggleButtonIsComplete(taskElement) {
  taskElement.remove();
}

function createButtonGroup(isComplete, id) {
  const containerButton = document.createElement('div');
  containerButton.classList.add('action');
  const buttonText = isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
  containerButton.append(createButton('green', buttonText, id, isComplete));
  containerButton.append(createButton('red', 'Hapus', id));
  return containerButton;
}

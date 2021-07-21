const ID_BUKU_BELUM_DIBACA = "incompleteBookshelfList";
const ID_BUKU_TELAH_DIBACA = "completeBookshelfList";

function tambahBuku() {
    const listBukuBelumDibaca = document.getElementById("ID_BUKU_BELUM_DIBACA");

    const judulBuku = document.getElementById("inputBookTitle").value;
    const penulisBuku = document.getElementById("inputBookAuthor").value;
    const tahunTerbit = document.getElementById("inputBookYear").value;
    // const checklist = document.getElementById("inputBookIsComplete").value;


    const listBaca = masukkanBuku(judulBuku, penulisBuku, tahunTerbit);
    listBukuBelumDibaca.append(listBaca);

};

function masukkanBuku(buku, penulis, tahun) {

    const teksJudul = document.createElement("h3");
    teksJudul.innerText = buku;

    const teksPenulis = document.createElement("p");
    teksPenulis.innerText = penulis;

    const teksTahun = document.createElement("p");
    teksTahun.innerText = tahun;

    const teksContainer = document.createElement("article");
    teksContainer.classList.add("book_item");
    teksContainer.append(teksJudul, teksPenulis, teksTahun);

    const tombolContainer = document.createElement("div");
    tombolContainer.classList.add("action");
    tombolContainer.append(buatTombolCeklist());

    const container = document.getElementById("incompleteBookshelfList");
    container.append(teksContainer);

    return container
};

function buatTombol(buttonTypeClass) {
    const tombol = document.createElement("button");
    tombol.classList.add(buttonTypeClass);
    tombol.innerHTML = "Selesai dibaca";
    tombol.onclick = function() {
        alert("Buku akan dihapus")
    }
    return tombol
};

function tambahBukuTelahDibaca(taskElement) {
    taskElement.remove();
};

function buatTombolCeklist() {
    return buatTombol("green");
}
let currentSearchTag = '';
let currentSearchColor = '';
let currentPage = 1;
let totalHits = 0;
let imageTemplate = document.querySelector('#results-template');

Start();

function Start() {
    imageTemplate.remove(); //global
    SetPageButtonStatus();
    SetSearchForm();
    NextPageButton();
    PreviousPageButton();
}

function SetSearchForm() {
    let searchForm = document.querySelector('#search-form');
    let searchTag = document.querySelector('#search-tag');
    let searchColor = document.querySelector('#search-color');

    searchForm.onsubmit = function(event) {
        event.preventDefault();

        currentSearchTag = searchTag.value; //global
        currentSearchColor = searchColor.value; //global

        SearchPixabay(currentSearchTag, currentSearchColor, 1);
    }

}

function SetPageButtonStatus() {
    let backButton = document.querySelector('#back')
    let forwardButton = document.querySelector('#forward');
    backButton.disabled = false;
    forwardButton.disabled = false;
    if (totalHits === 0) {
        backButton.disabled = true;
        forwardButton.disabled = true;
    }
    if (totalHits <= currentPage * 10) {
        forwardButton.disabled = true;
    }
    if (currentPage <= 1) {
        backButton.disabled = true;
    }
}


async function myPixabayParam(searchTag, searchColor, pageNumber) {
    let param = new URLSearchParams({
        key: '25592393-ccf7ee53d7b027ae015f7e308',
        per_page: 10,
        q: searchTag,
        colors: searchColor,
        page: pageNumber
    })
    const myApi = 'https://pixabay.com/api/?' + param.toString();
    let response = await fetch(myApi);
    let jsonData = await response.json();
    return jsonData;
}

function ClearSearchItems() {
    let resultImageList = document.querySelector('#results-image-list');
    let currentResults = resultImageList.querySelectorAll('li');
    for (let result of currentResults) {
        result.remove();
    }
}

async function SearchPixabay(searchTag, searchColor, pageNumber) {
    let jsonPixabay = await myPixabayParam(searchTag, searchColor, pageNumber);
    ClearSearchItems();
    totalHits = jsonPixabay.totalHits; //global
    currentPage = pageNumber; //global

    let resultImageList = document.querySelector('#results-image-list');


    for (let image of jsonPixabay.hits) {
        let li = imageTemplate.content.firstElementChild.cloneNode(true);
        li.querySelector('.results-image').src = image.largeImageURL;
        li.querySelector('.results-image-tag').textContent = image.tags.replaceAll(',', '');
        li.querySelector('.results-image-user').textContent = image.user;
        resultImageList.append(li);
    }
    SetPageButtonStatus();
}

function PreviousPageButton() {

    let backButton = document.querySelector('#back');
    backButton.onclick = () => {
        ChangePageNumber(--currentPage);
    }
}

function NextPageButton() {
    let forwardButton = document.querySelector('#forward');
    forwardButton.onclick = () => {
        ChangePageNumber(++currentPage);
    }
}

function ChangePageNumber(currentPageNumber) {
    ClearSearchItems();
    SearchPixabay(currentSearchTag, currentSearchColor, currentPageNumber);
}

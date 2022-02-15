let currentSearchTag = '';
let currentSearchColor = '';
let currentPage = 1;
let totalHits = 0;

Start();

function Start() {
    SetPageButtonStatus();
    SetSearchForm();
    NextPageButton();
    PreviousPageButton();
}

function SetSearchForm() {
    let searchForm = document.querySelector('#search-form');
    let searchTag = document.querySelector('#search-tag');
    let searchColor = document.querySelector('#search-color');

    searchForm.onsubmit = event => {
        currentSearchTag = searchTag.value; //global
        currentSearchColor = searchColor.value; //global
        event.preventDefault();
        SearchPixabay(searchTag.value, searchColor.value, 1);
    }

}

function SetPageButtonStatus() {
    let previousButton = document.querySelector('#previous')
    let nextButton = document.querySelector('#next');
    previousButton.disabled = false;
    nextButton.disabled = false;
    if (totalHits === 0) {
        previousButton.disabled = true;
        nextButton.disabled = true;
    }
    if (totalHits <= currentPage * 10) {
        nextButton.disabled = true;
    }
    if (currentPage <= 1) {
        previousButton.disabled = true;
    }
}

async function myPixabayParam(searchTag, searchColor, pageNumber) {
    let param = new URLSearchParams({
        key: '25592393-ccf7ee53d7b027ae015f7e308',
        per_page: 10,
        q: searchTag,
        color: searchColor,
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
    let imageTemplate = document.querySelector('#results-template');
    imageTemplate.remove();

    for (let image of jsonData.hits) {
        let li = imageTemplate.content.firstElementChild.cloneNode(true);
        li.querySelector('.results-image').src = image.largeImageURL;
        li.querySelector('.results-image-tag').textContent = image.tags;
        li.querySelector('.results-image-user').textContent = image.user;
        resultImageList.append(li);
    }
    SetPageButtonStatus();
}

function PreviousPageButton() {

    let previousButton = document.querySelector('#previous');
    previousButton.onclick = () => {
        ChangePageNumber(--currentPage);
    }
}

function NextPageButton() {
    let nextButton = document.querySelector('#next');
    nextButton.onclick = () => {
        ChangePageNumber(++currentPage);
    }
}

function ChangePageNumber(currentPageNumber) {
    ClearSearchItems();
    SearchPixabay(currentSearchTag, currentSearchColor, currentPageNumber);
}
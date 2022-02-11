start()

async function start() {

    let param = new URLSearchParams({
        key: '25592393-ccf7ee53d7b027ae015f7e308',
        per_page: 10,
        q: 'dog'
    })
    const myApi = 'https://pixabay.com/api/?' + param.toString();
    let response = await fetch(myApi);
    let jsonData = await response.json();

    let resultImageList = document.querySelector('#results-image-list')
    let imageTemplate = document.querySelector('#results-template');
    imageTemplate.remove();

    for (let image of jsonData.hits) {
        let li = imageTemplate.content.firstElementChild.cloneNode(true);
        li.querySelector('.results-image').src = image.largeImageURL;
        li.querySelector('.results-image-tag').textContent = image.tags;
        li.querySelector('.results-image-user').textContent = image.user;
        resultImageList.append(li);
    }


}
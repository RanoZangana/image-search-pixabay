start()

async function start() {

    let param = new URLSearchParams({
        key: '25645717-03cdc3424e75e0888d9a391cd',
        q: 'dog puppy'
    })
    let response = await fetch('https://pixabay.com/api/?' +
        param.toString());
    let json = await response.json;

}
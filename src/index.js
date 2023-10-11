import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const ref = {
    selector: document.querySelector('.breed-select'),// це посилання на елемент з класом .breed-select.
    divCatInfo: document.querySelector('.cat-info'),// це посилання на елемент з класом .cat-info.
    loader: document.querySelector('.loader'),// це посилання на елемент з класом .loader.
    error: document.querySelector('.error'),// це посилання на елемент з класом .error.
};
const { selector, divCatInfo, loader, error } = ref;
//Перелік констант ref, який містить посилання на елементи DOM (елементи веб-сторінки). 

//loader, error, та divCatInfo це константи, які представляють елементи DOM, які відповідають за завантаження,
//помилки та відображення інформації про кішок.
loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');
//Приховання елементів. В цьому кроці коду робиться початкове приховання елементів, таких як лоадер, повідомлення про помилку і
//відображення інформації про кішок.

//fetchBreeds() - виклик функції, яка отримує список порід кішок з віддаленого API. Після отримання даних, вони обробляються і
//виводяться в випадаючому списку за допомогою SlimSelect.
let arrBreedsId = [];
fetchBreeds()
.then(data => {
    data.forEach(element => {
        arrBreedsId.push({text: element.name, value: element.id});
    });
    new SlimSelect({
        select: selector,
        data: arrBreedsId
    });
    })
.catch(onFetchError);

selector.addEventListener('change', onSelectBreed);//- додає обробник подій, який спрацьовує при зміні вибраної породи кішки.

//onSelectBreed(event) - це функція, яка обробляє вибір породи кішки. Вона виводить зображення кішки та іншу інформацію про породу на сторінку.
function onSelectBreed(event) {
    loader.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden');
    divCatInfo.classList.add('is-hidden');

    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => {
        loader.classList.replace('loader', 'is-hidden');
        selector.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        
        divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        divCatInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
};

//onFetchError(error) - ця функція викликається в разі помилки під час отримання даних з віддаленого API і виводить повідомлення про
//помилку за допомогою бібліотеки Notiflix.
function onFetchError(error) {
    selector.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
};
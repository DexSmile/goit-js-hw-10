const url = 'https://api.thecatapi.com/v1';
//const url - ця константа містить базовий URL для API "The Cat API", який використовується для виконання запитів до цього API.
const api_key = "live_oUGvPlZ40u1LWRm9FFb4vQHFsROqizkIBfiewPK2Sw0Q1ltTksAvWbGJcvtUeFrH";
//const api_key - ця константа містить ваш ключ доступу (API key) до "The Cat API". Цей ключ використовується для автентифікації запитів
//до API та отримання даних.

export function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });       
};
//fetchBreeds() - це функція, яка виконує запит до API для отримання списку порід кішок.
//Вона використовує fetch для здійснення HTTP-запиту до вказаної URL-адреси (комбінує url та API ключ) і повертає об'єкт Promise.

export function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });  
};
//fetchCatByBreed(breedId) - ця функція приймає ідентифікатор породи breedId як параметр і виконує запит до API для отримання зображення кішки
//обраної породи. Вона також використовує fetch для здійснення HTTP-запиту до API, використовуючи breed_ids та API ключ, і також повертає об'єкт Promise.

//Обидві функції виконують перевірку на response.ok, щоб переконатися, що запит був вдалим. Якщо відповідь не містить статус 200 OK,
//то генерується помилка із статусом відповіді.
// У разі успішного виконання запиту, обидві функції використовують response.json(), щоб розпарсити відповідь API у форматі JSON і
//повернути розпарсений об'єкт як результат обіцянки (Promise).
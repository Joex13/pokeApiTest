import { $axios } from './axiosHelper';
import { createElements, createErrorElement } from './createElement';

const array = [];
let newArray = [];

const createListDOM = (element) => {
  document.getElementsByClassName('list')[0].appendChild(
    createElements(`
    <li class="list-item">
      <div class="character">
        <img src="${
          element.img
        }" width="475" height="475" alt="" class="character__img">
      </div>
      <p class="character__name">${element.name}</p>
      <div style="display: flex; gap: 4px;">
        ${element.types
          .map(
            (type) =>
              `<p class="type" style="color: blue; cursor: pointer;">${type}</p>`
          )
          .join('')}
      </div>
    </li>`)
  );

  const typeElements = document.getElementsByClassName('type');
  for (let i = 0; i < typeElements.length; i++) {
    typeElements[i].addEventListener('click', () => {
      newArray = array.filter((pokemon) =>
        pokemon.types.includes(typeElements[i].textContent)
      );
      clearListDOM();
      newArray.forEach((element) => createListDOM(element));
      document.getElementById('type').value = typeElements[i].textContent;
    });
  }
};

const clearListDOM = () =>
  (document.getElementsByClassName('list')[0].innerHTML = '');

const createErrorText = (err) =>
  document.getElementsByClassName('main')[0].prepend(createErrorElement(err));

document.addEventListener('DOMContentLoaded', async () => {
  const response = await $axios(
    'https://pokeapi.co/api/v2/pokemon/?limit=151'
  ).catch((err) => createErrorText(err));

  for (const element of response.data.results) {
    const responseDetail = await $axios(element.url).catch((err) =>
      createErrorText(err)
    );
    const responseJpn = await $axios(responseDetail.data.species.url).catch(
      (err) => createErrorText(err)
    );

    const obj = {
      id: responseDetail.data.id,
      name: responseJpn.data.names[0].name,
      img: responseDetail.data.sprites.other['official-artwork'].front_default,
      types: await Promise.all(
        responseDetail.data.types.map(async (elm) => {
          const res = await $axios(elm.type.url);
          return res.data.names[0].name;
        })
      ),
    };

    array.push(obj);
  }

  array.forEach((element) => createListDOM(element));

  document.getElementById('type').addEventListener('change', function () {
    if (this.value === 'すべて表示') {
      clearListDOM();
      array.forEach((element) => createListDOM(element));
    }
    newArray = array.filter((pokemon) => pokemon.types.includes(this.value));
    clearListDOM();
    newArray.forEach((element) => createListDOM(element));
  });

  document
    .getElementsByClassName('reset-button')[0]
    .addEventListener('click', () => {
      clearListDOM();
      document.getElementById('type').options[0].selected = true;
      array.forEach((element) => createListDOM(element));
    });
});

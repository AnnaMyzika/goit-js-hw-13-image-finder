import './styles.css';
import apiServise from './js/apiService';
import imgCard from './templates/imgCard.hbs';
import * as basicLightbox from 'basiclightbox';
import './css/basicLightBox.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  imgList: document.querySelector('.gallery'),
};

const params = {
  query: '',
  page: 1,
};

refs.searchForm.addEventListener('submit', getPictures);
function getPictures(e) {
  e.preventDefault();
  params.query = e.target.children[0].value;
  apiServise(params.query, params.page).then(({ hits }) => {
    refs.imgList.insertAdjacentHTML('beforeend', imgCard(hits));
  });
  console.log(e.target.children[0].value);
}

refs.imgList.addEventListener('click', e => {
  if (e.target.localName === 'img') {
    basicLightbox
      .create(`<img src=${e.target.dataset.source} width="800" height="600">`)
      .show();
  }
});

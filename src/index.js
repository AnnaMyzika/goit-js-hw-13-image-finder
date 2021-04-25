import './styles.css';
import apiServise from './js/apiService';
import imgCard from './templates/imgCard.hbs';
import * as basicLightbox from 'basiclightbox';
import './css/basicLightBox.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  imgList: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load'),
};

const params = {
  query: '',
  page: 1,
};

refs.searchForm.addEventListener('submit', getPictures);
function getPictures(e) {
  e.preventDefault();
  refs.imgList.innerHTML = '';
  params.query = e.target.children[0].value.trim();
  params.page = 1;
  // params.query = query;
  apiServise(params.query, params.page).then(({ hits }) => {
    if (params.query === '') {
      error({
        text: 'Enter something',
        delay: 2000,
      });
      return;
    }
    refs.loadMoreBtn.classList.add('is-open');
    refs.imgList.insertAdjacentHTML('beforeend', imgCard(hits));
  });
}

refs.imgList.addEventListener('click', e => {
  if (e.target.localName === 'img') {
    basicLightbox
      .create(`<img src=${e.target.dataset.source} width="800" height="600">`)
      .show();
  }
});

refs.loadMoreBtn.addEventListener('click', loadMoreImage);
function loadMoreImage() {
  apiServise(params.query, params.page).then(({ hits }) => {
    params.page += 1;
    refs.imgList.insertAdjacentHTML('beforeend', imgCard(hits));
    const totalScrollHeight = refs.imgList.clientHeight;
    window.scrollTo({ top: totalScrollHeight, behavior: 'smooth' });
  });
}

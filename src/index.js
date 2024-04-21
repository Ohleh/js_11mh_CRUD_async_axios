// GET:      https://pixabay.com/api/
// API key:  27852972-cf3b4cc0dfb2dc5cda9d2c741
import axios from 'axios';
import Notiflix from 'notiflix';
import { getImages } from './js/getApiImg';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const ref = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  input: document.querySelector('.innin'),
  //   BASE_URL: 'https://pixabay.com/api/',
};
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '27852972-cf3b4cc0dfb2dc5cda9d2c741';

// axios.defaults.headers.common['key'] = 'l27852972-cf3b4cc0dfb2dc5cda9d2c741';

// let gall = new SimpleLightbox('.galleryLightBox a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

const createRender = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `<div class="photo-card" class="galleryLightBox">
  <a class="gallery__link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`;
};

const render = data => {
  const render = data.reduce((acc, image) => (acc += createRender(image)), '');
  ref.gallery.insertAdjacentHTML('beforeend', render);
};

const onSbmBtn = async e => {
  e.preventDefault();
  try {
    const arrivedData = await getImages(e.target.elements.searchQuery.value);
    render(arrivedData);
  } catch (error) {
    console.log('error in try form arrivedData:', error);
  }
};

ref.form.addEventListener('submit', onSbmBtn);

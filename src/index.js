// GET:      https://pixabay.com/api/
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './js/getApiImg';

const ref = {
  form: document.querySelector('#search-form'),
  searchBtn: document.querySelector('.searchBtn'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};
ref.searchBtn.disabled = true;
let page = 0;
let pagetView = 0;

const onInputCheck = e => {
  if (ref.form.elements.searchQuery.value !== '') {
    ref.searchBtn.disabled = false;
  }
  if (ref.form.elements.searchQuery.value === '') {
    ref.searchBtn.disabled = true;
  }
  if (ref.form.elements.searchQuery.value === ' ') {
    ref.searchBtn.disabled = true;
    ref.form.elements.searchQuery.value = '';
    return Notiflix.Notify.info('Enter full name', {
      timeout: 2000,
    });
  }
};

const createRender = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `<div class="photo-card galleryLightBox">
  <a class="gallery__link" href="${largeImageURL}">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"  />
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
    </div>
`;
};

const render = data => {
  const render = data.reduce((acc, image) => (acc += createRender(image)), '');
  ref.gallery.insertAdjacentHTML('beforeend', render);
};

const showLoadBtln = (hits, totalHits) => {
  ref.loadBtn.classList.remove('hide');
  pagetView += hits;
  const totalPages = totalHits;
  if (pagetView >= totalPages) {
    loadBtnCheckScroll();
    return ref.loadBtn.classList.add('hide');
  }
};

const setLigtBox = () => {
  let lightbox = new SimpleLightbox('.galleryLightBox a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.on('show.simplelightbox', function (e) {});
};

const getApi = async e => {
  const q = ref.form.elements.searchQuery.value.trim();
  try {
    if (e.type === 'submit') {
      ref.gallery.innerHTML = '';
      ref.loadBtn.classList.add('hide');
      page = 1;
      pagetView = 0;
    }
    const arrivedData = await getImages(q, page);
    if (e.type === 'submit' && arrivedData.totalHits.length === 0) {
      Notiflix.Notify.success(`${arrivedData.totalHits} images found.`, {
        timeout: 1000,
      });
    }
    if (arrivedData.hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        {
          timeout: 3000,
        }
      );
    }
    render(arrivedData.hits);

    setLigtBox();

    showLoadBtln(arrivedData.hits.length, arrivedData.totalHits);
    page += 1;
  } catch (error) {
    console.log('error in try arrivedData:', error);
  }
};

const onButton = e => {
  e.preventDefault();
  getApi(e);
};

const onWindowScroll = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: 300,
    behavior: 'smooth',
  });
  console.log(cardHeight);
};

function loadBtnCheckScroll() {
  window.removeEventListener('scroll', onWindowScroll);
}

window.addEventListener('scroll', onWindowScroll);

ref.form.addEventListener('submit', onButton);
ref.loadBtn.addEventListener('click', onButton);
ref.form.addEventListener('input', onInputCheck);

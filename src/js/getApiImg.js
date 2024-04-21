// GET:      https://pixabay.com/api/
// API key:  27852972-cf3b4cc0dfb2dc5cda9d2c741
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27852972-cf3b4cc0dfb2dc5cda9d2c741';

const getImages = async q => {
  try {
    const images = await axios.get(`${BASE_URL}/?`, {
      params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 40,
        q,
      },
    });
    if (images.data.hits.length === 0) {
      return alert('no images');
    }
    return images.data.hits;
  } catch (error) {
    console.log('error in try:', error);
  }
};

export { getImages };

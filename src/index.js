import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import pictureCard from './templates/pictureCard.hbs';
/*let a = "red woman"
fetch(`https://pixabay.com/api/?key=27845573-c4cb755b67afa71dbf7307045&q=${a}`).then(response => {
    return response.json();
}).then(console.log);*/
const loadMore = document.querySelector(".load-more");
loadMore.addEventListener("click", loadMoreFu);
let page = 1;
const gallery = document.querySelector(".gallery");

const form = document.querySelector('.search-form');
form.addEventListener("submit", fetchPicture);

const input = document.querySelector("input");
    input.addEventListener("input", cleanFu);
function loadMoreFu(e) {
    page += 1;
    fetchPicture(e);
}

function cleanFu(e) {
   if (input.value.trim() === "") {
            page = 1;
            gallery.innerHTML = "";
            return page;
        } 
}

function fetchPicture(e) {
    e.preventDefault();
    

    
    console.log(input.value.trim());
    return fetch(`https://pixabay.com/api/?key=27845573-c4cb755b67afa71dbf7307045&q=${input.value.trim()}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
    .then(response => {
                return response.json();
    }).then(viewGallery => {
        console.log(viewGallery);
        //-input if
         if (viewGallery.total >= 1) {
            Notify.success(`Hooray! We found ${viewGallery.total} images.`);
            const markup = pictureCard(viewGallery);
            console.log(markup);
            gallery.innerHTML = markup;
            
        }
        else {
            Notify.info("Sorry, there are no images matching your search query. Please try again.");  
        }
    }).catch(error => {
        console.log(error);
    })
            
}
        




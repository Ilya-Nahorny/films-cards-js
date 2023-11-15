const films = [{
  id: 1,
  title: 'The Green Mile',
  year: '1999',
  genre: 'drama',
  description: 'drama for criyng',
  ranking: '8.6',
  reviews: [
    {
      id: 1,
      name: 'John',
      comment: 'Good film',
      rating: '8'
    },
    {
      id: 2,
      name: 'Paula',
      comment: 'Not bad',
      rating: '7'
    }
  ],
  favButtonState: false,
},
{
  id: 2,
  title: 'Pulp Fiction',
  year: '1994',
  genre: 'crime',
  description: 'drama for smiling',
  ranking: '8.9',
  reviews: [
    {
      id: 1,
      name: 'John',
      comment: 'Good film',
      rating: '9'
    }
  ],
  favButtonState: false,
}];


const createElement = (tag, attributes = {}, innerText = '', children = []) => {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
  element.innerText = innerText;
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  return element;
}
const appendChilds = (parent, children) => {
  children.forEach((child) => {
    parent.appendChild(child);
  });
};

const favoritFilmsList = [];

const favoritesRadio = createElement('input', {class : 'favorites-radio', type:'radio', name:'fav-option', id:'favorites', value:'favorites'}, '');
const allRadio = createElement('input', {class:'all-radio', type: 'radio', name: 'fav-option', id: 'all', value: 'all'}, '');

const labelRadioFavs = createElement('label', {class : 'label-radio', for: 'favorites'}, 'Favorites', [favoritesRadio]);
const labelRadioAll = createElement('label', {class: 'label-radio',for: 'all'}, 'All', [allRadio]);


const formRadio = createElement('form', {class : 'form-radio'}, '', [labelRadioFavs, labelRadioAll]);
const options = [];

films.forEach((film) => {
  const option = createElement('option', {class: 'option'}, film.genre);
  options.push(option);

});

const select = createElement('select', {class:'genre-select'}, '', options );

const searchInput = createElement('input', {class: 'search-input', type: 'text', placeholder: 'Search'}, '');

const header = createElement('header', {class: 'header'}, '', [formRadio ,select, searchInput]);
document.body.appendChild(header);


const cardsContainer = createElement('div', {class: 'cards-container'}, '');
document.body.appendChild(cardsContainer);


const cardsRendering = (films) => {
  films.forEach((film) => {

    const cardDiv = createElement('div', {class : 'card'}, '');
    appendChilds(cardsContainer, [cardDiv]);
    
    appendChilds(cardDiv, [
      createElement('p', {class: 'card-title'}, film.title),
      createElement('p', {class: 'card-year'}, film.year),
      createElement('p', {class: 'card-genre'}, film.genre),
      createElement('p', {class: 'card-description'}, film.description),
      createElement('p', {class: 'card-ranking'}, film.ranking)
    ]);

    const userRewiew = createElement('div', {class:'user-review'}, '');
    appendChilds(cardDiv, [userRewiew]);

    film.reviews.forEach((review) => {
      const cardReviews = createElement('p', {class : 'card-reviews'}, 'User - ' + review.name + ' || '+ review.comment + ' || Rating: ' + review.rating);

      const deleteReviewButton = createElement('button', {class:'delete-review-button'}, 'Delete');

      const cardReviewContainer = createElement('div', {class:'card-review-container'}, '', [cardReviews, deleteReviewButton])
      appendChilds(cardDiv, [cardReviewContainer]);

      deleteReviewButton.addEventListener('click', () => {
        film.reviews.splice(review.id - 1, 1);
        cardReviewContainer.innerHTML = '';
      });
    });

    const filmDeleteButton = createElement('button', {class: 'card-delete-button'}, 'Delete the movie');

    filmDeleteButton.addEventListener('click', () => {
      films.splice(film.id - 1, 1);
      cardDiv.remove();
    });

    const filmToFavsoritesButton = createElement('button', {class: 'card-favorites-button'}, '');
    filmToFavsoritesButton.innerText = film.favButtonState ? 'Remove from favorites' : 'Add to favorites';
    appendChilds(cardDiv, [filmDeleteButton, filmToFavsoritesButton]);

    filmToFavsoritesButton.addEventListener('click', () => {
      if(!favoritFilmsList.includes(film.id)){
        favoritFilmsList.push(film.id);
        film.favButtonState = !film.favButtonState;
        filmToFavsoritesButton.innerText = film.favButtonState ? 'Remove from favorites' : 'Add to favorites';
      } else if(favoritFilmsList.includes(film.id)){
        const index = favoritFilmsList.indexOf(film.id);
        if (index > -1) {
          favoritFilmsList.splice(index, 1);
        }
        film.favButtonState = !film.favButtonState;
        filmToFavsoritesButton.innerText = film.favButtonState ? 'Remove from favorites' : 'Add to favorites';
      }
    });

    const userName = createElement('input', {class: 'user-name', placeholder: 'Name'}, '');

    const userComment = createElement('input', {class: 'user-comment', placeholder: 'Comment'}, '');

    const userRating = createElement('input', {class: 'user-rating', placeholder: 'Rating'}, '');

    const button = createElement('button', {class: 'user-review-button'}, 'Add review');
    appendChilds(userRewiew, [userName, userComment, userRating, button]);

    button.addEventListener('click', () => {
      const userReview = {
        id: film.reviews.length + 1,
        name: userName.value ? userName.value : 'Anonymous',
        comment: userComment.value ? userComment.value : 'No comment',
        rating: userRating.value ? userRating.value : 0
      };
      film.reviews.push(userReview);
      const userReviewText = 'User - ' + userReview.name + ': '+ userReview.comment + " || Rating: " + userReview.rating;
      const cardReviewContainer = createElement('div', {class: 'card-review-container'}, userReviewText);
      appendChilds(cardDiv, [cardReviewContainer]);

      const deleteReviewButton = createElement('button', {class: 'delete-review-button'}, 'Delete');
      appendChilds(cardReviewContainer, [deleteReviewButton]);
      deleteReviewButton.addEventListener('click', () => {
        film.reviews.splice(userReview.id - 1, 1);
        cardReviewContainer.innerHTML = '';
      });
    });
  });
}

cardsRendering(films);


const addFilmContainer = createElement('div', {class: 'add-film-container'}, '');
appendChilds(document.body, [addFilmContainer]);

const filmName = createElement('input', {class: 'film-name', type: 'text', required: true, placeholder: 'Film name'}, '');

const filmYear = createElement('input', {class: 'film-year',  type: 'text', required: true, placeholder: 'Film year'}, '');

const filmGenre = createElement('input', {class: 'film-genre', type: 'text', required: true, placeholder: 'Film genre'}, '');

const filmDescription = createElement('input', {class: 'film-description',  type: 'text', required: true, placeholder: 'Film description'}, '');

const filmRanking = createElement('input', {class: 'film-ranking',  type: 'text', required: true, placeholder: 'Film ranking'}, '');

const addFilmButton = createElement('button', {class: 'add-film-button'}, 'Add film');

appendChilds(addFilmContainer, [filmName, filmYear, filmGenre, filmDescription, filmRanking, addFilmButton]);

searchInput.addEventListener('input', (event) => {
  const searchValue = event.target.value.toLowerCase();
  const filteredFilmsTitle = films.filter((film) => {
    return film.title.toLowerCase().includes(searchValue);
  });
  const filteredFilmsYear = films.filter((film) => {
    return film.year.toLowerCase().includes(searchValue);
  });
  cardsContainer.innerHTML = '';
  cardsRendering(filteredFilmsTitle);
  cardsRendering(filteredFilmsYear);
});

select.addEventListener('change', (event) => {
  const genreValue = event.target.value;
  const filteredFilms = films.filter((film) => {
    return film.genre === genreValue;
  });
  cardsContainer.innerHTML = '';
  cardsRendering(filteredFilms);
} );

addFilmButton.addEventListener('click', () => {
  const newFilm = {
    id: films.length + 1,
    title: filmName.value,
    year: filmYear.value,
    genre: filmGenre.value,
    description: filmDescription.value,
    ranking: filmRanking.value,
    reviews: []
  };

  if(newFilm.title && newFilm.year && newFilm.genre && newFilm.description && newFilm.ranking) {
    let genreExists = false;
    films.forEach((film) => {
      if(film.genre === newFilm.genre) {
        genreExists = true;
      }
    });

    if (!genreExists) {
      const option = createElement('option', {class: 'option', value: newFilm.genre}, newFilm.genre);
      appendChilds(select, [option]);
    }

    films.push(newFilm);
    cardsContainer.innerHTML = '';
    cardsRendering(films);
  } else {
    alert('Please fill all fields');
  }
});

favoritesRadio.addEventListener('input', () => {
  if(favoritFilmsList.length === 0) cardsContainer.innerHTML = "You don't have any favorites yet";
  else {
    const filteredFilms = films.filter((film) => {
      return favoritFilmsList.includes(film.id);
    });
    cardsContainer.innerHTML = '';
    cardsRendering(filteredFilms);
  
  }
});

allRadio.addEventListener('input', () => {
  cardsContainer.innerHTML = '';
  cardsRendering(films);
});
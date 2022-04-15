'use strict';

const cardsContainer = document.getElementById('root');

async function loadCards(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const cards = data.map((data) => generateUserCard(data));
    cardsContainer.append(...cards);
  } catch(e) {
    console.log(e);
  }
}
loadCards('./assets/js/data.json');

function generateUserCard(userObj) {
  const fullName =
    `${userObj.firstName} ${userObj.lastName}`.trim() ||
    CARD_CONSTANTS.userName;

  

  const imgWrapper = createUserCardImageWrapper(userObj, fullName);

  const cardName = createElement('h2', {classNames: ['cardName']}, fullName);

  const cardDescription = createElement('p', {classNames: ['cardDescription']}, userObj.description || CARD_CONSTANTS.cardDescription);
  
  const cardArticle = createElement('article', {classNames: ['cardContainer']}, imgWrapper, cardName, cardDescription);

  const card = createElement('li', {classNames: ['userCardWrapper']}, cardArticle);

  return card;
}

function createUserCardImageWrapper(userObj, fullName) {
  const userImgElem = createElement('img', {
    classNames: ['cardImg'],
    attributes: {
      src: userObj.profilePicture,
      alt: fullName,
      'data-id': userObj.id,
    },
    listeners: {
      error: errorHandler,
      load: loadHandler,
    },
  });

  const initialsElem = createElement(
    'div',
    { classNames: ['initials'] },
    getInitials(fullName)
  );

  const imgWrapperElem = createElement(
    'div',
    {
      classNames: ['cardImgWrapper'],
      attributes: { id: `imgWrapper${userObj.id}` },
    },
    initialsElem
  );

  return imgWrapperElem;
}

function errorHandler({ target }) {
  target.remove();
}

function loadHandler({
  target,
  target: {
    dataset: { id },
  },
}) {
  document.getElementById(`imgWrapper${id}`).append(target);
}

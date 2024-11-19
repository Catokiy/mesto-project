// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list')

const profilePopup = document.querySelector('.popup_type_edit')
const cardPopup = document.querySelector('.popup_type_new-card')

const imagePopup = document.querySelector('.popup_type_image')
const imagePopupSrc = imagePopup.querySelector('.popup__image')
const imagePopupTitle = imagePopup.querySelector('.popup__caption')
const imagePopupClose = imagePopup.querySelector('.popup__close')

profilePopup.classList.add('popup_is-animated')
cardPopup.classList.add('popup_is-animated')
imagePopup.classList.add('popup_is-animated')



// Функция создания карточек
const createCard = function (cardItem) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardDeleteButton = card.querySelector('.card__delete-button');

    cardImage.setAttribute('src', cardItem['link']);
    cardImage.addEventListener('click', () => {
        imagePopupSrc.setAttribute('src', cardItem['link'])
        imagePopupTitle.textContent = cardItem['name']
        imagePopupClose.addEventListener('click', () => closeModal(imagePopup)) 
        openModal(imagePopup)
    })
    cardTitle.textContent = cardItem['name'];
    cardLikeButton.addEventListener('click', (e) => e.target.classList.toggle('card__like-button_is-active'))
    cardDeleteButton.addEventListener('click', (e) => e.target.closest('.card').remove())
    return card
}

initialCards.forEach((item => placesList.append(createCard(item))));

// Общие функции для .popup

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}

// popup редактирования профиля
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const descrInput = profilePopup.querySelector('.popup__input_type_description'); 

const profName = document.querySelector('.profile__title');
const profDescription = document.querySelector('.profile__description');

document.querySelector('.profile__edit-button').addEventListener('click', (e) => {
    nameInput.value = profName.textContent
    descrInput.value = profDescription.textContent

    openModal(profilePopup)
});


profilePopup.querySelector('.popup__close').addEventListener('click', () => closeModal(profilePopup));


profilePopup.querySelector('.popup__form').addEventListener('submit', (e) => {
    e.preventDefault();

    profName.textContent = nameInput.value;
    profDescription.textContent = descrInput.value;

    closeModal(profilePopup)
});

// popup добавления карточек

const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const urlInput = cardPopup.querySelector('.popup__input_type_url'); 

document.querySelector('.profile__add-button').addEventListener('click', (e) => {
    cardNameInput.value = null;
    urlInput.value = null;

    openModal(cardPopup)
});


cardPopup.querySelector('.popup__close').addEventListener('click', () => closeModal(cardPopup));


cardPopup.querySelector('.popup__form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    placesList.append(createCard({'name': cardNameInput.value, 'link': urlInput.value}))

    closeModal(cardPopup)
});
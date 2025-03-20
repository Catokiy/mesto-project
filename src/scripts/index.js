import '../pages/index.css'; 
import { ServerConnector } from './server-connection';
import { popup } from './popup-functions';

const profileId = await ServerConnector.getProfileId().then((id) => {return id})

const placesList = document.querySelector('.places__list')

const profilePopup = document.querySelector('.popup_type_edit')
const cardPopup = document.querySelector('.popup_type_new-card')
const avatarPopup = document.querySelector('.popup_type_avatar')

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
    const cardLikeCounter = card.querySelector('.card__like-counter')
    const cardDeleteButton = card.querySelector('.card__delete-button');
    cardDeleteButton.style.display = 'none'

    cardImage.setAttribute('src', cardItem.link);
    cardImage.addEventListener('click', () => {
        imagePopupSrc.setAttribute('src', cardItem.link)
        imagePopupTitle.textContent = cardItem.name
        imagePopupClose.addEventListener('click', () => popup.closeModal(imagePopup)) 
        popup.openModal(imagePopup)
    })

    if (cardItem.likes.some((like) => like._id === profileId)) {
    cardLikeButton.classList.add('card__like-button_is-active')
    }
    if (cardItem.owner._id == profileId) {
    cardDeleteButton.style.display = 'inline-block'
    cardDeleteButton.addEventListener('click', (e) => {
        e.target.closest('.card').remove()
        ServerConnector.deleteCard(cardItem._id)
    })}


    cardTitle.textContent = cardItem['name'];
    cardLikeButton.addEventListener('click', (e) => {
        if (e.target.classList.contains('card__like-button_is-active')) {
            cardLikeCounter.textContent = Number(cardLikeCounter.textContent) - 1
            ServerConnector.delLike(cardItem._id)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                console.log(e.target.closest('.card'))
                e.target.closest('.card').parentNode.insertBefore(createCard(res),e.target.closest('.card'))
            })
            .then((res) => e.target.closest('.card').remove())
        } else {
            cardLikeCounter.textContent = Number(cardLikeCounter.textContent) + 1
            ServerConnector.putLike(cardItem._id)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                console.log(e.target.closest('.card'))
                e.target.closest('.card').parentNode.insertBefore(createCard(res),e.target.closest('.card'))
            }).then((res) => e.target.closest('.card').remove())
            
        }
        e.target.classList.toggle('card__like-button_is-active')
    })

    cardLikeCounter.textContent = cardItem.likes.length
    
    
    return card
}
ServerConnector.getInitialCards()
.then((initialCards) => 
    {
        for (let i=1; i<initialCards.length; i++) {
            placesList.append(createCard(initialCards[i]));
        }
    }
)

// popup редактирования профиля
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const descrInput = profilePopup.querySelector('.popup__input_type_description'); 
const profileInputArray = [nameInput, descrInput]
const profileSubmitButton = profilePopup.querySelector('.popup__button')

const profName = document.querySelector('.profile__title');
const profDescription = document.querySelector('.profile__description');
const profImage = document.querySelector('.profile__image');

ServerConnector.getProfileData().then((profileData) => {
    profName.textContent = profileData.name
    profDescription.textContent = profileData.about
    profImage.style.backgroundImage = `url(${profileData.avatar})`
})



document.querySelector('.profile__edit-button').addEventListener('click', (e) => {
    nameInput.value = profName.textContent
    descrInput.value = profDescription.textContent

    popup.openModal(profilePopup)
});




nameInput.addEventListener('input', (e) => popup.checkValidity(nameInput, profileSubmitButton, profileInputArray))
descrInput.addEventListener('input', (e) => popup.checkValidity(descrInput, profileSubmitButton, profileInputArray))

profilePopup.querySelector('.popup__close').addEventListener('click', () => popup.closeModal(profilePopup));


profilePopup.querySelector('.popup__form').addEventListener('submit', (e) => {
    e.preventDefault();
    ServerConnector.editProfile(nameInput.value,descrInput.value)
    .then((result) => result.json())
    .then((profileData) => {
        profName.textContent = profileData.name;
        profDescription.textContent = profileData.about;
        profImage.style.backgroundImage = `url(${profileData.avatar})`
    })
    popup.closeModal(profilePopup)
});

// popup редактирования аватара

const avatarInput = avatarPopup.querySelector('.popup__input_type_avatar'); 
const avatarSubmitButton = avatarPopup.querySelector('.popup__button')

avatarInput.addEventListener('input', (e) => popup.checkValidity(avatarInput, avatarSubmitButton, [avatarInput]))

avatarPopup.querySelector('.popup__close').addEventListener('click', () => popup.closeModal(avatarPopup));


document.querySelector('.profile__edit-avatar-button').addEventListener('click', (e) => {
    avatarInput.value = null;

    popup.openModal(avatarPopup)
});


avatarPopup.querySelector('.popup__close').addEventListener('click', () => popup.closeModal(avatarPopup));


avatarPopup.querySelector('.popup__form').addEventListener('submit', (e) => {
    e.preventDefault();
    ServerConnector.editAvatar(avatarInput.value)
    .then((result) => result.json())
    .then((profileData) =>
    {  
        profImage.style.backgroundImage = `url(${profileData.avatar})`
        popup.closeModal(avatarPopup)
    })
});

// popup добавления карточек

const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const urlInput = cardPopup.querySelector('.popup__input_type_url'); 
const cardInputArray = [cardNameInput, urlInput]
const cardSubmitButton = cardPopup.querySelector('.popup__button')

cardNameInput.addEventListener('input', (e) => popup.checkValidity(cardNameInput, cardSubmitButton, cardInputArray))
urlInput.addEventListener('input', (e) => popup.checkValidity(urlInput, cardSubmitButton, cardInputArray))

profilePopup.querySelector('.popup__close').addEventListener('click', () => popup.closeModal(profilePopup));


document.querySelector('.profile__add-button').addEventListener('click', (e) => {
    cardNameInput.value = null;
    urlInput.value = null;

    popup.openModal(cardPopup)
});


cardPopup.querySelector('.popup__close').addEventListener('click', () => popup.closeModal(cardPopup));


cardPopup.querySelector('.popup__form').addEventListener('submit', (e) => {
    e.preventDefault();
    ServerConnector.addCard(cardNameInput.value,urlInput.value)
    
    .then((result) => result.json())
    .then((cardData) =>
    {
        console.log(cardData)
        placesList.append(createCard(cardData))})   
    popup.closeModal(cardPopup)
});
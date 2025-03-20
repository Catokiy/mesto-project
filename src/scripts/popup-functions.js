export const popup = {

openModal: function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    document.addEventListener("keydown", (e) => {if (e.key == "Escape") closeModal(popup)});
    popup.addEventListener("click", (e) => {
        if (e.target === e.currentTarget){
            closeModal(popup)}
        });
},

closeModal: function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
},

showInputError: (formElement, validMessage) => {
    const formError = document.querySelector(`.popup__error_type_${formElement.id}`);
    formError.textContent = validMessage
    formError.classList.add("popup__error_active")
    formElement.classList.add("popup__input_error")
},

hideInputError: (formElement, validMessage) => {
    const formError = document.querySelector(`.popup__error_type_${formElement.id}`);
    formError.textContent = ""
    formError.classList.remove("popup__error_active")
    formElement.classList.remove("popup__input_error")
},

toggleButton: (button, inputArray) => {
    if (inputArray.some((input) => {
        return !input.validity.valid;
      })) {
        button.classList.add("inactive")
        button.disabled = true;
    }
    else {
        button.classList.remove("inactive")
        button.disabled = false;

    }
},


checkValidity: (formElement, button, inputArray) => {
    toggleButton(button, inputArray)
    if (!formElement.validity.valid) {
        showInputError(formElement, formElement.validationMessage)
    }
    else {
        hideInputError(formElement, formElement.validationMessage)
    }
}
}
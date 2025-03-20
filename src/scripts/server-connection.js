export const ServerConnector = {

TOKEN: '24d0f0da-0f69-4734-b57c-665ae9266079',
GROUPID: 'apf-cohort-202',


getProfileData: function getProfileData() {
    return fetch(`https://nomoreparties.co/v1/${this.GROUPID}/users/me`, {
    headers: {
      authorization: this.TOKEN
    }
  })
    .then(res => res.json())
},

getProfileId: function getProfileId() {
  return this.getProfileData().then((profileData) => {return profileData._id})
},

getInitialCards: function getInitialCards() {
    return fetch(`https://nomoreparties.co/v1/${this.GROUPID}/cards`, {
        headers: {
          authorization: this.TOKEN
        }
      })
        .then(res => res.json())
},

editProfile: function editProfile(profileName, profileDescription) {
    return fetch(`https://nomoreparties.co/v1/${this.GROUPID}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this.TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: profileName,
          about: profileDescription
        })
      })
      .catch((res) => console.log(res))
},

editAvatar: function editAvatar(newAvatarLink) {
  return fetch(`https://nomoreparties.co/v1/${this.GROUPID}/users/me/avatar `, {
      method: 'PATCH',
      headers: {
        authorization: this.TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: newAvatarLink
      })
    })
    .catch((res) => console.log(res))
},

addCard: function addCard(cardName, cardLink) {
    return fetch(`https://nomoreparties.co/v1/${this.GROUPID}/cards`, {
        method: 'POST',
        headers: {
          authorization: this.TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        })
      })
      .catch((res) => console.log(res))
},

deleteCard: function deleteCard(id) {
  return fetch(`https://nomoreparties.co/v1/${this.GROUPID}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: this.TOKEN,
    }
  })
  .catch((res) => console.log(res))
},

putLike: function putLike(id) {
  return fetch(`https://nomoreparties.co/v1/${this.GROUPID}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: this.TOKEN,
    }
  })
  .catch((res) => console.log(res))
},

delLike: function delLike(id) {
  return fetch(`https://nomoreparties.co/v1/${this.GROUPID}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: this.TOKEN,
    }
  })
  .catch((res) => console.log(res))
}
}


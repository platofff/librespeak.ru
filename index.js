import './3rd-party/firebase-app.js'
import './3rd-party/firebase-database.js'

const firebaseConfig = {
  apiKey: 'AIzaSyDSkxxl1QQxaYibhcNohcIWLhdiddT3VrQ',
  authDomain: 'librespeak-ccc37.firebaseapp.com',
  projectId: 'librespeak-ccc37',
  storageBucket: 'librespeak-ccc37.appspot.com',
  messagingSenderId: '128906723614',
  appId: '1:128906723614:web:9d4269bb0581a9d383890f',
  databaseURL: 'https://librespeak-ccc37-default-rtdb.europe-west1.firebasedatabase.app'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const onlineDiv = document.getElementById('online')
const adminsDiv = document.getElementById('admins')
const membersCount = document.getElementById('members-count')
const getURL = (vk_id) => {
  return vk_id > 0 ? `https://vk.com/id${vk_id}` : `https://vk.com/club${Math.abs(vk_id)}`
}

firebase.database().ref('online').on('value', (snapshot) => {
  const online = snapshot.val()
  onlineDiv.innerHTML = ''
  for (const member of Object.keys(online)) {
    onlineDiv.innerHTML += `<div onclick="window.open('${getURL(member)}', '_blank')" class="member">
      <img src="${online[member][1]}">
      ${online[member][0]}
    </div>`
  }
})
firebase.database().ref('admins').on('value', (snapshot) => {
  const admins = snapshot.val()
  adminsDiv.innerHTML = ''
  for (const member of Object.keys(admins)) {
    adminsDiv.innerHTML += `<div onclick="window.open('${getURL(member)}', '_blank')" class="member">
        <img src="${admins[member][1]}">
        ${admins[member][0]}
      </div>`
  }
})
/*
firebase.database().ref('last_photos').on('value', (snapshot) => {
  const lastPhotos = snapshot.val()
  for (let i = 0; i < 10; i++) {
    document.getElementById(`img${i}`).src = lastPhotos[i]
  }
})
*/
firebase.database().ref('members_count').on('value', (snapshot) => {
  membersCount.innerHTML = snapshot.val()
})

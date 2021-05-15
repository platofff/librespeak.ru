'use strict'
import './3rd-party/firebase-app.js'
import './3rd-party/firebase-database.js'
import './3rd-party/chart.js'

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
const updated = document.getElementById('updated')
const getURL = (vkId) => vkId > 0 ? `https://vk.com/id${vkId}` : `https://vk.com/club${Math.abs(vkId)}`
const database = firebase.database()

database.ref('online').on('value', (snapshot) => {
  const online = snapshot.val()
  onlineDiv.innerHTML = ''
  for (const member of Object.keys(online)) {
    onlineDiv.innerHTML += `<div onclick="window.open('${getURL(member)}', '_blank')" class="member">
      <img src="${online[member][1]}">
      ${online[member][0]}
    </div>`
  }
})
database.ref('admins').on('value', (snapshot) => {
  const admins = snapshot.val()
  adminsDiv.innerHTML = ''
  for (const member of Object.keys(admins)) {
    adminsDiv.innerHTML += `<div onclick="window.open('${getURL(member)}', '_blank')" class="member">
        <img src="${admins[member][1]}">
        ${admins[member][0]}
      </div>`
  }
})
database.ref('members_count').on('value', (snapshot) => {
  membersCount.innerHTML = snapshot.val()
})
database.ref('updated').on('value', (snapshot) => {
  const date = new Date(snapshot.val() * 1000)
  updated.innerText = `${date.getHours()}:${('0' + date.getMinutes()).substr(-2)}:${('0' + date.getSeconds()).substr(-2)} \
${date.getDate()}.${('0' + date.getMonth()).substr(-2)}.${date.getFullYear()}`
})
database.ref('online_history').on('value', (snapshot) => {
  const val = snapshot.val()
  const labels = []
  const dataset = []
  const chartContainer = document.getElementById('chart-container')
  for (const timestamp of Object.keys(val)) {
    const date = new Date(Number(timestamp * 1000))
    labels.push(`${date.getHours()}:${date.getMinutes()}`)
    dataset.push(val[timestamp])
  }
  const chart = new Chart(
    chartContainer,
    {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Онлайн',
          backgroundColor: 'green',
          borderColor: 'green',
          data: dataset
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              callback: (value) => {
                if (value % 1 === 0) { return value }
              }
            }
          }
        }
      }
    }
  )
})

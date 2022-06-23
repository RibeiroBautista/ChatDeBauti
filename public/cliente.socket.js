const socket = io()
const messagesForm = document.querySelector('#messagesForm')
const usernameInput = document.querySelector('#usernameInput')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')

function sendMessage(messageInfo) {

    socket.emit('client:message', messageInfo)

}

function renderMesseges (messageInfo) {

    const html = messageInfo.map(msgInfo => {
        return(`<div>
        <strong>${msgInfo.username}</strong>:
        <em>${msgInfo.message}</em></div>`)
    }).join(" ");
    messagesPool.innerHTML = html;

}

function submitHandler (event) {
    event.preventDefault()

    const messageInfo = { username: usernameInput.value, message: messageInput.value }

    sendMessage(messageInfo)
}
messagesForm.addEventListener('submit', submitHandler)

socket.on('server:messege', renderMesseges)
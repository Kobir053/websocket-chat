const socket = io("http://localhost:3000", {
    withCredentials: false,
    transports: ["websocket"]
});

const button = document.getElementById("send");
button.addEventListener("click", sendMessageThroughSocket);

socket.on("send", (data) => {
    console.log(data);
    sendTheMessage(data.message);
});

socket.on("connect", () => {
    console.log("connected to the server");
});

socket.on("connect_error", (err) => {
    console.log("failed to connect to server due to error : " + err);
});


function sendMessageThroughSocket() {
    const input = document.querySelector("footer > input");
    const message = input.value;
    if(!message || message.length == 0){
        console.log("please enter a message");
        return;
    }
    socket.emit("send", {
        message: message
    })
    console.log("message ", message);
    return;
}

function sendTheMessage (message) {
    const div = document.getElementById("messages");

    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    // listItem.innerHTML = message;

    div.appendChild(paragraph);
}
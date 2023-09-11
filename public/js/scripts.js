//Scroll chat

document.addEventListener("DOMContentLoaded", function () {
    const messagesContainer = document.querySelector(".messages-container");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

//Refresh chat

document.addEventListener("DOMContentLoaded", function() {
    setInterval(function() {
        location.reload();
    }, 10000); // Refresca la página cada 3 segundos
});

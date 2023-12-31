/** @format */

const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbox");
const chatToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");


let userMessage;
const API_URL = "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";
const inputInitheight = chatInput.scrollHeight;
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

const generateResponse = () => {
  const API_ENDPOINT = "https://api.openai.com/v1/chat/completions"; // Ganti API_ENDPOINT dengan URL endpoint yang valid
  const messageElement = document.querySelector("p");

  // Tentukan properti dan pesan untuk permintaan API
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_URL}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    }),
  };

  // Kirim permintaan POST ke API untuk mendapatkan respons
  fetch(API_ENDPOINT, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      messageElement.textContent = data.choices[0].message.content;
    })
    .catch((error) => {
      messageElement.classList.add("error");
      messageElement.textContent = "Oops! Terjadi kesalahan. Coba lagi nanti.";
    }).finally() => chatBox.scrollTop(0, chatBox.scrollHeight);
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatBox.appendChild(createChatLi(userMessage, "outgoing"));
  setTimeout(() => {
    const incomingChatLi = createChatLi("thinking...", "incoming");
    chatBox.appendChild(incomingChatLi);
    chatBox.scrollTop(0, chatBox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () => {
  document.body.classList.toggle("show-chatbot");
});
chatbotToggler.addEventListener("click", () => {
  document.body.classList.remove("show-chatbot");
});

chatInput.addEventListener("input", () => {
  chatInput.style.height= `${inputInitheight}px`;
  chatInput.style.height= `${chatInput.scrollHeight}px`;
})
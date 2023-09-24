// import React, { useEffect, useRef, useState } from 'react';

// const ChatBox: React.FC = () => {
//   const [text, setText] = useState<string>('');
//   const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
//   const messageAreaRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const header = document.querySelector('.header');
//     const chatRoom = document.querySelector('.chat-room');
//     const typeArea = document.querySelector('.type-area');
//     const btnAdd = document.querySelector('.button-add');
//     const others = document.querySelector('.others');
//     const emojiBox = document.querySelector('.emoji-button .emoji-box');
//     const emojiButton = document.querySelector('.others .emoji-button');
//     const emojis = document.querySelectorAll('.emoji-box span');
//     const inputText = document.querySelector<HTMLInputElement>('#inputText');
//     const btnSend = document.querySelector('.button-send');

//     // Header onclick event
//     header?.addEventListener('click', () => {
//       if (typeArea?.classList.contains('d-none')) {
//         header.style.borderRadius = '20px 20px 0 0';
//       } else {
//         header.style.borderRadius = '20px';
//       }
//       typeArea?.classList.toggle('d-none');
//       chatRoom?.classList.toggle('d-none');
//     });

//     // Button Add onclick event
//     btnAdd?.addEventListener('click', () => {
//       others?.classList.add('others-show');
//     });

//     // Emoji onclick event
//     emojiButton?.addEventListener('click', () => {
//       emojiBox?.classList.add('emoji-show');
//     });

//     // Button Send onclick event
//     btnSend?.addEventListener('click', () => {
//       const mess = inputText?.value;
//       if (mess && messageAreaRef.current) {
//         const bubble = document.createElement('div');
//         bubble.className += ' bubble bubble-dark';
//         bubble.textContent = mess;
//         messageAreaRef.current.appendChild(bubble);
//         inputText.value = '';
//       }
//     });

//     emojis?.forEach((emoji) => {
//       emoji?.addEventListener('click', (e) => {
//         e.stopPropagation();
//         emojiBox?.classList.remove('emoji-show');
//         others?.classList.remove('others-show');
//         if (inputText) {
//           inputText.value += e.target?.textContent;
//         }
//       });
//     });
//   }, []);

//   const submitMessage = () => {
//     const trimmedText = text?.trim();
//     if (!trimmedText) {
//       return;
//     } else {
//       // Add your logic here for handling submitted messages
//       if (messageAreaRef.current) {
//         const bubble = document.createElement('div');
//         bubble.className += ' bubble bubble-dark';
//         bubble.textContent = trimmedText;
//         messageAreaRef.current.appendChild(bubble);
//         setText('');
//       }
//     }
//   };

//   const functionCallOnPressInter = (
//     e: React.KeyboardEvent<HTMLTextAreaElement>
//   ) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       submitMessage();
//     }
//   };

//   return (
//     <div className="chat-box">
//       <div className="header">
//         {/* Header content */}
//       </div>
//       <div className="chat-room" ref={messageAreaRef}>
//         {/* Chat room content */}
//       </div>
//       <div className="type-area">
//         {/* Type area content */}
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

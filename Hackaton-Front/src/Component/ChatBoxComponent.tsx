import { useState } from "react";


type ChatBoxProps = {
  senderId: number;
  careTeamId: string;

};

const ChatBox: React.FC<ChatBoxProps> = ({ senderId, careTeamId }) => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(true);
  const [message, setMessage] = useState("");

  const closeChatbox = () => {
    setIsChatboxOpen(false);
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {
        const response = await fetch('http://localhost:3000/api/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ senderId: senderId, careTeamId: careTeamId, messageContent: message }),
          });

        // ...gestion de la réponse
    } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
    }
};

  return (
    <div className={`bg-slate-200 p-6 rounded-lg shadow-md fixed top-0 right-0 h-full w-1/4 ${isChatboxOpen ? "" : "hidden"}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Chat</h2>
        <button onClick={closeChatbox} className="text-gray-500 hover:text-gray-700">Fermer</button>
      </div>
      <div className="flex flex-col h-full">
        {/* Affichage des messages ici */}
        <div className="absolute inset-x-0 bottom-2 w-11/12 ml-5">
          <form className="flex" onSubmit={sendMessage}>
            <input
              id="messageInput"
              className="flex-1 p-2 border rounded-l-lg"
              type="text"
              placeholder="Écrire un message..."
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
              type="submit"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

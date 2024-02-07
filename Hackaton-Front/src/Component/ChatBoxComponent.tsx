import { useState } from "react";
import { Message } from "../Interface/Message";
import { Patient } from "../Interface/Patient";

type ChatBoxComponentProps = {
  patient : Patient
}

const ChatBox = ({patient}: ChatBoxComponentProps) => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(true);
  const [message, setMessage] = useState<Message>({careTeamId: "", senderId: patient, content: "", createdAt: "",messageType:""});
  const [listMessage, setListMessage] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState<string>("")

  const closeChatbox = () => {
    setIsChatboxOpen(false);
  };

  function sendMessage(){
    console.log(inputValue)
    let newMessage = {careTeamId: "1", senderId: patient, content: inputValue, createdAt: "18/20/06",messageType:"Tous"}
    console.log(inputValue)
    setMessage(newMessage)
    let newListMessage = listMessage
    newListMessage.push(newMessage)
    setListMessage(newListMessage)
  }

  return (
    <div
      className={`bg-slate-200 p-6 rounded-lg shadow-md fixed top-0 right-0 h-full w-1/4 ${
        isChatboxOpen ? "" : "hidden"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Chat</h2>
        <button
          onClick={closeChatbox}
          className="text-gray-500 hover:text-gray-700"
        >
          Fermer
        </button>
      </div>
      <div className="flex flex-col h-full">
        <div>
          {/* <p> */}
            {listMessage.map((message) => <p key={"a"}>{message.senderId.firstname} {message.senderId.lastname} : {message.content}</p>)}
          {/* </p> */}
        </div>
        <div className="absolute inset-x-0 bottom-2 w-11/12 ml-5">
          <form className="flex" onSubmit={(event) => event.preventDefault()}>
            <input
              id="messageInput"
              className="flex-1 p-2 border rounded-l-lg"
              type="text"
              placeholder="Écrire un message..."
              onChange={(event) =>setInputValue(event.target.value) }
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
              type="submit"
              onClick={() => sendMessage()}
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

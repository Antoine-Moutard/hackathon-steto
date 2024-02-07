import { useState } from "react";
import { Message } from "../Interface/Message";
import { Patient } from "../Interface/Patient";



type ChatBoxComponentProps = {
  patient : Patient,
  toggleChatBox: () => void
}

const ChatBoxComponent = ({patient, toggleChatBox}: ChatBoxComponentProps) => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(true);
  const [message, setMessage] = useState<Message>({careTeamId: "", senderId: patient, content: "", createdAt: "",messageType:""});
  const [listMessage, setListMessage] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const [isFilterMessages, setIsFilterMessages] = useState(false);

  // const closeChatbox = () => {
  //   setIsChatboxOpen(false);
  // };


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
    <div className="bg-slate-100 p-6 rounded-tl-3xl shadow-md fixed top-0 right-0 h-full w-1/4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Messagerie</h2>
        <button
          onClick={toggleChatBox}
          className="hover:bg-blue-200 p-2 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
      </div>

      <div className="space-x-2">
        <button
          onClick={() => setIsFilterMessages(false)}
          className={`font-bold text-blue-950 hover:bg-blue-200 px-4 py-2 rounded-3xl ${
            isFilterMessages ? "" : "bg-blue-300"
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => setIsFilterMessages(true)}
          className={`font-bold text-blue-950 hover:bg-blue-200 px-4 py-2 rounded-3xl ${
            isFilterMessages ? "bg-blue-300" : ""
          }`}
        >
          Entre pro
        </button>
      </div>

      <div className="flex flex-col h-full">        
        <div>
          {/* <p> */}
            {listMessage.map((message) => <p key={"a"}>{message.senderId.firstname} {message.senderId.lastname} : {message.content}</p>)}
          {/* </p> */}
        </div>
        <div className="absolute inset-x-0 bottom-2 w-11/12 ml-5">
          {/* <form className="flex"> */}
            <input
              id="messageInput"
              className="flex-1 p-2 border rounded-l-lg"
              type="text"
              placeholder="Écrire un message..."
              onChange={(event) =>setInputValue(event.target.value) }
            />
            <button
              className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-r-lg"
              type="submit"
              onClick={() => sendMessage()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-send"
                viewBox="0 0 16 16"
              >
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
              </svg>
            </button>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default ChatBoxComponent;

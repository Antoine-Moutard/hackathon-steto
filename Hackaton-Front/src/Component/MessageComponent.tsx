import { Message } from "../Interface/Message";
import { Patient } from "../Interface/Patient";
import { Pro } from "../Interface/Pro";

interface MessageProps {
  listMessage: Message[];
  patient: Patient;
}

export const MessageComponent = (
  { listMessage }: MessageProps,
  currentUser: Patient | Pro
) => {
  function printMessage(message: Message) {
    if (
      currentUser.firstname + currentUser.lastname == message.sender_name ||
      currentUser.firstname + " " + currentUser.lastname == message.sender_name
    ) {
      console.log(message.sender_name);
      return (
        <div
          key={message.id}
          className="max-w-80 bg-green-200 rounded-l-2xl px-4 py-1 relative -right-24 space-y-2"
        >
          <p className="font-bold">{message.message_content}</p>
          <div className=" flex space-x-2">
            <p>{message.message_date}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={message.id}
          className="max-w-80 bg-gray-300 rounded-r-2xl px-4 py-1 relative space-y-2"
        >
          <h1 className="font-bold text-blue-950">{message.sender_name}</h1>
          <p className="font-bold">{message.message_content}</p>
          <div className="flex space-x-2">
            <p>{message.message_date}</p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="h-4/6 overflow-auto space-y-2 mt-2 rounded-2xl p-2">
      {listMessage.map((mess) => printMessage(mess))}
    </div>
  );
};

import { Message } from "../Interface/Message";
import { Patient } from "../Interface/Patient";

interface MessageProps {
  listMessage: Message[];
  patient: Patient;
}

export const MessageComponent = ({ listMessage, patient }: MessageProps) => {
  function printMessage(message: Message) {
    if (patient.firstname + " " + patient.lastname == message.sender_name) {
      return (
        <div
          key={message.id}
          className="max-w-80 bg-gray-300 rounded-r-lg p-2 relative space-y-2"
        >
          <p>{message.message_content}</p>
          <div className="font-bold flex space-x-2">
            <p>{message.message_date}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={message.id}
          className="max-w-80 bg-green-200 rounded-l-lg p-2 relative -right-24 space-y-2"
        >
          <p>{message.message_content}</p>
          <div className="font-bold flex space-x-2">
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

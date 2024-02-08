import { Message } from "../Interface/Message";

interface MessageProps {
  listMessage: Message[];
}

export const MessageComponent = ({ listMessage }: MessageProps) => {
    return (
    <div className="h-4/6 overflow-auto space-y-2 mt-2 rounded-2xl p-2">
      {listMessage.map((mess) => (
        <div key={mess.id} className="max-w-80 bg-green-200 rounded-l-lg p-2 relative -right-24 space-y-2">
          <p>{mess.message_content}</p>
          <div className="font-bold flex space-x-2">
            <p>{mess.message_date}</p>
            {/* <p className="bg-blue-950 text-white text-xs w-16 rounded-2xl p-0.5 text-center">
              Entre pro
            </p> */}
          </div>
        </div>
      ))}

      {/* <div className="max-w-80 bg-gray-300 rounded-r-lg p-2 relative space-y-2">
        <p>Bonjour, ISQGFLLJH QSDKJFGQSF QSDKHDGFSQF KSQGFKDSQHF</p>
        <div className="font-bold flex space-x-2">
          <p>09:00:00</p>
          <p className="bg-blue-950 text-white text-xs w-16 rounded-2xl p-0.5 text-center">
            Entre pro
          </p>
        </div>
      </div> */}
    </div>
  );
};

// {mess.id}

// {mess.sender_name}
// {mess.message_content}
// {mess.message_date}

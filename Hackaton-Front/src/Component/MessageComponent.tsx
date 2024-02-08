import { Message } from "../Interface/Message";

interface MessageProps {
    listMessage: Message[];
}

export const MessageComponent = ({ listMessage }: MessageProps) => {
    return (
        <div className="flex flex-col p-4 overflow-auto">
            {listMessage.map((mess) => (
                <div
                    key={mess.id}
                    className="bg-blue-100 border border-blue-300 p-3 rounded-lg shadow max-w-md mb-2"
                    style={{ alignSelf: 'flex-start' }}
                >
                    <p className="text-blue-800 text-sm">
                        {mess.sender_name}
                    </p>
                    <p className="text-gray-800">{mess.message_content}</p>
                    <p className="text-gray-500 text-xs">
                        {mess.message_date}
                    </p>
                </div>
            ))}
        </div>
    );
};

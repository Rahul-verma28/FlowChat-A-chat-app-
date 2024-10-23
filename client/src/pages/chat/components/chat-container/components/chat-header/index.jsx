import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getColor } from '@/lib/utils';
import { useAppStore } from '@/store'
import { HOST } from '@/utils/constants';
import { RiCloseFill } from 'react-icons/ri'

const ChatHeader = () => {
    const { closeChat, selectedChatType, selectedChatData } = useAppStore();

    return (
        <div className='h-[12vh] flex items-center justify-between bg-gray-900 border-b-2 border-[#2f303b] px-6 w-full'>
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-3 items-center">
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {selectedChatData.image ? (
                            <AvatarImage
                                src={`${HOST}/${selectedChatData.image}`}
                                alt="profile"
                                className="object-cover w-full h-full bg-black"
                            />
                        ) : (
                            <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(selectedChatData.color)}`}>
                                {selectedChatData.firstName
                                    ? selectedChatData.firstName.split("").shift()
                                    : selectedChatData.email.split("").shift()}
                            </div>
                        )}
                    </Avatar>
                    <div className="flex flex-col">
                        <span>
                            {selectedChatData.firstName && selectedChatData.lastName ?
                                `${selectedChatData.firstName} ${selectedChatData.lastName}` :
                                selectedChatData.email}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <button className="text-neutral-500 focus:border-none focus:outline-none hover:text-white duration-300 transition-all"
                        onClick={closeChat}>
                        <RiCloseFill className="text-3xl" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader

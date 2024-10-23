import { getColor } from '@/lib/utils';
import { useAppStore } from '@/store';
import React from 'react';
import { Avatar, AvatarImage } from './ui/avatar';
import { HOST } from '@/utils/constants';

const ContactsList = ({ contacts, isChannel }) => {
  const { setSelectedChatType, selectedChatType, setSelectedChatData, setSelectedChatMessages, selectedChatData } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact"); // Fixed here
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-5 py-2 transition-all duration-300 cursor-pointer ${selectedChatData && (selectedChatData._id === contact._id)
            ? "bg-[#8417ff] hover:bg-[#8417ff]"
            : "hover:bg-[#f1f1f111]"
            }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-4 items-center justify-start text-neutral-300">
            {!isChannel && (
              <>
                <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                  {contact.image ? (
                    <AvatarImage
                      src={`${HOST}/${contact.image}`}
                      alt="profile"
                      className="object-cover w-full h-full bg-black"
                    />
                  ) : (
                    <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>
                      {contact.firstName
                        ? contact.firstName.split("").shift()
                        : contact.email.split("").shift()}
                    </div>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <span>
                    {contact.firstName ? `${contact.firstName} ${contact.lastName}` : contact.email}
                  </span>
                  {/* <span className="text-xs">{contact.email}</span> */}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactsList;

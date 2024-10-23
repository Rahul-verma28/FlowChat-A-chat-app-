import React, { useEffect } from 'react'
import ProfileInfo from './components/profile-info';
import NewDM from './components/new-dm';
import { apiClient } from '@/lib/api-client';
import { GET_DM_CONTACTS_ROUTES } from '@/utils/constants';
import { useAppStore } from '@/store';
import ContactsList from '@/components/contactsList';

const ConatactContainer = () => {

  const {directMessagesContacts, setDirectMessagesContacts} = useAppStore();

  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
        withCredentials: true,
      });
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };
    getContacts();
  }, [directMessagesContacts]);

  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[25vw] bg-black border-r-2 border-gray-300 w-full'>
      <div className="p-3 text-2xl font-semibold">
        FlowChat
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between px-6">
          <Title text="Direct message" />
          <NewDM />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between px-6 ">
          <Title text="Channels" />
          <NewDM />
        </div>
        <div >
          <ContactsList contacts= {directMessagesContacts}/>
        </div>
      </div>
      <ProfileInfo />
    </div>
  )
}

export default ConatactContainer


const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral300 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};

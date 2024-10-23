import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EmptyChatContainer from "./components/empty-chat-container";
import Chatcontaier from "./components/chat-container";
import ConatactContainer from "./components/contact-container";
import { HOST } from "@/utils/constants";

const Chat = () => {

  const { userInfo, selectedChatType } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast.error("Please setup profile to continue.")
      navigate("/profile")
    }
  }, [userInfo, navigate]);

  return <>
    <div className="flex h-screen text-white overflow-hidden max-w-[100vw]">
      <ConatactContainer />
      {selectedChatType === undefined ?
        <EmptyChatContainer /> : <Chatcontaier />}
    </div>
  </>;
};
export default Chat;
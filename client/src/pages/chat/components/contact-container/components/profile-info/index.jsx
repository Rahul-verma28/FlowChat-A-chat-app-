import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { apiClient } from '@/lib/api-client';
import { getColor } from '@/lib/utils';
import { useAppStore } from '@/store';
import { HOST, LOGOUT_ROUTE } from '@/utils/constants'
import { FiEdit2 } from "react-icons/fi"
import { IoPowerSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProfileInfo = () => {
    const { userInfo, setUserInfo } = useAppStore();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await apiClient.post(
                LOGOUT_ROUTE,
                {},
                { withCredentials: true }
            );
            if (response.status === 200) {
                toast.success("Logged out sucessfully.");
                navigate("/auth");
                setUserInfo(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='absolute bottom-0 h-[4.5rem] flex justify-between items-center px-5 w-full bg-[#2a2b33]'>
            <div className="flex gap-3 items-center justify-center">
                {userInfo.image ? (
                    <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                        <AvatarImage
                            src={`${HOST}/${userInfo.image}`}
                            alt="profile"
                            className="object-cover w-full h-full bg-black " />
                    </Avatar>
                ) : (
                    <div className={`uppercase h-10 w-10 text-2xl border flex items-center justify-center rounded-full ${getColor(userInfo.selectedColor)}`}>
                        {userInfo.firstName
                            ? userInfo.firstName.split("").shift()
                            : userInfo.email.split("").shift()}
                    </div>
                )}
                <div >
                    {userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""}
                </div>
            </div>
            <div className="flex gap-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FiEdit2
                                className="text-purple-500 text-xl font-medium"
                                onClick={() => navigate("/profile")}
                            />
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] border-none text-white">Edit Profile
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <IoPowerSharp
                                className="text-gray-100 font-bold text-xl"
                                onClick={logout}
                            />
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] border-none text-white">Logout
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div >
    )
}

export default ProfileInfo

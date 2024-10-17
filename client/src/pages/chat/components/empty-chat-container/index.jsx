import { animationDefaultOptions } from "@/lib/utils"
import Lottie from "react-lottie"

const EmptyChatContainer = () => {
  return (
    <div className='flex-1 md:bg-black hidden md:flex flex-col items-center justify-center duration-1000 transition-all'>
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions} />
      <div className="flex flex-col text-white text-opacity-80 gap-5 items-center mt-10 lg:text-4xl transition-all duration-300 text-center">
        <h3 className=" poppins-medium">
          Hi, Welcome to <span className="text-purple-500"> ChatApp</span>
        </h3>
      </div>
    </div>
  )
}

export default EmptyChatContainer


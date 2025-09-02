import assets from '../assets/assets'
import { useSelector ,useDispatch} from 'react-redux';
import { setToggle } from '../Slice/authSlice';

const Header = () => {

  const {userData}= useSelector((state)=> state.auth)
  const dispatch =  useDispatch();

 
  
  return (
   
  <div className='h-[88vh] w-full  ' onClick={()=>dispatch(setToggle('hidden'))}>
      <div className='h-full w-[70%] sm  flex flex-col gap-2 justify-center items-center  m-auto text-center'>
        <img src={assets.header_img} alt="image" className='w-[20vh] aspect-square animate-bounce duration-1000 rounded-full'/>
        <h2 className='text-xl flex flex-inline  '>Hey {userData?.name || "Developer"}<img src={assets.hand_wave} className=' ml-1 w-6 aspect-square ' alt="" /></h2>
       <h1 className='text-4xl font-semibold bg-gradient-to-l bg-clip-text text-transparent from-pink-500 to-blue-500 via-purple-400'>Welcome to our app</h1>
       <p className='text-sm'>Let's start with a quick product tour and we will have you up and running no time!</p>
       <button className='px-8 py-2.5 text-sm border-1 rounded-full bg-gray-200 text-gray-700  hover:cursor-pointer transition-all hover:bg-gradient-to-tr  from-blue-300 to-pink-400 via-white '>Get Started</button>
    </div>
  </div>
  )
}

export default Header

import { X ,  ChevronLeft, ChevronRight} from "lucide-react"
import { useEffect, useState } from "react"

const PostModal = ({setUseModal, post}) => {
console.log(post)
const[currMedia, setCurrMedia] = useState(0)

useEffect(() => {
    // Save scroll position
    const scrollY = window.scrollY

    // Disable scroll
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = "100%"

    // Cleanup on unmount: restore scroll
    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      window.scrollTo(0, scrollY)
    }
  }, []) 

  return (
    <div className='h-[100vh] w-[100vw] bg-gray-400/70 fixed left-0 top-0 z-50 flex justify-center items-center'>
        <div className='h-[70vh] w-[70vw] opacity-100 bg-white relative '>
            <X onClick={() => {
                setUseModal(false)
            }} className="absolute right-3 top-3" />



            <div  className="h-[100%] flex">

            <div className=" h-[100%] w-[70%] relative">
                <aside className="absolute top-0 left-0 flex items-center p-3 w-full bg-gradient-to-b from-black/70 to-transparent">
                <img
                    className="h-[70px] w-[70px] rounded-full object-cover border-2 border-white"
                    src={post.author.profilePicture}
                    alt={post.author.username}
                />
                <p className="ml-3 text-white font-semibold">@{post.author.username}</p>
                </aside>

                {post.media.length > 1 && <i onClick={() => {
                    setCurrMedia(currMedia == 0 ? post.media.length - 1 : currMedia - 1)
                }}  class="top-[50%] text-3xl absolute left-0 fa-solid fa-square-caret-left text-gray-100"></i>}
                {post.media.length > 1 &&  <i onClick={() => {
                    setCurrMedia(currMedia == post.media.length - 1 ? 0 : currMedia + 1)
                }} class="top-[50%] text-3xl absolute right-0 fa-solid fa-square-caret-right text-gray-100"></i>}
               <img className="h-[100%] w-[100%]" src={post.media[currMedia]} />
            </div>
            <div className="h-[100%] w-[30%]">Comments</div>

            </div>
        </div>
    </div>
  )
}

export default PostModal
import {Head, router, usePage, Link} from '@inertiajs/react';
import React, { useState } from 'react';
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {toast, ToastContainer} from "react-toastify";
import GreenBlob1 from "@/Components/Blobs/GreenBlob1.jsx";
import GreenBlob2 from "@/Components/Blobs/GreenBlob2.jsx";
import PurpleBlob1 from "@/Components/Blobs/PurpleBlob1.jsx";
import Footer from "@/Components/Footer.jsx";



export default function SinglePost() {
    const { post } = usePage().props;
    const [comment, setComment] = useState('');


    return (


     <SiteLayout
            breadcrumbs={[
                { name: 'Home', href: '/' },
                { name: 'Kennisbank', href: route('forum') },
                { name: post.title } // current page, no href
            ]}
            >
            <Head title={post.title} />


         <div className="absolute w-[200px] h-[200px] top-[10vh] left-[10vw] md:top-[5vh] md:left-[-15vw]">
             <GreenBlob1/>
         </div>

         {/* Blob 2 */}
         <div className="absolute w-[250px] h-[250px] top-[50vh] left-[5vw] md:left-[5vw]">
             <GreenBlob2/>
         </div>

         {/* Blob 3 */}
         <div className="absolute w-[366px] h-[400px] top-[30vh] left-[65vw] md:top-[4vh] md:left-[60vw]">
             <PurpleBlob1/>
         </div>

         <div className={"relative"}>
         <div className="flex gap-6">
             <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
                 <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                 <div className="prose max-w-none">
                     {post.content}
                 </div>
             </div>

             <div className="w-64 bg-white rounded-lg shadow-sm p-6">
                 <h3>Geplaatst door:</h3>
                 {post.user && post.user.badge_icon && (
                     <img src={post.user.badge_icon} alt="Badge" style={{height: '20px'}}/>
                 )}
                 <div className="text-lg font-medium">
                     <p> naam: {post.user.name} </p></div>
                 <div className="text-gray-500 text-sm">
                     <p> geplaatst op: {new Date(post.created_at).toLocaleDateString()} </p>
                 </div>

                 <SecondaryButton onClick={() => {
                     navigator.clipboard.writeText(route('posts.show', post.id));
                     toast.success('Link gekopieerd!', {
                         position: "top-right",
                         autoClose: 3000,
                         hideProgressBar: true,
                         closeOnClick: true,
                         pauseOnHover: true,
                         draggable: true,

                     });
                 }}>
                     Deel Activiteit
                 </SecondaryButton>
             </div>
         </div>
             <Footer></Footer>
         </div>
         <ToastContainer></ToastContainer>

     </SiteLayout>
    );
}

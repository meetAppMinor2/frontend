// import React, { useContext, useEffect, useRef, useState } from "react";
// import { useNavigate } from 'react-router-dom';

// import userContext from '../context/user/userContext';
// import Navbar from "../components/navbar";

// function Profile() {
//   const { id, updateAvatar, checkRefreshToken, userDetail } = useContext(userContext);


//   let navigate = useNavigate();
//   const checkAndRefreshToken = async () => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken && accessToken !== undefined) {
//       userDetail();
//       return;
//     }
//     checkRefreshToken();
//   };


//   const hasRun = useRef(false);
//   // work like documentdidmount
//   useEffect(() => {
//     if (!hasRun.current) {
//       hasRun.current = true;
//       checkAndRefreshToken();
//     }
//     // eslint-disable-next-line
//   }, []);



//   const [profileImage, setProfileImage] = useState(id?.avatar);
//   useEffect(() => {
//     console.log("Updating profileImage:", id.avatar);
//     setProfileImage(id.avatar);
//   }, [id.avatar]);


//   // not working fine need to work on it
//   // const handleImageUpload = async (event) => {
//   //   console.log(event.target.files)
//   //   const file = event.target.files[0];
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onload = (e) => setProfileImage(e.target.result);
//   //     reader.readAsDataURL(file);
//   //     console.log(file)
//   //     const json = await updateAvatar(file);
//   //     // console.log("res")
//   //     // console.log(response)
//   //     // console.log(response.data);
//   //     if (response.data.avatar) {
//   //     //   console.log("response data")
//   //     //   console.log(response.data);
//   //       setProfileImage(response.data.avatar);
//   //     }
//   //     // setProfileImage(id.avatar)
//   //   }
//   // };
//   const handleImageUpload = async (event) => {
//     console.log(event.target.files);
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => setProfileImage(e.target.result);
//       reader.readAsDataURL(file);
//       console.log(file);

//       const response = await updateAvatar(file);
//       console.log("Response:", response);

//       if (response?.data?.avatar) {
//         console.log("Updated Avatar URL:", response.data.avatar);
//         setProfileImage(response.data.avatar);
//       }
//     }
//   };


//   return (
//     <>
//       {/* <Navbar />
//       <div className="dis">
//         <div className="profile-container">
//           <h1 className="profile-title">Profile</h1>
//           <div className="profile-card">
//             <div className="profile-image-container">
//               {profileImage ? (
//                 <img src={profileImage} alt="Profile" className="profile-image" />
//                 // <img src={profileImage? profileImage:""} alt="Profile" className="profile-image" />
//               ) : (
//                 <div className="placeholder-image">No Image</div>
//               )}
//             </div>
//             <label htmlFor="file-upload" className="file-upload-label">
//               Upload Profile Picture
//             </label>
//             <input
//               type="file"
//               id="file-upload"
//               className="file-upload"
//               accept="image/*"
//               onChange={handleImageUpload} />
//           </div>
//           <div className="profile-info">
//             <p>Full Name: <span>{id?.fullname}</span></p>
//             <p>Username: <span>{id?.username}</span></p>
//             <p>Email: <span>{id?.email}</span></p>
//           </div>
//         </div>
//       </div> */}
//     </>
//   );
// }

// export default Profile;



import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../context/user/userContext";
import { Camera, User, Mail } from "lucide-react"; // Assuming you are using react-icons

function Profile() {
  const { id, updateAvatar, checkRefreshToken, userDetail } = useContext(userContext);

  let navigate = useNavigate();
  const checkAndRefreshToken = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== undefined) {
      userDetail();
      return;
    }
    checkRefreshToken();
  };

  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      checkAndRefreshToken();
    }
    // eslint-disable-next-line
  }, []);

  const [profileImage, setProfileImage] = useState(id?.avatar);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  useEffect(() => {
    setProfileImage(id.avatar);
  }, [id.avatar]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);

      setIsUpdatingProfile(true);
      const response = await updateAvatar(file);
      setIsUpdatingProfile(false);

      if (response?.data?.avatar) {
        setProfileImage(response.data.avatar);
      }
    }
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={profileImage || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile information */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{id?.fullname || "N/A"}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{id?.email || "N/A"}</p>
            </div>
          </div>

          {/* Account information */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{id?.createdAt?.split("T")[0] || "N/A"}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
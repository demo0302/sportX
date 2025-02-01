import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import '../App.css';
import '../index.css';
function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="profile-container" >
      {userDetails ? (
        <div className="profile-card">
          <h2 className="profile-title">Welcome, {userDetails.name}</h2>
          <div className="profile-details">
            <p>Email: {userDetails.email}</p>
            <p>Age: {userDetails.age}</p>
            <p>Location: {userDetails.location}</p>
          </div>
          <div className="profile-actions">
            <button>Edit Profile</button>
            <button>Logout</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;

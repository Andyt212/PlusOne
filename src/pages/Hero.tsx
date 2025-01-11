import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [storedUser1, setStoredUser1] = useState({
    username: "",
    password: "",
  });
  const [storedUser2, setStoredUser2] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const getUserLogin = async () => {
    // Fetch data for user1
    const user1Ref = doc(db, "counters", "user1");
    const user1Snap = await getDoc(user1Ref);
    if (user1Snap.exists()) {
      const user1Data = user1Snap.data();
      setStoredUser1({
        username: user1Data.username,
        password: user1Data.password,
      });
    } else {
      console.log("No data found for user1");
    }

    // Fetch data for user2
    const user2Ref = doc(db, "counters", "user2");
    const user2Snap = await getDoc(user2Ref);
    if (user2Snap.exists()) {
      const user2Data = user2Snap.data();
      setStoredUser2({
        username: user2Data.username,
        password: user2Data.password,
      });
    } else {
      console.log("No data found for user2");
    }
  };

  useEffect(() => {
    getUserLogin();
  }, []);

  const handleSubmitClick = () => {
    if (
      (username === storedUser1.username && password === storedUser1.password) ||
      (username === storedUser2.username && password === storedUser2.password)
    ) {
      navigate("/user");
    }
  };

  return (
    <body className="bg-[#525252]">
      <div className="flex items-center justify-center min-h-screen">
        <div className="card bg-gradient-to-b from-[#FF6422] to-[#99147C] w-96 shadow-xl border-4 border-whi">
          <div className="card-body">
            <h1 className="font-neue font-bold text-4xl text-white">PlusOne</h1>
            <h3 className="font-neue font-light text-sm text-white">
              Username
            </h3>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <h3 className="font-neue font-light text-sm text-white">
              Password
            </h3>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="card-actions justify-end">
              <button
                className="btn btn-sm btn-primary"
                onClick={handleSubmitClick}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Hero;

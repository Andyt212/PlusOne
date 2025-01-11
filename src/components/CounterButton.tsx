import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useUser } from "../contexts/UserContext"; // Import the context

const CounterButton: React.FC = () => {
  const { username } = useUser(); // Access username from context
  const [counter, setCounter] = useState(0);

  // Fetch counter value from Firestore for the specific user
  useEffect(() => {
    if (username) {
      getUserCounter();
    }
  }, [username]);

  const getUserCounter = async () => {
    if (username) {
      const counterRef = doc(db, "counters", username); // Use the username as the document ID
      const docSnap = await getDoc(counterRef);

      if (docSnap.exists()) {
        setCounter(docSnap.data().counter); // Set the counter state with the value from Firestore
      }
    }
  };

  // Increment the counter for the specific user
  const handleIncrementCounter = async () => {
    if (username) {
      const counterRef = doc(db, "counters", username); // Use the username as the document ID
      const docSnap = await getDoc(counterRef); // Check if the document exists

      if (docSnap.exists()) {
        // If the document exists, update the counter
        await updateDoc(counterRef, { counter: counter + 1 });
      } 
      setCounter(counter + 1); // Update local state to reflect new counter
    } 
  };

  return (
    <>
      <button className="btn btn-wide" onClick={handleIncrementCounter}>
        Hello
      </button>
      <p>Current counter: {counter}</p>
    </>
  );
};

export default CounterButton;

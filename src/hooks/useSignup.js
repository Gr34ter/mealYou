import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { setDoc, doc } from "firebase/firestore";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName: displayName,
      });

      // adding document to the collection
      await setDoc(doc(db, "users", res.user.uid), {
        email,
        online: true,
        displayName,
        meals: [],
      });

      // dispatch logging action
      await dispatch({ type: "LOGIN", payload: res.user });

      setError(null);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};

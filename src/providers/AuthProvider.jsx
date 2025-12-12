import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import { app } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("member"); // default role
  const [loading, setLoading] = useState(true);

  // CREATE ACCOUNT
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // LOGIN
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // GOOGLE LOGIN
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // LOGOUT
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // UPDATE PROFILE
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL,
    });
  };

  const fetchUser = async (email) => {
    setLoading(true);
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/users/${email}`
      );
      setUser(res.data);
      setRole(res.data.role);
    } catch (err) {
      if (err.response?.status === 404) {
        // User not found, create it
        const token = await auth.currentUser.getIdToken(true);
        const saveUser = {
          name: auth.currentUser.displayName || "",
          email: auth.currentUser.email,
          uid: auth.currentUser.uid,
          photoURL: auth.currentUser.photoURL || "",
          role: auth.currentUser.role,
          createdAt: new Date(),
        };
        // console.log(role);
        const res = await axios.post(
          `${import.meta.env.VITE_LOCALHOST}/users`,
          saveUser,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(res.data.user);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false); // spinner always turns off
    }
  };

  // AUTH STATE CHANGE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        await fetchUser(currentUser?.email);
      } else {
        setRole("member");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    setUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

// authSlice with firebase auth and firestore integration and login and logout functionality and user state management and user data management code:
import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    loading: false,
    };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        },
    });

export const { setUser, setLoading } = authSlice.actions;

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const userCredential = await auth.signInWithEmailAndPassword(
            email,
            password
        );
        dispatch(setUser(userCredential.user));
        dispatch(setLoading(false));
        toast.success("Logged in successfully");
    } catch (error) {
        dispatch(setLoading(false));
        toast.error(error.message);
    }
};

// Logout
export const logout = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await auth.signOut();
        dispatch(setUser(null));
        dispatch(setLoading(false));
        toast.success("Logged out successfully");
    } catch (error) {
        dispatch(setLoading(false));
        toast.error(error.message);
    }
};

// Register
export const register = (email, password, fullName) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const userCredential = await auth.createUserWithEmailAndPassword(
            email,
            password
        );
        await setDoc(doc(db, "users", userCredential.user.uid), {
            fullName,
            email,
        });
        dispatch(setUser(userCredential.user));
        dispatch(setLoading(false));
        toast.success("Registered successfully");
    } catch (error) {
        dispatch(setLoading(false));
        toast.error(error.message);
    }
};

// Get User By Id
export const getUserById = (uid) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            dispatch(setUser(docSnap.data()));
        } else {
            dispatch(setUser(null));
        }
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false));
        toast.error(error.message);
    }
};

export default authSlice.reducer;
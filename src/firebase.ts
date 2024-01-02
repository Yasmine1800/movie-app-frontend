import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
    signInAnonymously,
    User
} from "firebase/auth";

const firebaseConfig =  {

    apiKey: "AIzaSyBfKDva7U6k1SojnNqqtQKIrMh0gu_PCuA",
    authDomain: "movie-app-auth-bc5b4.firebaseapp.com",
    projectId: "movie-app-auth-bc5b4",
    storageBucket: "movie-app-auth-bc5b4.appspot.com",
    messagingSenderId: "911274210165",
    appId: "1:911274210165:web:966063e4f32b23303e593c"

}

initializeApp(firebaseConfig);

export const auth = getAuth();

export const registerUser = async (email : string, password : string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email : string, password : string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const getCurrentUser = async () => {
    return new Promise<User | null>((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};

export const signInAnonymouslyUser = async () => {
    return await signInAnonymously(auth);
}

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
}

export const logoutUser = () => {
    return auth.signOut();
}
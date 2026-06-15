// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc, 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrTaYLYWw9H31_06fWL_36BKB40im0ksM",
    authDomain: "techcare-8oc7b.firebaseapp.com",
    projectId: "techcare-8oc7b",
    storageBucket: "techcare-8oc7b.firebasestorage.app",
    messagingSenderId: "94772613240",
    appId: "1:94772613240:web:3d0ae9c03561e7c6bb1d8d",
    measurementId: "G-59VFXVH57V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Auth functions
export async function signUpWithEmail(email, password) {
    return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithEmail(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
    return await signInWithPopup(auth, googleProvider);
}

export async function resetPassword(email) {
    return await sendPasswordResetEmail(auth, email);
}

export async function logoutUser() {
    return await signOut(auth);
}

// Firestore functions
export async function saveUserToFirestore(collectionName, userId, userData) {
    return await setDoc(doc(db, collectionName, userId), userData);
}

export async function getUserFromFirestore(collectionName, userId) {
    const docRef = doc(db, collectionName, userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
}

export async function addDocument(collectionName, data) {
    return await addDoc(collection(db, collectionName), data);
}

export async function getDocuments(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getDocumentsWhere(collectionName, field, value) {
    const q = query(collection(db, collectionName), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateDocument(collectionName, docId, data) {
    return await updateDoc(doc(db, collectionName, docId), data);
}

export async function deleteDocument(collectionName, docId) {
    return await deleteDoc(doc(db, collectionName, docId));
}

console.log("Firebase config loaded successfully");
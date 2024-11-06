// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC_xqSw9uiGDb6usPZNvHBAUga-_DPqeBQ',
  authDomain: 'project-pal-acb37.firebaseapp.com',
  projectId: 'project-pal-acb37',
  storageBucket: 'project-pal-acb37.firebasestorage.app',
  messagingSenderId: '501172424631',
  appId: '1:501172424631:web:46e69115616add29ec2232',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

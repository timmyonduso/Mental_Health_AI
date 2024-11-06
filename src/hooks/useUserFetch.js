import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../config/firebaseConfig'; // Adjust the import according to your file structure

const useUserFetch = (uid) => {
  const [fetchedUser, setFetchedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   console.log('this is uid ',uid)
  useEffect(() => {
    const fetchUser = async () => {
      if (!uid) {
        setLoading(false);
        return;
      }

      try {
        // Query users based on uid
        const usersRef = collection(db, 'Users');
        const q = query(usersRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();

          // Set user data in AsyncStorage
          await AsyncStorage.setItem('userToken', uid);
          const userPayload = {
            id: uid,
            firstName: userData.firstName || 'John', // Default name if not found
            lastName: userData.lastName || 'Doe', // Default name if not found
            name: userData.displayName || null, // Modify as needed
            email: userData.email,
            profilePicture: userData.profilePicture || null,
          };
          await AsyncStorage.setItem('userData', JSON.stringify(userPayload));

          setFetchedUser(userPayload); // Set the fetched user
        } else {
          setError('User not found'); // Handle case where user does not exist
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [uid]);

  return { fetchedUser, loading, error };
};

export default useUserFetch;

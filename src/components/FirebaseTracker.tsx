"use client";

import { useEffect } from "react";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function FirebaseTracker() {
  useEffect(() => {
    // If Firebase auth or db is not initialized (e.g., config environment variables are missing),
    // warn in console and exit gracefully without breaking the app.
    if (!auth || !db) {
      console.warn(
        "Firebase Tracker: Auth or Firestore is not initialized. " +
        "Make sure to set the Firebase configuration environment variables in your .env.local file."
      );
      return;
    }

    const activeAuth = auth;
    const activeDb = db;

    const unsubscribe = onAuthStateChanged(activeAuth, async (user) => {
      if (!user) {
        // Sign in anonymously if no user is authenticated
        try {
          await signInAnonymously(activeAuth);
        } catch (error) {
          console.error("Firebase Tracker: Anonymous authentication failed:", error);
        }
      } else {
        // User is signed in. Track the session.
        const sessionTrackedKey = `tracked_session_${user.uid}`;
        
        // Use sessionStorage to ensure we only log the visit once per session/tab load,
        // avoiding unnecessary Firestore writes and reads on page navigation.
        if (!sessionStorage.getItem(sessionTrackedKey)) {
          try {
            const userDocRef = doc(activeDb, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            const dataToSave: Record<string, unknown> = {
              lastSeen: serverTimestamp(),
              userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
            };

            // Set createdAt only on the first visit
            if (!userDoc.exists()) {
              dataToSave.createdAt = serverTimestamp();
            }

            await setDoc(userDocRef, dataToSave, { merge: true });
            sessionStorage.setItem(sessionTrackedKey, "true");
            console.log("Firebase Tracker: Visitor entry logged successfully.", { uid: user.uid });
          } catch (error) {
            console.error("Firebase Tracker: Failed to log visitor entry to Firestore:", error);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // This component doesn't render any UI
  return null;
}

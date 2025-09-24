'use client';

import React, { useEffect, useMemo, type ReactNode } from 'react';
import { FirebaseProvider, useAuth } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import { initiateAnonymousSignIn } from './non-blocking-login';

function AuthWrapper({ children }: { children: ReactNode }) {
  const auth = useAuth();

  useEffect(() => {
    // Initiate anonymous sign-in when the auth service is available.
    initiateAnonymousSignIn(auth);
  }, [auth]); // Dependency on auth ensures this runs once auth is ready.

  return <>{children}</>;
}


interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side, once per component mount.
    return initializeFirebase();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      <AuthWrapper>
        {children}
      </AuthWrapper>
    </FirebaseProvider>
  );
}

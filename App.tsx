import { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "@routers/Router";
import ErrorModal, { ErrorModalRef } from "@components/errorModal/ErrorModal";
import { initializeErrorModal } from "@services/ErrorModalService";
import { AuthProvider } from "@context/AuthContext";

export default function App() {
  const errorModalRef = useRef<ErrorModalRef>(null);

  useEffect(() => {
    initializeErrorModal(errorModalRef);
  }, []);
  return (
    <>
      <AuthProvider>
        <ErrorModal ref={errorModalRef} />
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
}

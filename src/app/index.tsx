import GlobalStyle from "../shared/globalStyles";
import { withProviders } from "./providers";
import Routing from "../pages";
import Header from "../widgets/header";
import { useGetUserMutation } from "../features/auth/authService";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { setUser } from "../features/auth/authSlice";
import LoaderElement from "../shared/ui/loaderElement";

function App() {
  const dispatch = useAppDispatch();
  const [
    getUser,
    {
      data: getUserData,
      isSuccess: isGetUserSuccess,
      isLoading: isGetUserLoading,
    },
  ] = useGetUserMutation();

  useEffect(() => {
    try {
      (async () => {
        await getUser();
      })();
    } catch (e) {
      console.log(`auth > getUserError: ${e}`);
    }
  }, []);

  useEffect(() => {
    if (isGetUserSuccess) {
      try {
        dispatch(setUser(getUserData!));
      } catch (e) {
        console.log(`auth > setUserError: ${e}`);
      }
    }
  }, [isGetUserSuccess]);

  return (
    <>
      <GlobalStyle />
      {isGetUserLoading ? (
        <LoaderElement />
      ) : (
        <>
          <Header />
          <Routing />
        </>
      )}
    </>
  );
}

export default withProviders(App);

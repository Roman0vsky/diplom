import GlobalStyle from "../shared/globalStyles";
import { withProviders } from "./providers";
import Routing from "../pages";
import Header from "../widgets/header";
import { Provider } from "react-redux";
import store from "./store/appStore";

function App() {
  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <Header />
        <Routing />
      </Provider>
    </>
  );
}

export default withProviders(App);

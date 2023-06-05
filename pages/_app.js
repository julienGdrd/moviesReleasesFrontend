import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import likedMovies from "../reducer/likedMovies";
import wishList from "../reducer/wishList";
const store = configureStore({
  reducer: { likedMovies, wishList },
});
function App({ Component, pageProps }) {
  return (
    <>
    <Provider  store={store}>
      <Head>
        <title>CinemaFlow</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </Provider>
    </>
  );
}

export default App;

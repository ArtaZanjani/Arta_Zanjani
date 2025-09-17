import Header from "./components/layout/Header";
import { ThemeProvider } from "./context/ThemeProvider";
import MainInfo from "./components/MainInfo";
import MoreInfo from "./components/MoreInfo";
import { Flip, ToastContainer } from "react-toastify";
import ScrollBase from "./base/ScrollBase";

const App = () => {
  return (
    <ThemeProvider>
      <ScrollBase />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" transition={Flip} />
      <div className="fixed pointer-events-none inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_2px,transparent_2px),linear-gradient(to_bottom,#80808012_2px,transparent_2px)] bg-[size:52px_52px]" />
      <Header />

      <main className="flex items-start w-full gap-10 mt-40 max-xl:flex-col padding_body">
        <MainInfo />
        <MoreInfo />
      </main>
    </ThemeProvider>
  );
};

export default App;

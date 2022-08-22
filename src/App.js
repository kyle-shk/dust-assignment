import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Bottom from "./components/Bottom";
import Initial from "./pages/Initial";
import store from "./store/store";
// page
import All from "./pages/All";
import Like from "./pages/Like";
function App() {
  return (
    <div className="App">
      {/* <InitialHeader /> */}
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route></Route>
            <Route path="/Initial" element={<Initial />}></Route>
            <Route path="/" element={<All />}></Route>
            <Route path="Like" element={<Like />}></Route>
            <Route path="*" element={<p>Not Found</p>}></Route>
          </Routes>
          <Bottom />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

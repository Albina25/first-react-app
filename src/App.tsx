import './App.css'
import MyTable from "./components/MyTable.tsx";
import store from "./store/store.ts";
import {Provider} from "react-redux";

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <MyTable />
          </div>
      </Provider>
  )
}

export default App

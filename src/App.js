import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./pages/Tasks";
import './styles/style.scss'
import Task from "./pages/Task";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' exact element={<Tasks />} />
        <Route path='/task/:id' exact element={<Task />} />
      </Routes>
      {/* <Tasks /> */}
    </div>
  );
}

export default App;

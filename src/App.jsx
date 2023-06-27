import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar";
import Board from "./components/Board/Board";

function App() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Navbar />
      <Sidebar />
      <Board />
    </div>
  );
}

export default App;

import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Navbar />
      <Sidebar />
      <div>
        <main></main>
      </div>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router";
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/transactions" element={<Transactions/>} />
      <Route path="/analytics" element={<Analytics/>} />
      <Route path="/chat" element={<Chat/>} />
    </Routes>
  );
}

export default App

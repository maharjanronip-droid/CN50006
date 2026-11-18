import { useState } from "react";
import "./App.css";
function ClickCounter() {
 const [count, setCount] = useState(0);
 const ClickHandle = () => {
 setCount((prevCount) => prevCount + 1);
 };
 return (
 <div className="App-header">
 <h1>Click Count: {count}</h1>
 <button
 type="button"
 onClick={ClickHandle}
 >
 Click Me ({count})
 </button>
 </div>
 );
}
export default ClickCounter
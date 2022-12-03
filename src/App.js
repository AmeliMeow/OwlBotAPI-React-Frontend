// import Owlbot from "owlbot-js";
import axios from "axios";
import { useState } from "react";

// Read token from .env
const TOKEN = process.env.REACT_APP_TOKEN

function App() {
  const owlbot = axios.create({
    // CORS workaround
    baseURL: "https://cors-anywhere.herokuapp.com/https://owlbot.info/api/v4/dictionary/",
    headers: {
      "Authorization": `Token ${TOKEN}` 
    }
  })

  const [defs, setDefs] = useState([]);
  const [msg, setMsg] = useState("")

  const onKeyEnter = (event) => {
    if (event.key === "Enter"){
      const word = event.target.value
      if (word !== ""){
        owlbot.get(word).then((response) => {
          console.log(response);
          setMsg("")
          setDefs(response.data.definitions)
        }).catch((reason) =>{
          console.log(reason)
          if (reason.response.status === 404){
            setMsg("Word was not found!");
          }
          else {
            setMsg("Something went wrong!")
          }
        });
      }
    }
  }

  const Result = (props) => (
    <div className="flex flex-col md:flex-row gap-4 rounded-lg bg-darker-800">
      {props.image_url != null && <img className="lg:w-52 rounded-lg" src={props.image_url}></img>}
      <div className="text-left px-2 pt-1">
        <h2 className="italic font-bold text-xl">{props.type}</h2>
        <p>{props.def}</p>
        {props.eg != null && <p>e.g.: <span className="italic">"{props.eg}"</span></p>}
      </div>
    </div>
  )

  return (
    <div className="container">
      <h1 className="text-4xl font-bold text-dark-300">
        OwlBot React Frontend
      </h1>
      <input onKeyDown={onKeyEnter} type={'text'} className="mx-2" placeholder="Type a word..."></input>
      { defs.map((def, i) => <Result key={i} image_url={def.image_url} type={def.type} def={def.definition} eg={def.example}></Result>) }
      { msg !== "" && <p className="text-red">{msg}</p> }
    </div>
  );
}

export default App;

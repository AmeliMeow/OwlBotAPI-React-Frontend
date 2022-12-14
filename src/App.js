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
        setDefs([]);
        owlbot.get(word).then((response) => {
          console.log(response);
          setMsg("")
          setDefs(response.data.definitions)
        }).catch((reason) =>{
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

  const Definition = (props) => (
    <div className="overflow-clip flex flex-col md:flex-row gap-4 rounded-lg bg-darker-800">
      {props.image_url != null && <img className="bg-dark lg:w-52 lg:h-52 rounded-lg" alt={props.alt} src={props.image_url}></img>}
      <div className="text-left px-2 pt-1">
        <h2 className="italic font-bold text-xl">{props.type == null ? "Other" : props.type}</h2>
        <p>{props.def}</p>
        {props.eg != null && <p>e.g.: <span className="italic">"{props.eg}"</span></p>}
      </div>
    </div>
  )

  return (
    <div className="px-2 lg:w-3/4 justify-center h-screen mx-auto text-center flex flex-col gap-5">
      <h1 className="text-4xl my-2 font-bold text-dark-300 ">
        OwlBot React Frontend
      </h1>
      <input 
        onKeyDown={onKeyEnter} 
        type={'text'} 
        className="mx-2 bg-dark rounded-full px-4 py-2 text-2xl ring-2 ring-blue outline-2 outline-purple focus:outline" 
        placeholder="Type a word and press Enter..."
        autoFocus={true}/>
      { msg !== "" && <p className="text-red">{msg}</p> }
      { defs.length > 0 &&
        <div className="flex overflow-y-auto h-4/5 flex-col gap-5 animate-expand">
          { defs.map((def, i) => <Definition key={i} alt="Supplementary image" image_url={def.image_url} type={def.type} def={def.definition} eg={def.example}></Definition>) }
        </div>}
    </div>
  );
}

export default App;

import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Admin(){

  const [text,setText] = useState("")

  async function add(){
    await supabase.from("questions").insert({
      text:text
    })
  }

  return (
    <div>
      <h1>Admin</h1>

      <input onChange={e=>setText(e.target.value)} />

      <button onClick={add}>➕ Hozzáadás</button>
    </div>
  )
}

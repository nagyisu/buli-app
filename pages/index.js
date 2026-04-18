import { useRouter } from "next/router"
import { useState } from "react"

export default function Home(){
  const router = useRouter()
  const [name,setName] = useState("")
  const [table,setTable] = useState(1)

  function join(){
    router.push(`/game?name=${name}&table=${table}`)
  }

  return (
    <div className="center">
      <h1>🍻 BULI APP</h1>

      <input placeholder="Név" onChange={e=>setName(e.target.value)} />

      <select onChange={e=>setTable(e.target.value)}>
        {[1,2,3,4,5,6].map(t=>
          <option key={t} value={t}>Asztal {t}</option>
        )}
      </select>

      <button onClick={join}>BELÉPÉS</button>
    </div>
  )
}

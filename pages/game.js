import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Game({query}){

  const name = query.name
  const table = query.table

  const [q,setQ] = useState("")
  const [board,setBoard] = useState([])

  const questions = [
    "Mi volt a legcikibb pillanatod?",
    "Kibe voltál titokban szerelmes?",
    "Mi a legnagyobb hazugságod?",
    "Kit hívnál fel részegen?"
  ]

  const boss = [
    "Mindenki iszik 1-et",
    "Válassz valakit → 3 korty",
    "Bal oldalad iszik",
    "Jobb oldalad iszik"
  ]

  async function drink(){
    await supabase.from("actions").insert({
      player:name,
      type:"drink",
      table_id:table
    })
    load()
  }

  function getQuestion(){
    setQ(questions[Math.floor(Math.random()*questions.length)])
  }

  function bossRound(){
    setQ(boss[Math.floor(Math.random()*boss.length)])
  }

  async function load(){
    let { data } = await supabase
      .from("actions")
      .select("*")
      .eq("table_id",table)

    let stats = {}
    data.forEach(a=>{
      stats[a.player] = (stats[a.player]||0)+1
    })

    setBoard(Object.entries(stats))
  }

  useEffect(()=>{
    load()
    setInterval(load,3000)
  },[])

  function crown(){
    let king = board.sort((a,b)=>b[1]-a[1])[0][0]
    alert("👑 Buli király: " + king)
  }

  return (
    <div className="game">

      <h2>{name} | Asztal {table}</h2>

      <button onClick={getQuestion}>🎲 Kérdés</button>
      <button onClick={drink}>🍺 Iszom</button>
      <button onClick={bossRound}>🔥 Boss</button>

      <h1>{q}</h1>

      <h3>🏆 Leaderboard</h3>
      {board.map(b=>
        <div key={b[0]}>{b[0]} 🍺 {b[1]}</div>
      )}

      {board.length>0 &&
        <button onClick={crown}>👑 Koronázás</button>
      }

    </div>
  )
}

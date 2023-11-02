import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true)
  const [ pokemonDate, setPokemonDate ] = useState([])
  const [ nextURL, setNextURL ] = useState("")
  const [ prevURL, setprevURL ] = useState("")
    
  useEffect( () =>{
    const fetchPokemonDate = async () => {
      // すべてのポケモンデータを取得
      let res = await getAllPokemon(initialURL)
      // 各ポケモンの詳細なデータを取得     
      loadPokemon(res.results)
      setNextURL(res.next)
      setprevURL(res.previous)
      setLoading(false)
    
    }
    fetchPokemonDate()
  }, [])

  const loadPokemon = async (data) => {
    let _pokemonDate = await Promise.all
      (data.map((pokemon)=>{
      // console.log(pokemon)
         let pokemonRecord = getPokemon(pokemon.url)
        //  console.log(pokemonRecord)
         return pokemonRecord

    }))
    setPokemonDate(_pokemonDate)
    
    
  }


  const handlePrevpage = async()=>{
    if (!prevURL) return
    let data = await getAllPokemon(prevURL)
    await loadPokemon(data.results)
    setNextURL(data.next)
    setprevURL(data.previous)
  }
  const handleNextpage = async()=>{
    let data = await getAllPokemon(nextURL)
    await loadPokemon(data.results)
    setNextURL(data.next)
    setprevURL(data.previous)
  }

  return (
  <>
    <Navbar />
    <div className="App">
        {loading ? <h1>ロード中</h1> : 
      <div className="pokemonCardContainer">
     {pokemonDate.map((pokemon, i)=>{
       return <Card key ={i} pokemon = {pokemon}/>
     })}
      </div>
  }
    <div className="btn">
      <button onClick={handlePrevpage}>前へ</button>
      <button onClick={handleNextpage}>次へ</button>
      
    </div>
    </div>
  </>
  )


  }
  
export default App;

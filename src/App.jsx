import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/card/Card';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true)
  const [ pokemonDate, setPokemonDate ] = useState([])
    
  useEffect( () =>{
    const fetchPokemonDate = async () => {
      // すべてのポケモンデータを取得
      let res = await getAllPokemon(initialURL)
      // 各ポケモンの詳細なデータを取得     
      loadPokemon(res.results)
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

  console.log(pokemonDate)

  return <div className="App">
    {loading ? <h1>ロード中</h1> : 
    <div className="pokemonCardContainer">
       {pokemonDate.map((pokemon, i)=>{
         return <Card key ={i} pokemon = {pokemon}/>
       })}
    </div>
    }
  </div>

  }
  
export default App;

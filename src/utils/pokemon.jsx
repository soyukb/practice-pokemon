export const getAllPokemon = (url) => {
    return fetch(url)
          .then((res) => res.json())          
};

export const getPokemon = (url) => {
    return fetch(url)
            .then((res)=> res.json())
}
    

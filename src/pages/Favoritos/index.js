// UseEffect - quando eu entrar no componente 'favoritos' já obtenha a lista.
// UseState - para manipular os objetos dentro de um estado.
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './favoritos.css'

function Favoritos(){

    const [films, setFilms] = useState([])

    useEffect(()=>{
        const myList = localStorage.getItem("@primeflix");
        setFilms(JSON.parse(myList)|| [])
    },[])

    return(
        <div className='my-films'>
            <h1>Minha Lista de Filmes:</h1>
            <ul>
                {films.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes do filme.</Link>
                                <button>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Favoritos
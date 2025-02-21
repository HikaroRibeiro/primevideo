// UseEffect - quando eu entrar no componente 'favoritos' já obtenha a lista.
// UseState - para manipular os objetos dentro de um estado.
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './favoritos.css'
import { toast } from 'react-toastify'

function Favoritos(){

    const [films, setFilms] = useState([])

    useEffect(()=>{
        const myList = localStorage.getItem("@primeflix");
        setFilms(JSON.parse(myList)|| [])
    },[])

    function excluirFilme(id){
        let filtroFilme = films.filter((item)=>{
            return (item.id !== id)
        })
        setFilms(filtroFilme)
        localStorage.setItem('@primeflix',JSON.stringify(filtroFilme))
        toast.success('Filme excluido com sucesso da sua lista de favoritos.')
    }

    return(
        <div className='my-films'>
            <h1>Minha Lista de Filmes:</h1>
            {films.length === 0 && <span>Você não possui nenhum filme salvo.</span>}
            <ul>
                {films.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes do filme.</Link>
                                <button onClick={()=>excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Favoritos
/* eslint-disable no-unused-vars */

import { useEffect,useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

/*
useEffect - toda vez que abrir a minha aplicação
vai na api e busca os dados atualizados.

useState - depois que ele buscar armazenar em 
algum lugar na minha aplicação.

*/

function Home() {
    
    const[filmes,setFilmes] = useState([]);
    const[loading,setLoading] = useState(true);
    
    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get("movie/now_playing",{
                params:{
                    api_key: '1e77155b7a3cb9e16993046790d540c0',
                    language: 'pt-BR',
                    page: 1,
                }
            })
            //console.log(response.data.results.slice(0,10))
            setFilmes(response.data.results.slice(0,10))
            setLoading(false)
        }

        loadFilmes();
    },[]);

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando listagem de filmes...</h2>
            </div>
        )
    }

    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt='{filme.original_title}' />
                            <Link to={`/filme/${filme.id}`} >Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;
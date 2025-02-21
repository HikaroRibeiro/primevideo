import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';

import { toast } from 'react-toastify'

function Filme() {
    
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme() {
            await api.get(`/movie/${id}`,{
                params: {
                    api_key: '1e77155b7a3cb9e16993046790d540c0',
                    language: 'pt-BR', 
                }
            }).then((response)=>{
                setFilme(response.data);
                setLoading(false);
            }).catch(()=>{
                console.log("Filme não existe.")
                navigate("/",{ replace: true })
            })
        }
        loadFilme();

        return ()=>{
            console.log("Componente desmontado")
        }

    },[navigate,id])


    function salvarFilme(){
        const myList = localStorage.getItem("@primeflix")

        let savedFilms = JSON.parse(myList) || [];

        const hasFilm = savedFilms.some((savedFilms)=> savedFilms.id === filme.id)

        if(hasFilm){
            toast.warn('Esse filme já está na sua lista de filmes.')
            return
        }
        savedFilms.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(savedFilms))
        toast.success("Filme salvo com sucesso")
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes....</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>
                {filme.overview}
            </span>
            <strong>
                Avaliação: {filme.vote_average} / 10
            </strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MoviesContent from '../components/MoviesContent';
import IMovie from '../interfaces/IMovie';

const Home = () => {

    const [movies, setMovies] = useState<IMovie[]>();

    // APPEL API AXIOS
    const getContent = async () => {
        //APPEL PROMESSE DE NEWSPAGE AXIOS.GET DE L'INTERFACE DE L'URL
        const movies = await axios.get<IMovie[]>(
            `http://localhost:3000/api/movies`,
        );

        setMovies(movies.data);
    };

    // AU CHARGEMENT DU COMPOSANT, J'EXÉCUTE LA FONCTION GETCONTENT
    useEffect(() => {
        getContent();
    }, []);

    return (
        <div className="home">
            <h1>GRATFLIX</h1>
            <div className="home__list" >
                {movies && movies.map((item) => <MoviesContent id={item.id} key={item.id} />)}
            </div>
        </div>
    );
};

export default Home;

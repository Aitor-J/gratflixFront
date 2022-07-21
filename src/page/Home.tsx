import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MoviesContent from '../components/MoviesContent';
import IMovie from '../interfaces/IMovie';
import IType from '../interfaces/IType';

const Home = () => {

    const [movies, setMovies] = useState<IMovie[]>();
    const [types, setType] = useState<IType[]>();


    // APPEL API AXIOS
    const getContent = async () => {
        //APPEL PROMESSE DE NEWSPAGE AXIOS.GET DE L'INTERFACE DE L'URL

        const movies = await axios.get<IMovie[]>(
            `${import.meta.env.VITE_API_URL}/api/movies`,
        );


        const types = await axios.get<IType[]>(
            `${import.meta.env.VITE_API_URL}/api/types`,
        );
        setMovies(movies.data);
        setType(types.data);
    };

    // AU CHARGEMENT DU COMPOSANT, J'EXÉCUTE LA FONCTION GETCONTENT
    useEffect(() => {
        getContent();
    }, []);

    return (
        <div className="home">
            {movies && types && (<>
                <h1>GRATFLIX</h1>
                <label>Choose your movie type
                    <select>
                        {types && types.map((type) =>
                            <option value={type.name} key={type.id}>{type.name}</option>)
                        }
                    </select>
                </label>
                <div className="home__list" >
                    {movies && movies.map((item) => <MoviesContent id={item.id} key={item.id} />)}
                </div>

            </>)}
        </div>
    );
};

export default Home;

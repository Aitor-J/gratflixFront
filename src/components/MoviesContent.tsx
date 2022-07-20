import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IMovie from '../interfaces/IMovie';
import IType from '../interfaces/IType';

//CALL INTERFACE FRONT NEEDED
interface MoviesContentProps {
    id: number;
}

const MoviesContent = ({ id }: MoviesContentProps) => {
    // JE CRÉE UN USESTATE AFIN DE STOCKER LA DATA ISSU DE L'APPEL AXIOS
    const [movies, setMovies] = useState<IMovie>();
    const [types, setType] = useState<IType>();

    // APPEL API AXIOS
    const getContent = async () => {
        //APPEL PROMESSE DE NEWSPAGE AXIOS.GET DE L'INTERFACE DE L'URL
        const movies = await axios.get<IMovie>(
            `http://localhost:3000/api/movies/${id}`,
        );

        //APPEL PROMESSE DE NEWSTYPE AXIOS.GET DE L'INTERFACE DE L'URL
        const types = await axios.get<IType>(
            `http://localhost:3000/api/types/${movies.data.idType}`,
        );

        setMovies(movies.data);
        setType(types.data);
    };

    // AU CHARGEMENT DU COMPOSANT, J'EXÉCUTE LA FONCTION GETCONTENT
    useEffect(() => {
        getContent();
    }, []);

    //J'INITIALISE LE BOUTTON SUR FALSE AVEC UNE FUNC QUI LE PASSE A TRUE
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className="moviesContent">
            {/* On fais un && des data reçus, si on l'a on envoi, sinon on continu */}
            {movies && types && (

                <div className='moviesContent__container'>

                    {isClicked ? "" : <h2>{movies.name}</h2>}
                    {isClicked ? "" : <h4>Click me for Details...</h4>}

                    {isClicked && <div className='moviesContent__container__infos'>
                        <h3>{movies.director}</h3>
                        <h3>{types.name}</h3>
                        <h3>{movies.length}</h3>
                        <h3>{movies.year}</h3>
                    </div>}

                    <img src={movies.cover} alt={movies.name} onClick={handleClick}
                        onKeyDown={handleClick}
                        role="presentation"
                        area-hidden="true" />

                </div>


            )}
        </div>
    );
};

export default MoviesContent;

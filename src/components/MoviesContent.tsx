import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IMovie from '../interfaces/IMovie';
import IType from '../interfaces/IType';
import ReactPlayer from 'react-player';

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
            `${import.meta.env.VITE_API_URL}/api/movies/${id}`,
        );

        //APPEL PROMESSE DE NEWSTYPE AXIOS.GET DE L'INTERFACE DE L'URL
        const types = await axios.get<IType>(
            `${import.meta.env.VITE_API_URL}/api/types/${movies.data.idType}`,
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
                    {isClicked ? "" : <h4>Click for Details...</h4>}

                    {isClicked && <div className='moviesContent__container__infos'>
                        <h3>This <span>{types.name}</span> Movie has been Directed By <span>{movies.director}</span> in <span>{movies.year}</span> and lasts <span>{movies.length}</span></h3>

                        <div className='moviesContent__container__infos__video'>
                            <ReactPlayer
                                url={movies.trailer}
                                width="15rem"
                                height="auto"
                                volume={0.3}
                                z-index={500}
                            />
                        </div>
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

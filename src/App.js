import React, { useState, useEffect } from 'react';
import { fetchAPI } from './api/api';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [columns, setColumns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    let isMounted = true;

    const timeout = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
        setErrorMessage('O servidor demorou a responder. Tente novamente mais tarde.');
      }
    }, 5000);

    fetchAPI()
      .then(responseData => {
        clearTimeout(timeout);

        if (isMounted) {
          setOriginalData(responseData);
          setData(responseData);
          setLoading(false);
        }
      })
      .catch(error => {
        clearTimeout(timeout);

        if (isMounted) {
          setLoading(false);
          if (error.response && error.response.status) {
            const statusCode = error.response.status;
            if (
              statusCode === 500 ||
              statusCode === 502 ||
              statusCode === 503 ||
              statusCode === 504 ||
              statusCode === 507 ||
              statusCode === 508 ||
              statusCode === 509
            ) {
              setErrorMessage('O servidor falhou em responder, tente recarregar a página');
            } else {
              setErrorMessage('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde');
            }
          } else {
            setErrorMessage('Ocorreu um erro ao buscar os dados da API.');
          }
          console.error(error);
        }
      });

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const itemsPerColumn = Math.ceil(data.length / 3);
      const dividedColumns = [];

      for (let i = 0; i < data.length; i += itemsPerColumn) {
        const columnItems = data.slice(i, i + itemsPerColumn);
        dividedColumns.push(columnItems);
      }

      setColumns(dividedColumns);
    }
  }, [data]);

  const handleGenreChange = event => {
    setSelectedGenre(event.target.value);
  };

  const handleSearch = () => {
    let filteredData = originalData;

    if (selectedGenre) {
      filteredData = filteredData.filter(item => item.genre === selectedGenre);
    }

    filteredData = filteredData.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setData(filteredData);
  };

  return (
    <div className="App">
      <div>
        <Header />
        <div className="content-container">
          <div className="search-container">
            <div className="search-input">
              <span className="item-text2">Buscar pelo Nome:</span>
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button className="search-button" onClick={handleSearch}>
                Pesquisar
              </button>
            </div>

            <div className="genre-dropdown">
              <label htmlFor="genre-dropdown" className="item-text2">
                Selecione um gênero:
              </label>
              <select id="genre-dropdown" value={selectedGenre} onChange={handleGenreChange}>
                <option value="">All</option>
                <option value="Shooter">Shooter</option>
                <option value="MMOARPG">MMOARPG</option>
                <option value="ARPG">ARPG</option>
                <option value="Fighting">Fighting</option>
                <option value="Action RPG">Action RPG</option>
                <option value="Battle Royale">Battle Royale</option>
                <option value="MMORPG">MMORPG</option>
                <option value="MOBA">MOBA</option>
                <option value="Sports">Sports</option>
                <option value="Racing">Racing</option>
                <option value="Card Game">Card Game</option>
                <option value="Strategy">Strategy</option>
                <option value="MMO">MMO</option>
                <option value="Social">Social</option>
                <option value="Fantasy">Fantasy</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="item-text">Carregando...</p>
            </div>
          ) : errorMessage ? (
            <div className="error-container">
              <p>{errorMessage}</p>
            </div>
          ) : (
            <div className="columns-container">
              {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="column">
                  {column.map((item, itemIndex) => (
                    <div key={itemIndex} className="item">
                      <img src={item.thumbnail} alt="Thumbnail" className="hover-effect" />
                      <p className="item-text">{item.title}</p>
                      <p className="item-text2">{item.genre}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

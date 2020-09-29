import React, { useEffect, useState } from "react";
import api from './services/api'


import "./styles.css";

// listar os repositórios que estão cadastrados na API
function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:'reactjs-concepts',
      url: 'https://github.com/wwwbrunagon/reactjs-concepts',
      techs: ['Node.js', 'ReactJS']
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    //nesse caso não uso o const response pois a minha rota delete não retorna nada, apenas o status
     await api.delete(`repositories/${id}`)

     setRepositories(repositories.filter(
       repository => repository.id != id
     ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

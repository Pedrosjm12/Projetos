import "./style.css";
import Excluir from "../../assets/Lixeira.png";
import Editar from "../../assets/Caneta.png";
import api from "../../services/api";
import { useEffect, useState } from "react";

function Home() {
  const [users, setUsers] = useState([]);
  
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);
  }

  // 2. Função para carregar os dados do card nos inputs lá em cima
  function fillForm(user) {
    setEditingUserId(user.id); 
    setName(user.name);        
    setAge(user.age);          
    setEmail(user.email); 
  }

  // 3. Função unificada para Salvar (Cria ou Edita)
  async function handleSave() {
    const userData = {
      nome: name,
      idade: age,
      email: email,
    };

    if (editingUserId) {
      // Se tiver um ID guardado, faz o PUT (Editar)
      await api.put(`/usuarios/${editingUserId}`, userData);
      setEditingUserId(null); // Sai do modo edição
    } 
    
    else {
      // Se não tiver ID, faz o POST (Criar)
      await api.post("/usuarios", userData);
    }

    // Limpa os campos após a operação
    setName("");
    setAge("");
    setEmail("");
    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container">
        <form>
          <h1>{editingUserId ? "Editar Usuário" : "Cadastro de Usuários"}</h1>
          
          {/* Conectando o value ao estado e o onChange para atualizar o estado */}
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            type="text" 
            placeholder="Nome" 
          />
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            placeholder="Idade"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />

          <button type="button" onClick={handleSave}>
            {editingUserId ? "Salvar Alterações" : "Cadastrar"}
          </button>
          
          {editingUserId && (
            <button type="button" onClick={() => { setEditingUserId(null); setName(""); setAge(""); setEmail(""); }} style={{backgroundColor: '#666', marginTop: '10px'}}>
              Cancelar Edição
            </button>
          )}
        </form>
      </div>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>

          <div className="container-buttons">
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Excluir} alt="Excluir" />
            </button>
            <button onClick={() => fillForm(user)}>
              <img src={Editar} alt="Editar" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default Home;
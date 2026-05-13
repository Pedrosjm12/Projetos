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

  function fillForm(user) {
    setEditingUserId(user.id);
    setName(user.name);
    setAge(user.age);
    setEmail(user.email);
  }

  async function handleSave() {
    // 1. Validação de campos vazios
    if (!name || !age || !email) {
      alert("Por favor, preencha todos os campos necessários.");
      return; // Interrompe a execução aqui
    }

    // 2. Validação de idade (apenas números positivos)
    if (isNaN(age) || Number(age) <= 0) {
      alert("A idade deve ser um número válido e maior que zero.");
      return;
    }

    // 3. Validação de e-mail (presença do @)
    if (!email.includes("@")) {
      alert("Por favor, insira um e-mail válido contendo '@'.");
      return;
    }

    const userData = {
      nome: name,
      idade: age,
      email: email,
    };

    try {
      if (editingUserId) {
        await api.put(`/usuarios/${editingUserId}`, userData);
        setEditingUserId(null);
      } else {
        await api.post("/usuarios", userData);
      }

      setName("");
      setAge("");
      setEmail("");
      getUsers();
    } catch (error) {
      alert("Erro ao salvar usuário. Verifique os dados ou a conexão.");
    }
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

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nome"
            required // Atributo HTML para reforçar a exigência
          />
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            placeholder="Idade"
            min="1" // Garante que no seletor do input o mínimo seja 1
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
            <button
              type="button"
              onClick={() => {
                setEditingUserId(null);
                setName("");
                setAge("");
                setEmail("");
              }}
              style={{ backgroundColor: "#666", marginTop: "10px" }}
            >
              Cancelar Edição
            </button>
          )}
        </form>
      </div>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
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

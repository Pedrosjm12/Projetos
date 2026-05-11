import express from 'express';
import cors from 'cors'; // 1. Importe o cors
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors()); 

app.get('/usuarios', async (req, res) => {
    
    const users = await prisma.user.findMany({
        where: {
            // Se existir req.query.nome, ele filtra. Se não, ignora.
            name: req.query.nome,
            email: req.query.email,
            age: req.query.idade ? Number(req.query.idade) : undefined
        }
    });

    res.status(200).json(users);
});

app.post('/usuarios', async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.nome,
      email: req.body.email,
      age: parseInt(req.body.idade) 
    }
  });

  res.status(201).json(req.body);
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                name: req.body.nome,
                email: req.body.email,
                age: parseInt(req.body.idade) 
            }
        });

        res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } 
    
    catch (error) {
        res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: Number(req.params.id),
        },
    });

    res.status(200).json({ message: 'Usuário deletado com sucesso' });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
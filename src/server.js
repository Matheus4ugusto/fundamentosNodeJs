import http from 'node:http'
import {randomUUID} from 'node:crypto'
import {json} from "./middlewares/json.js";
import {Database} from "./database.js";
// adicionar 'type': '[module]' no package.json para poder usar o modelo import e não require
// utilizar o prefixo 'node:' antes de importar módulos internos do node

//  - HTTP
//    - Método HTTP
//    - URL
//  - O método HTTP somado à URL são elementos diferenciadores de rotas, logo é possível que haja duas rotas com a mesma
//    URL, porém com métodos diferentes

//  GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end("Alterar muitas coisas ex.: perfil do usuário")
// PATCH => Atualizar uma informação específica de um recurso no back-end("Alterar poucas coisas ex.: senha do usuário")
// DELETE => Deletar um recurso do back-end

// GET/users => Buscando usuários do back-end
// POST/users => Criando um usuário no back-end

// Stateful - Stateless

// Cabeçalhos(req/res) => Metadados

const database = new Database()

const server = http.createServer(async (req,
                                        res) => {
    const {method, url} = req

    await json(req, res)

    if (method === 'GET' && url === '/users') {

        const users = database.select('users')

        return res.end(JSON.stringify(users)) //Early return
    }

    if (method === 'POST' && url === '/users') {

        const {name, email} = req.body

        const user = {
            id: randomUUID(),
            name,
            email,
        }

        database.insert('users', user)

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)
//localhost:3333
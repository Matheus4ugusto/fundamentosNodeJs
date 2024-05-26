import http from 'node:http'
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

const users = []

const server = http.createServer((req,
                                  res) => {
    const {method, url} = req

    console.log(req.headers)

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users)) //Early return
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'Fulano',
            email: 'fulano@email.com',
        })
        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)
//localhost:3333
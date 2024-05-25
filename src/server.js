import http from 'node:http'
// adicionar 'type': 'module' no package.json para poder usar o modelo import e não require
// utilizar o prefixo node: antes de importar módulos internos do node

const server = http.createServer((req, res) => {
    return res.end('Hello World!')
})

server.listen(3333)
//localhost:3333
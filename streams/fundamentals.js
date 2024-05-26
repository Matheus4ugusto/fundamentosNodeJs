// Netflix & Spotify

// Importação de clientes via CSV (Excel)
// 1gb - 1.000.000 linhas
// POST /upload import.csv

// 10mb/s - 100s

// 100s -> Inserções no banco de dados

// 10mb/s -> 10.000 linhas/s

// Readable Streams / Writable Streams

// process.stdin.pipe(process.stdout)

import {Readable} from 'node:stream'

class OneToHundredStream extends Readable {

    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}

new OneToHundredStream().pipe(process.stdout)
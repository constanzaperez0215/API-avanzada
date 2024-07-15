import express from 'express'
import dotenv from 'dotenv'
import { findAll, findfilter } from './models/consult.js'

dotenv.config()

const app = express()

app.get('/', (_, res) => res.status(200).send('Conectados al servidor!'))

app.get('/joyas', async (req, res) => {
  try {
    const joyas = await findAll(req.query)
    res.status(200).json(joyas)
  } catch (error) {
    console.error('Error en /joyas:', error)
    res.status(500).json({ status: false, message: 'No se puede realizar la consulta', error })
  }
})

app.get('/joyas/filtros', async (req, res) => {
  try {
    const filtros = await findfilter(req.query)
    res.status(200).json(filtros)
  } catch (error) {
    res.status(500).json({ status: false, message: 'No se pudo realizar la consulta filtros' })
  }
})

app.listen(process.env.PORT ?? 3000, () => console.log('Puerto conectado!'))

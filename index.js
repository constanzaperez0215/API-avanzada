import express from 'express'
import dotenv from 'dotenv'
import { findAll, findFilter } from './models/consult.js'
import { prepararHATEOAS } from './hateodas/hateodas.js'

dotenv.config()

const app = express()

app.get('/', (_, res) => res.status(200).send('Conectados al servidor!'))

app.get('/joyas', async (req, res) => {
  try {
    const joyas = await findAll(req.query)
    const HATEOAS = await prepararHATEOAS(joyas)
    res.status(200).json(HATEOAS)
  } catch (error) {
    console.error('Error en /joyas:', error)
    res.status(500).json({ status: false, message: 'No se puede realizar la consulta', error })
  }
})

app.get('/joyas/filtros', async (req, res) => {
  try {
    const filtros = await findFilter(req.query)
    const HATEOAS = await prepararHATEOAS(filtros)
    res.status(200).json(HATEOAS)
  } catch (error) {
    console.error('Error en /filtros', error)
    res.status(500).json({ status: false, message: 'No se pudo realizar la consulta filtros' })
  }
})

app.get('*', (_, res) => res.status(404).send('Esta ruta no existe'))

app.listen(process.env.PORT ?? 3000, () => console.log('Puerto conectado!'))

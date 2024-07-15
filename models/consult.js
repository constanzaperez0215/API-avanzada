import { db } from '../db/configDB.js'
import format from 'pg-format'

export const findAll = async ({ limits = 3, orderBy = 'precio_DESC', page = 1 }) => {
  const [column, sort] = orderBy.split('_')
  const offset = Math.abs(page > 0 ? page - 1 : 0) * limits
  const formattedQuery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s;', column, sort.toUpperCase(), limits, offset)
  return await db(formattedQuery)
}

export const findFilter = async ({ precio_max,  precio_min, categoria, metal }) => {
  let query = 'SELECT * FROM inventario '
  const filtros = []
  const values = []

  if (precio_max) {
    values.push(precio_max)
    filtros.push(`precio <= $${values.length}`)
  }

  if (precio_min) {
    values.push(precio_min)
    filtros.push(`precio >= $${values.length}`)
  }

  if (categoria) {
    values.push(categoria)
    filtros.push(`categoria = $${values.length}`)
  }

  if (metal) {
    values.push(metal)
    filtros.push(`metal = $${values.length}`)
  }

  if (filtros.length > 0) {
    query += ` WHERE ${filtros.join(' AND ')}`
  }

  return await db(query, values)
}

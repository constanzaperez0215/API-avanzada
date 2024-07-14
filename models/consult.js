import { db } from '../db/configDB.js'
import format from 'pg-format'

export const findAll = async ({ limits = 3, orderBy = 'precio_DESC', page = 1 }) => {
  const [column, sort] = orderBy.split('_')
  const offset = Math.abs(page > 0 ? page - 1 : 0) * limits
  const formattedQuery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s;', column, sort.toUpperCase(), limits, offset)
  return await db(formattedQuery)
}

// export const findfilter = async ({  }) => {
//   return await db('SELECT * FROM inventario ;', [])
// }

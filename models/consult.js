import { db } from '../db/configDB.js'
import format from 'pg-format'

export const findAll = async ({ limits = 3, orderBy = 'precio_DESC' }) => {
  const [column, sort] = orderBy.split('_')
  const formattedQuery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s;', column, sort.toUpperCase(), limits)
  return await db(formattedQuery)
}

// export const findfilter = async ({  }) => {
//   return await db('SELECT * FROM inventario ;', [])
// }

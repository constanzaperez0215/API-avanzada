import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { DateTime } from 'luxon'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const serverLog = (req, res, next) => {
  const now = DateTime.now().setZone('America/Santiago')

  const log = ({
    path: req.path,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
    fecha: now.toFormat('dd-MM-yyyy HH:mm:ssZZ')
  })

  // Convertir el log a una cadena JSON
  const logString = JSON.stringify(log, null, 2) + '\n'

  // Guardar el log en un archivo
  fs.appendFile(path.join(__dirname, 'report.log'), logString, (err) => {
    if (err) {
      console.error('Error al escribir el archivo de informe:', err)
    }
  })

  console.log(log)

  next()
}

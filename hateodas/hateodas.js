export const prepararHATEOAS = (joyas) => {
  let totalStock = 0

  const results = joyas.map((j) => {
    totalStock += j.stock
    return {
      name: j.nombre,
      href: `/joyas/${j.id}`
    }
  })

  return {
    totalStock,
    total: joyas.length,
    results
  }
}

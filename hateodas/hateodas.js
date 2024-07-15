export const prepararHATEOAS = (joyas) => {
  const results = joyas.map((j) => ({
    name: j.nombre,
    href: `/joyas/${j.id}`
  }))

  return {
    total: joyas.length,
    results
  }
}

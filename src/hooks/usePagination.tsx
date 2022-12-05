
const usePagination = (numResidents:number):number[] => {
  if(numResidents<10) return []
  const numPagination=Math.ceil(numResidents/9)
  const arrayNumPagination=[]
  for (let i = 1; i <= numPagination; i++) {
    arrayNumPagination.push(i)
  }
  
  return arrayNumPagination
}

export default usePagination
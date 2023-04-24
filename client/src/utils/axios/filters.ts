import axios from "axios"
import { FiltersType } from "../types"

export const filterExp = (dato: FiltersType)  => {
  const data  =  axios.get(`http://localhost:3000/filter?genres=${dato.genres}&limit=&page=&type=${dato.type}&demography=${dato.demography}&status=${dato.status}`)

  return data

}
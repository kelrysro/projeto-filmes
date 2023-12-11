import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmExY2YzZWUxZjA0MzkyMGMxN2I4Y2ZmMjZiOTVlOCIsInN1YiI6IjY0ZmYxNTcxMmRmZmQ4MDBhZGI2ZjlhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9mkPip-VR_aTvrIw61NobRPhAcfE1KiG-yzIfX6COaM`
  }
})

export default api
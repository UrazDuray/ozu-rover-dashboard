import axios from 'axios'
const url = 'http://localhost:3000/'



const roverData = {
  getData: () => {
    return new Promise((resolve, reject) => {
      axios.get(url + 'data')
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        });
    })
  },
}

export { roverData }
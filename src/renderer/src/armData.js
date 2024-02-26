import axios from 'axios'

const armData = {
  getData: () => {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:5000/arm/states')
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        });
    })
  },
}

export { armData }

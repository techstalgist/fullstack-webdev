import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('http://localhost:3002/anecdotes')
  return response.data
}

export default { getAll }
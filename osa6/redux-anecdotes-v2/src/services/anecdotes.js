import axios from 'axios'
const url = 'http://localhost:3002/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const create = async (content) => {
    const response = await axios.post(url, {content, votes: 0})
    return response.data
}

export default { getAll, create }
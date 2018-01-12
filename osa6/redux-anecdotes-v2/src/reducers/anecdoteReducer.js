const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const updatedAnecdote = action.data
    const old = store.filter(a => a.id !== updatedAnecdote.id)
    return [...old, updatedAnecdote ]
  }
  if (action.type === 'CREATE') {
    return [...store, action.data]
  }
  if (action.type === 'INIT') {
    return action.data
  }

  return store
}

export const voteAdding = (data) => {
  return {
    type: 'VOTE',
    data
  }
}

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export default reducer
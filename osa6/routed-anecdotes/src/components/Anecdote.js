import React from 'react'

const Anecdote = ({anecdote}) => {

    if(anecdote === undefined) {
        return (<div></div>)
    }
    return (
        <div>
            <h1>{anecdote.content} by {anecdote.author}</h1>
            <p>has {anecdote.votes} votes</p>
            <p>for more info, see <a href={anecdote.info}>{anecdote.info}</a></p>
        </div>
    )
}

export default Anecdote


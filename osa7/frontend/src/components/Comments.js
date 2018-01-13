import React from 'react'

const Comments = ({comments, comment, changeComment, addComment}) => {

  return (
    <div>
        <h3>comments</h3>
        <ul>
            {comments.map(c => 
                (<li key={c._id}>{c.content}</li>)
            )}
        </ul>
        <input value={comment} onChange={changeComment}/>
        <button onClick={addComment}>add comment</button>
    </div>
  )
}

export default Comments

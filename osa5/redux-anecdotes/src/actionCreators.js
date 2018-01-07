const actionFor = {
    voting(id) {
        return {
            type: 'VOTE',
            id
        }
    },

    creating(content) {
        return {
            type: 'NEW',
            content
        }
    }
}

export default actionFor
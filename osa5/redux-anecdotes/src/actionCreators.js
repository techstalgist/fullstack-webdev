const actionFor = {
    voting(id) {
        return {
            type: 'VOTE',
            id
        }
    }
}

export default actionFor
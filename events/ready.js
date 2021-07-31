module.exports = {
    name: 'ready',
    run: (client) => {
        client.on('ready', async() => {
            console.log(client.user.username + ' is online!')
        })
    }
}
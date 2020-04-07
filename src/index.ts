import SharedProcessingUnit from './SharedProcessingUnit'

const getData = async (link: string) => {
    const response = await fetch(link, {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    })
    return await response.text()
}

const webSocket = new WebSocket(process.env.WebSocketURI)
const spu = new SharedProcessingUnit(webSocket, getData)

spu.run()

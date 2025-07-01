import {useRef, useEffect} from 'react'
import io from 'socket.io-client'
import SocketContext from './SocketContext'

let sharedSocket = null

function SocketProvider({children}) {
    const socketRef = useRef(null)
    if (!sharedSocket) {
        sharedSocket = io(import.meta.env.VITE_BACKEND_URL, {transports: ['websocket']})
        socketRef.current = sharedSocket
    }
    useEffect(() => {
        const handleUnload = () => {
            if (socketRef.current?.connected) {
                socketRef.current.disconnect()
            }
        }
        window.addEventListener('beforeunload', handleUnload)
        return () => {
            window.removeEventListener('beforeunload', handleUnload)
        }
    }, [])
    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
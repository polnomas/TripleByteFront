import axios from "axios"

class Handler {
    #userId
    #gameId
    #gameSetter
    #playerSetter
    #originSetter
    #originValueSetter
    #socket
    constructor(socket, userId, gameId, gameSetter, playerSetter, originSetter, originValueSetter) {
        this.#socket = socket
        this.#userId = userId
        this.#gameId = gameId
        this.#gameSetter = gameSetter
        this.#playerSetter = playerSetter
        this.#originSetter = originSetter
        this.#originValueSetter = originValueSetter
        this.#initSocket()
    }
    #initSocket() {
        this.#socket.emit('reJoinGame', {gameId: this.#gameId, userId: this.#userId})
        this.#socket.on('updateGameState', (data) => {
            console.log('actualizacion del game')
            console.dir(data, {depth: null})
            this.#gameSetter(data)
        })
        this.#socket.on('updatePlayerState', (data) => {
            console.log('Llego actualizacion de player.')
            console.dir(data, {depth: null})
            this.#playerSetter(data)
        })
        this.#socket.on('makeAMoveResponse', (res) => {
            console.log('Llegó respuesta a movimiento.')
            if (!res.data.success) {
                alert(res.data.message)
            }
        })
    }
    /**
    * Consulta el estado del juego al backend (antes fetchGameState).
    */
    async updateGameState() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/play/status/${this.#gameId}`)
            this.#gameSetter(res.data.data)
        } catch (error) {
            console.error("Error fetching game state:", error)
        }
    }
    /**
    * Consulta el estado del jugador al backend (antes fetchMyGameState).
    */
    async updatePlayerState() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/play/my_status/${this.#gameId}/${this.#userId}`)
            this.#playerSetter(res.data.data)
        } catch (error) {
            console.error("Error fetching player state:", error)
        }
    }
    #formatedBackCtx(body, params) {
        return {request: {body}, params}
    }
    #formatedDrawRequest() {
        return this.#formatedBackCtx({
            gameId: this.#gameId,
            action: {
                type: 'draw',
                userMovingId: this.#userId
            }
        }, {})
    }
    async handleDraw() {
        this.#socket.emit('makeAMove', this.#formatedDrawRequest())
    }
    handleOriginSelection(origin, value, oldOrigin = null, oldValue = null) {
        if (oldOrigin === origin && oldValue === value) {
            this.#originValueSetter(null)
        } else {
            this.#originSetter(origin)
            this.#originValueSetter(value)
        }
    }
    #formatedDiscardRequest(dPosition, cardId) {
        return this.#formatedBackCtx({
            gameId: this.#gameId,
            action: {
                type: 'discard',
                userMovingId: this.#userId,
                subData: {
                    dPosition,
                    cardId
                }
            }
        }, {})
    }
    async handleDiscard(discardIndex, hand, handIndex) {
        this.#socket.emit('makeAMove', this.#formatedDiscardRequest(discardIndex, hand[handIndex]))
    }
    #formatedConstructRequest(cPosition, origin, originValue, hand = null) {
        return this.#formatedBackCtx({
            gameId: this.#gameId,
            action: {
                type: 'construct',
                userMovingId: this.#userId,
                subData: {
                    origin,
                    cPosition,
                    cardId: Array.isArray(hand) ? hand[originValue] : null,
                    dPosition: originValue
                }
            }
        }, {})
    }
    async handleConstruct(constructionIndex, origin, originValue, hand = null) {
        this.#socket.emit('makeAMove', this.#formatedConstructRequest(constructionIndex, origin, originValue, hand))
    }
    async handleDestinySelection(destiny, destinyValue, origin, originValue, extraData = null) {
        console.log('DEBUG:', { destiny, destinyValue, origin, originValue, extraData });
        if (destiny === 'DiscardPile') {
            if (destinyValue === null) {
                throw new Error("No discard pile selected")
            }
            if (origin === 'Hand') {
                if (originValue === null) {
                    throw new Error("No card selected from hand")
                }
                this.handleDiscard(destinyValue, extraData, originValue)
                this.#originValueSetter(null)
            }
            return
        }
        if (destiny === 'ConstructionPile') {
            if (destinyValue === null) {
                console.error("No construction pile selected")
                return
            }
            if (['Hand', 'DiscardPile', 'MainPile'].includes(origin)) {
                if ((origin === 'MainPile' && originValue) || (origin !== 'MainPile' && originValue !== null && originValue >= 0)) {
                    this.handleConstruct(destinyValue, origin, originValue, extraData)
                    this.#originValueSetter(null)
                    return
                }
                throw new Error("No card selected from origin")
            }
        }
    }
    async handleSelection(selection, selectionValue, oldSelection, oldSelectionValue, extraData = null) {
        if (selection === 'ConstructionPile') {
            this.handleDestinySelection(selection, selectionValue, oldSelection, oldSelectionValue, extraData)
            return
        }
        if (selection === 'DiscardPile' && oldSelection === 'Hand') {
            try {
                this.handleDestinySelection(selection, selectionValue, oldSelection, oldSelectionValue, extraData)
            } catch (error) {
                this.handleOriginSelection(selection, selectionValue, oldSelection, oldSelectionValue)
                console.error("Error handling discard pile selection as destiny:", error)
            }
            return
        }
        this.handleOriginSelection(selection, selectionValue, oldSelection, oldSelectionValue)
        return
    }
    cleanup() {
        this.#socket.off('updateGameState')
        this.#socket.off('updatePlayerState')
        this.#socket.off('makeAMoveResponse')
    }

}

export default Handler


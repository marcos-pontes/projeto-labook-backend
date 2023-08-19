export abstract class BaseError extends Error {
    constructor(
        public statusCode: number,
        message: string = "Requisição invalida"
    ) {
        super(message)
    }
}
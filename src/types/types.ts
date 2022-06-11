import { FastifyRequest } from 'fastify';

export type FastifyRequestType = FastifyRequest<{
    Body: { _id:string, file: string, title: string, author: string }
    Params: { _id: string}
}>;
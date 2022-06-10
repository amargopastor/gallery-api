import { FastifyRequest } from 'fastify';

export type GetFastifyRequestType = FastifyRequest<{
    Params: { _id: string}
}>;

export type PostFastifyRequestType = FastifyRequest<{
    Body: { _id:string, file: string, title: string, description: string }
}>;
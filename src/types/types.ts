import { FastifyRequest } from 'fastify';

// export type GetFastifyRequestType = FastifyRequest<{
//     Params: { _id: string}
// }>;

export type FastifyRequestType = FastifyRequest<{
    Body: { _id:string, file: string, title: string, author: string }
    Params: { _id: string}
}>;
import Fastify, { FastifyInstance } from 'fastify'
import { NestedNullableUser, NestedUser, NullableUser, User } from './schemas'

const userString = {
    id: 1,
    name: 'Pablo',
    created_at: '2022-01-11T19:11:47.000Z',
    updated_at: '2022-01-11T19:11:47.000Z',
};

const userObject = {
    id: 1,
    name: 'Pablo',
    created_at: (new Date()),
    updated_at: '2022-01-11T19:11:47.000Z',
}

// routes

const server: FastifyInstance = Fastify({})

server.get('/string', { schema: { response: { 200: User, }, } }, async (request, reply) => {
    return userString
})

server.get('/object', { schema: { response: { 200: User, }, } }, async (request, reply) => {
    return userObject
})

server.get('/null', { schema: { response: { 200: User, }, } }, async (request, reply) => {
    return null
})

server.get('/nullable_string', { schema: { response: { 200: NullableUser, }, } }, async (request, reply) => {
    return userString
})

server.get('/nullable_object', { schema: { response: { 200: NullableUser, }, } }, async (request, reply) => {
    return userObject
})

server.get('/nullable_null', { schema: { response: { 200: NullableUser, }, } }, async (request, reply) => {
    return null
})

server.get('/nested_string', { schema: { response: { 200: NestedUser, }, } }, async (request, reply) => {
    return {
        user: userString
    }
})

server.get('/nested_object', { schema: { response: { 200: NestedUser, }, } }, async (request, reply) => {
    return {
        user: userObject
    }
})

server.get('/nested_null', { schema: { response: { 200: NestedUser, }, } }, async (request, reply) => {
    return {
        user: null
    }
})

server.get('/nested_nullable_string', { schema: { response: { 200: NestedNullableUser, }, } }, async (request, reply) => {
    return {
        user: userString
    }
})

server.get('/nested_nullable_object', { schema: { response: { 200: NestedNullableUser, }, } }, async (request, reply) => {
    return {
        user: userObject
    }
})

server.get('/nested_nullable_null', { schema: { response: { 200: NestedNullableUser, }, } }, async (request, reply) => {
    return {
        user: null
    }
})

const start = async () => {
    try {
        server.listen(3010, (err, address) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
            console.log(`Server listening at ${address}`)

            console.log(`
Available endpoints:

${address}/string
${address}/object
${address}/null (should throw error 500)

${address}/nullable_string
${address}/nullable_object
${address}/nullable_null

${address}/nested_string
${address}/nested_object
${address}/nested_null (should throw error 500)

${address}/nested_nullable_string
${address}/nested_nullable_object
${address}/nested_nullable_null

`);

        })

    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()
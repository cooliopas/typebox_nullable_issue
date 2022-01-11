import { TSchema, Type } from "@sinclair/typebox";

const Nullable = <T extends TSchema>(type: T) => Type.Union([type, Type.Null()])

export const User = Type.Object({
    id: Type.Number(),
    name: Type.String(),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' }),
})
export const NullableUser = Nullable(User);

export const NestedUser = Type.Object({
    user: User
})
export const NestedNullableUser = Type.Object({
    user: Nullable(User)
})
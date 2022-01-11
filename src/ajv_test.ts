import addFormats from 'ajv-formats'
import Ajv from 'ajv/dist/2019'
import { NestedNullableUser, NestedUser, NullableUser, User } from './schemas'

const ajv = addFormats(new Ajv({}), [
    'date-time',
    'time',
    'date',
    'email',
    'hostname',
    'ipv4',
    'ipv6',
    'uri',
    'uri-reference',
    'uuid',
    'uri-template',
    'json-pointer',
    'relative-json-pointer',
    'regex'
]).addKeyword('kind').addKeyword('modifier')

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

// non nullable
const validString = ajv.validate(User, userString)
const validObject = ajv.validate(User, userObject)
const validNull = ajv.validate(User, null)

// nullable
const validNullableString = ajv.validate(NullableUser, userString)
const validNullableObject = ajv.validate(NullableUser, userObject)
const validNullableNull = ajv.validate(NullableUser, null)

// nested non nullable
const validNestedString = ajv.validate(NestedUser, {
    user: userString
})
const validNestedObject = ajv.validate(NestedUser, {
    user: userObject
})
const validNestedNull = ajv.validate(NestedUser, {
    user: null
})

// nested nullable
const validNestedNullableString = ajv.validate(NestedNullableUser, {
    user: userString
})
const validNestedNullableObject = ajv.validate(NestedNullableUser, {
    user: userObject
})
const validNestedNullableNull = ajv.validate(NestedNullableUser, {
    user: null
})

console.log(`Is valid using string?: ${validString}`);
console.log(`Is valid using object?: ${validObject}`);
console.log(`Is valid using null?: ${validNull}`);
console.log(`(nullable) Is valid using string?: ${validNullableString}`);
console.log(`(nullable) Is valid using object?: ${validNullableObject}`);
console.log(`(nullable) Is valid using null?: ${validNullableNull}`);
console.log(`(nested) Is valid using string?: ${validNestedString}`);
console.log(`(nested) Is valid using object?: ${validNestedObject}`);
console.log(`(nested) Is valid using null?: ${validNestedNull}`);
console.log(`(nested & nullable) Is valid using string?: ${validNestedNullableString}`);
console.log(`(nested & nullable) Is valid using object?: ${validNestedNullableObject}`);
console.log(`(nested & nullable) Is valid using null?: ${validNestedNullableNull}`);
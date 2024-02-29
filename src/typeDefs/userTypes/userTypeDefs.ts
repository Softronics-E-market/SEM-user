export default `
    type AddressObject {
        addressId: String!
        addressLine1: String!
        addressLine2: String
        pinCode: String!
        landMark: String
        coordinates: Coordinates
        isDefault: Boolean
    }

    type Coordinates {
        latitude: String!
        longitude: String!
    }

    input CoordinatesInput {
        latitude: String!
        longitude: String!
    }

    input AddressInput {
        addressLine1: String!
        addressLine2: String
        pinCode: String!
        landMark: String
        coordinates: CoordinatesInput
        isDefault: Boolean!
    }


    type User {
        firstName: String!
        lastName: String
        phone: String
        email: String
        userUuid: String!
        address: [AddressObject!]!
    }

    type Query {
        getUser(userUuid: ID!): User!
        verifyUserOrder(userUuid: ID!, orderUuid: ID!): Boolean!
    }

    input AddUserInput {
        firstName: String!
        lastName: String
        phone: String
        email: String
        address: [AddressInput!]!
    }

    type Mutation {
        addUser(userInput: AddUserInput!): User!
    }
`

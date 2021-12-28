const DEBUG_COLORS = Object.freeze({
    RED: '\x1b[31m%s\x1b[0m',
    GREEN: '\x1b[32m%s\x1b[0m',
    YELLOW: '\x1b[33m%s\x1b[0m',
    BLUE: '\x1b[34m%s\x1b[0m',
    PINK: '\x1b[35m%s\x1b[0m',
})

const COLLECTIONS = Object.freeze({
    USER: 'users',
    BOOK: 'books'
})

const USER_ROLE = Object.freeze({
    ADMIN: 'GROUP_ROLE_ADMIN',
    USER: 'GROUP_ROLE_USER'
})

module.exports = {DEBUG_COLORS, COLLECTIONS, USER_ROLE}

import knex from 'server/database'
import bcrypt from 'bcrypt'

const saltRounds = 10

export const createUser = async ({ username, password }) => {
  const hash = await bcrypt.hash(password, saltRounds)
  return knex()
    .insert({ username, password: hash })
    .into('users')
    .returning('id')
}

export default createUser

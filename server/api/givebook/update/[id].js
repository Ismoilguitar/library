import pg from 'pg'

const { Client } = pg

const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'library',
	password: 'root',
	port: 5432,
})
client.connect(err => {
	if (err) {
		console.error('Error connecting to the database', err.stack)
	}
})

export default defineEventHandler(async event => {
	try {
		const body = await readBody(event)
		if (!body) {
			throw new Error('Request body is missing')
		}

		const { namebook, name, passport, street, kol, datetime, returnbook } = body
		const { id } = event.context.params
		const query = `
			UPDATE givebook 
			SET namebook = $1, name = $2, passport = $3, street = $4, kol = $5, datetime = $6, returnbook = $7
			WHERE id = $8
			RETURNING *
		`
		const result = await client.query(query, [
			namebook,
			name,
			passport,
			street,
			kol,
			datetime,
			returnbook,
			id,
		])

		// Check if the query returned any rows
		if (result.rows.length === 0) {
			throw new Error('No book found with the given ID')
		}

		// Return the updated data
		return result.rows[0]
	} catch (error) {
		console.error('Error updating data into PostgreSQL:', error.message)
		// Return an error response
		return { error: error.message }
	}
})

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
		const { id } = event.context.params
		const sql = 'SELECT * FROM book WHERE id = $1'
		const result = await client.query(sql, [id])

		if (result.rows.length === 0) {
			// If no book with the given ID is found, return a 404 response
			return { error: 'Book not found' }
		}

		// Return the book data
		return result.rows[0]
	} catch (error) {
		console.error('Error executing query', error)

		// Return a 500 error response
		return { error: 'Internal server error' }
	}
})

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

		const { name, year, author, price, kol, image } = body
		const { id } = event.context.params

		if (!name || !year || !author || !price || !kol || !image) {
			throw new Error('Missing required fields')
		}

		const query = `
			UPDATE book 
			SET name = $1, year = $2, author = $3, price = $4, kol = $5, image = $6 
			WHERE id = $7
			RETURNING *
		`
		const result = await client.query(query, [
			name,
			year,
			author,
			price,
			kol,
			image,
			id,
		])
		if (result.rows.length === 0) {
			throw new Error('No book found with the given ID')
		}

		return result.rows[0]
	} catch (error) {
		console.error('Error updating data into PostgreSQL:', error.message)
		return { error: error.message }
	}
})

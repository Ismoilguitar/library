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
		const { name, year, author, price, kol, image } = await readBody(event)

		// Construct the SQL query to insert data
		const query = `
            INSERT INTO book (name, year, author, price, kol, image)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `
		// Execute the query
		const result = await client.query(query, [
			name,
			year,
			author,
			price,
			kol,
			image,
		])

		// Return the inserted data
		return result.rows[0]
	} catch (error) {
		console.error('Error inserting data into PostgreSQL:', error)
		// Return an error response
		return { error: 'Failed to insert data into PostgreSQL' }
	}
})

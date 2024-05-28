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
		const { namebook, name, passport, street, kol, datetime, returnbook } =
			await readBody(event)

		// Construct the SQL query to insert data
		const query = `
            INSERT INTO givebook (namebook, name, passport, street, kol, datetime, returnbook)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `
		// Execute the query
		const result = await client.query(query, [
			namebook,
			name,
			passport,
			street,
			kol,
			datetime,
			returnbook,
		])

		// Return the inserted data
		return result.rows[0]
	} catch (error) {
		console.error('Error inserting data into PostgreSQL:', error)
		// Return an error response
		return { error: 'Failed to insert data into PostgreSQL' }
	}
})

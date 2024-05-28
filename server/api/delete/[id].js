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
		const id = event.context.params.id
		const sql = 'DELETE FROM book WHERE id = $1'
		const result = await client.query(sql, [id])

		if (result.rowCount === 0) {
			throw new Error('No book found with the given ID')
		}

		return {
			success: true,
			message: 'Китоб бомуввақият нест шуд!',
		}
	} catch (error) {
		console.error('Error executing query', error)
		return {
			success: false,
			error: error.message,
		}
	}
})

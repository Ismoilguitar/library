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

async function checkDatabase() {
	try {
		const sql = 'SELECT start_at FROM shifts'
		const result = await client.query(sql)
	} catch (error) {
		console.error('Error executing interval query', error)
	}
}
const databaseIntervalId = setInterval(checkDatabase, 1000)

// Cleanup function to clear the intervals and close the database connection when needed
function cleanup() {
	clearInterval(databaseIntervalId)
	clearInterval(customQueryIntervalId)
	client.end(err => {
		if (err) {
			console.error('Error closing the database connection', err.stack)
		} else {
			console.log('Database connection closed')
		}
	})
}

// Make sure to handle process exit signals to cleanup resources properly
process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

export default defineEventHandler(async event => {
	try {
		const { id } = event.context.params
		const sql = 'SELECT datetime FROM givebook where id = $1'
		const result = await client.query(sql, [id])

		return {
			data: result.rows,
		}
	} catch (error) {
		console.error('Error executing query', error)
		return {
			error: error,
		}
	}
})

import fs from 'fs'
import multer from 'multer'
import path from 'path'

const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			const uploadPath = path.join(process.cwd(), 'public/uploads')
			fs.mkdirSync(uploadPath, { recursive: true })
			cb(null, uploadPath)
		},
		filename: (req, file, cb) => {
			cb(null, `${Date.now()}-${file.originalname}`)
		},
	}),
})

export default defineEventHandler(async event => {
	const { req, res } = event.node
	await new Promise((resolve, reject) => {
		upload.single('file')(req, res, err => {
			if (err) {
				reject(err)
			} else {
				resolve()
			}
		})
	})

	if (!req.file) {
		res.statusCode = 400
		return { error: 'No file uploaded' }
	}
	const filePath = `/uploads/${req.file.filename}`
	return {
		filePath,
	}
})

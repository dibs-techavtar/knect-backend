import { PORT } from './config/env.js'
import { connectDb } from './config/db.js'
import app from './app.js'

(async function startServer() {
    await connectDb();
    app.listen(PORT, () => {
        console.log(`Server ready on http://localhost:${PORT}`)
    })
})();
import mongoose from 'mongoose'
import Cache from '../cache/Config'

/**
 * connect to the db with connection string as param
 */
export default (database: string) => {
    const connect = () => {
        mongoose
            .connect(database, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            })
            .then(() => console.log(`Database connection successful.....`))
            .catch((error: { message: string }) => {
                console.log('Unable to connect to the db: ' + error.message)
                return process.exit(1)
            })
        mongoose.set('useCreateIndex', true)
    }
    connect()
    mongoose.connection.on('disconnected', () => {
        Cache.nodeCache.flushAll()
        console.log(`Db disconnected`)
    })

    process.on('SIGINT', async () => {
        await mongoose.connection.close()
        Cache.nodeCache.flushAll()
        process.exit(0)
    })
}

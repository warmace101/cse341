const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

/**
 * Connect to MongoDB
 * This function establishes a connection to your MongoDB Atlas cluster
 */
async function connectToDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        
        // Create a new MongoClient instance
        const client = new MongoClient(process.env.MONGODB_URI);
        
        // Connect to the database
        await client.connect();
        
        // Get reference to the database (you can name this whatever you want)
        db = client.db('professionalDB');
        
        console.log('Successfully connected to MongoDB!');
        return db;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}

/**
 * Get database instance
 * Returns the database connection for use in other files
 */
function getDatabase() {
    if (!db) {
        throw new Error('Database not connected! Call connectToDatabase() first.');
    }
    return db;
}

module.exports = {
    connectToDatabase,
    getDatabase
};
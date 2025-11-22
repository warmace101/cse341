const express = require('express');
const { connectToDatabase, getDatabase } = require('./database');
const app = express();
const port = 8080;

// CORS middleware to allow frontend to connect
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Sample professional data that matches what your frontend expects (backup/fallback data)
const sampleData = {
    professionalName: "John Doe",
    base64Image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
    nameLink: {
        firstName: "John",
        url: "https://johndoe.dev"
    },
    primaryDescription: " - Full Stack Developer",
    workDescription1: "Passionate about creating amazing web applications with modern technologies.",
    workDescription2: "Experienced in JavaScript, Node.js, React, and database design.",
    linkTitleText: "Connect with me:",
    linkedInLink: {
        text: "LinkedIn Profile",
        link: "https://linkedin.com/in/johndoe"
    },
    githubLink: {
        text: "GitHub Profile",
        link: "https://github.com/johndoe"
    },
    contactText: "Feel free to reach out for collaboration opportunities!"
};

// Root endpoint to avoid 404 errors
app.get('/', (req, res) => {
    res.json({
        message: "Backend API is running!",
        endpoints: {
            professional: "/professional"
        },
        status: "Ready"
    });
});

// REST endpoint that gets data from MongoDB
app.get('/professional', async (req, res) => {
    try {
        console.log('Professional data requested from frontend');
        
        // Get database connection
        const db = getDatabase();
        
        // Get data from MongoDB collection named 'professionals'
        const collection = db.collection('professionals');
        const professionalData = await collection.findOne({});
        
        if (!professionalData) {
            // If no data in database, return sample data as fallback
            console.log('⚠️ No data found in database, using sample data');
            return res.json(sampleData);
        }
        
        console.log('✅ Data retrieved from MongoDB');
        res.json(professionalData);
        
    } catch (error) {
        console.error('❌ Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch professional data' });
    }
});

// Start the server with MongoDB connection
async function startServer() {
    try {
        // Connect to MongoDB first
        await connectToDatabase();
        
        // Start the Express server
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
            console.log(`API endpoint: http://localhost:${port}/professional`);
            console.log(`Connected to MongoDB database`);
            console.log(`Ready for frontend testing with database!`);
        });
        
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Start the application
startServer();
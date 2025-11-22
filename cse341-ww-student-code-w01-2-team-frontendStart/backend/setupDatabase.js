const { connectToDatabase, getDatabase } = require('./database');

// Professional data to insert into MongoDB
const professionalData = {
    professionalName: "Johnathan Babb",
    base64Image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
    nameLink: {
        firstName: "Johnathan",
        url: "https://johnathanbabb.dev"
    },
    primaryDescription: " - Full Stack Web Developer",
    workDescription1: "Passionate about creating innovative web applications using modern technologies like Node.js, React, and MongoDB.",
    workDescription2: "Experienced in building scalable backend APIs, responsive frontend interfaces, and database design for real-world applications.",
    linkTitleText: "Connect with me:",
    linkedInLink: {
        text: "LinkedIn Profile",
        link: "https://linkedin.com/in/jonathanbabb"
    },
    githubLink: {
        text: "GitHub Profile",
        link: "https://github.com/jonathanbabb"
    },
    contactText: "Feel free to reach out for collaboration opportunities or project discussions!"
};

async function insertProfessionalData() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        
        // Connect to database
        await connectToDatabase();
        const db = getDatabase();
        
        console.log('📝 Inserting professional data...');
        
        // Get the professionals collection
        const collection = db.collection('professionals');
        
        // Clear existing data (optional)
        await collection.deleteMany({});
        console.log('🗑️  Cleared existing data');
        
        // Insert new professional data
        const result = await collection.insertOne(professionalData);
        
        console.log('✅ Professional data inserted successfully!');
        console.log('📄 Document ID:', result.insertedId);
        
        // Verify the data was inserted
        const insertedData = await collection.findOne({});
        console.log('🔍 Verification - Data in database:');
        console.log('   Name:', insertedData.professionalName);
        console.log('   Description:', insertedData.primaryDescription);
        
        console.log('🎉 Database setup complete! Your API will now serve data from MongoDB.');
        
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error inserting data:', error);
        process.exit(1);
    }
}

// Run the script
insertProfessionalData();
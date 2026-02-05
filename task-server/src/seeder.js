const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const User = require('./models/User');
// product model is likely needed if we don't want to break if products depend on users or vice versa, 
// but for now focusing on Users as requested. If Product model exists, might be good to import it to clear it optionally, 
// but the prompt only asked for users. However, standard seeders often clear everything. 
// I'll check if Product model is used in previous steps or if I saw it in file list. I did see Product.js.
// I'll stick to just Users for now to avoid accidental data loss of products unless I'm sure.
// actually, standard practice is to clear relevant collections. I will focus on User.
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();

        await User.insertMany(users);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

const File = require('./models/file');
const fs = require('fs');
const connectDB = require('./config/db');
connectDB();

async function deleteData() {
  const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
  const files = await File.find({ createdAt: { $lt: pastDate } });
  if (files.length) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.path);
        await file.remove();
        console.log(`successfully deleted ${file.filename}`);
      } catch (error) {
        console.log(`error while deleting file ${error}`);
      }
    }
    console.log('Done job for this time');
  }
}

deleteData().then(process.exit);

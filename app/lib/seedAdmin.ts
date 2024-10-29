import Admin from '../models/Admin';
import connectDB from './mongodb';

const seedAdminUser = async () => {
  const adminEmail = 'fidelniyomugabo67@gmail.com'; 
  const adminPassword = 'admin123';

  await connectDB();

  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const adminUser = new Admin({
      email: adminEmail,
      password: adminPassword,
    });

    await adminUser.save();
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
};

export default seedAdminUser;

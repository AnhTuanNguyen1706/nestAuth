import { Role } from '../roles/entity/roles.entity';
import { Permission } from '../permissions/entity/permissions.entity';
import dataSource from '../../data-source';
import { User } from '../user/entity/user.entity';

async function seed() {
  await dataSource.initialize();

  const roleRepo = dataSource.getRepository(Role);
  const userRepo = dataSource.getRepository(User);
  const adminRole = await roleRepo.findOne({ where: { name: 'admin' } });
  const userRole = await roleRepo.findOne({ where: { name: 'user' } });
  const user = await userRepo.findOne({
    where: { username: 'tuandeptrai1706' },
    relations: ['roles'],
  });
  if (user && userRole) {
    user.roles = [...(user.roles || []), userRole];
    await userRepo.save(user);
  } else {
    console.error('User hoặc Role không tồn tại!');
  }

  console.log('✅ Seed thành công!');
  process.exit(0);
}
seed().catch((error) => {
  console.error('❌ Seed thất bại:', error);
  process.exit(1);
});

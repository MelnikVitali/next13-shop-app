import { getServerSession } from 'next-auth/next';
import { AccountCircleOutlined } from '@mui/icons-material';
import { authOptions } from '@/configs/authOptions';
import OutShopLayout from '@/components/layouts/OutShopLayout';
import UserProfile from '@/components/ui/UserProfile';

export default async function Profile() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <OutShopLayout
        title='Profile'
        subTitle='General information'
        icon={<AccountCircleOutlined />}
      >
        <UserProfile />
      </OutShopLayout>
    </>
  );
}

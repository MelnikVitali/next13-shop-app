import { FC } from 'react';
import SignUnForm from '@/components/Form/SignUpForm/';
import OutShopLayout from '@/components/layouts/OutShopLayout';
import { authOptions } from '@/configs/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Signup: FC = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect('/');

  return (
    <OutShopLayout>
      <SignUnForm />
    </OutShopLayout>
  );
};

export default Signup;

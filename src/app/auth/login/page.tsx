import { FC } from 'react';
import SignInForm from '@/components/Form/SignInForm';
import OutShopLayout from '@/components/layouts/OutShopLayout';

const Signin: FC = () => {
  return (
    <OutShopLayout>
      <SignInForm />
    </OutShopLayout>
  );
};

export default Signin;

import { FC } from 'react';
import ForgotPaSwordForm from '@/components/Form/ForgotPasswordForm';
import OutShopLayout from '@/components/layouts/OutShopLayout';

const ForgotPaSword: FC = () => {
  return (
    <OutShopLayout>
      <ForgotPaSwordForm />
    </OutShopLayout>
  );
};

export default ForgotPaSword;

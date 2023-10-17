import { FC } from 'react';
import ResetPasswordForm from '@/components/Form/ResetPasswordForm';
import OutShopLayout from '@/components/layouts/OutShopLayout';

type Props = {
  params: {
    id: string;
  };
};

const ResetPassword: FC<Props> = ({ params: { id } }) => {
  return (
    <OutShopLayout>
      <ResetPasswordForm id={id} />
    </OutShopLayout>
  );
};

export default ResetPassword;

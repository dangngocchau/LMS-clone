import { useAppSelector } from '@/app/hooks/reduxHook';

export default function userAuth() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return true;
  } else {
    return false;
  }
}

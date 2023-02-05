import { useContext } from 'react';
import TalentLayerContext from '../../context/talentLayer';
import useUserById from '../../hooks/useUserById';
import { IUser } from '../../types';
import useLensFeed from '../../hooks/useLensFeed';
import useLensUser from '../../hooks/useLensUsers';
import { useEnsAvatar } from 'wagmi';
import { readableIpfsUrl } from '../../utils/ipfs';
import Loading from '../Loading';
import { formatStringDate } from '../../utils/dates';

function LensFeed({ user }: { user: IUser }) {
  const { user: currentUser } = useContext(TalentLayerContext);
  let currentUserAddress = currentUser?.address.toString() || '';
  const userById = useUserById(user?.id);

  // we get Lens user details
  const { lensUser } = useLensUser(currentUserAddress);

  // we get Lens user details
  const { lensFeed } = useLensFeed(lensUser?.id || '');

  // get the default avatar in case of the Lens post has no picture
  const { data: avatarImage } = useEnsAvatar();

  // We format the Lens post Date
  const readableDate = formatStringDate(lensFeed?.createdAt || '');
  console.log('test', readableDate);

  return (
    <>
      {lensUser?.id && (
        <div className='card bg-white shadow-xl hover:shadow border border-gray-200 rounded-xl ml-5'>
          {lensFeed?.metadata.media.original ? (
            <img
              className='w-32 mx-auto rounded-full border-8 border-white'
              src={lensFeed?.metadata.media.original.url}
              alt=''></img>
          ) : (
            <img
              className='w-32 mx-auto  border-8 border-white'
              src={`/default-avatar-${Number(user?.id ? user.id : '1') % 11}.jpeg`}
              alt=''></img>
          )}

          <div className='text-center text-gray-900 font-medium'>{lensFeed?.metadata.name}</div>
          <div className='text-center mt-2 font-light text-sm'>
            {lensFeed?.metadata.description}
          </div>
          <div className='px-6 text-center mt-2 font-light text-sm'>
            <p>{readableDate}</p>
          </div>
        </div>
      )}
    </>
  );
}
export default LensFeed;

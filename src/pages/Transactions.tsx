import { useContext } from 'react';
import Steps from '../components/Steps';
import UserDetail from '../components/UserDetail';
import UserPayments from '../components/UserPayments';
import UserProposals from '../components/UserProposals';
import UserServices from '../components/UserServices';
import TalentLayerContext from '../context/talentLayer';

function Transactions() {
  const { account, user } = useContext(TalentLayerContext);

  return (
    <div className='max-w-7xl mx-auto text-gray-900 sm:px-4 lg:px-0'>
      <p className='text-5xl font-medium tracking-wider mb-8'>
        Your <span className='text-indigo-600'>Transactions summary</span>
      </p>

      <Steps targetTitle={'Access your dashboard'} />

      {account?.isConnected && user && (
        <div>
          <div className='mb-6'>
            <h2 className='mb-6 pb-4 border-b border-gray-gray-200 text-gray-900 font-medium'>
              Your profile
            </h2>
            <UserDetail user={user} />
          </div>
          <div className='mb-6'>
            <UserPayments user={user} />
          </div>
          <div className='mb-6'>
            <UserServices user={user} type='buyer' />
          </div>
          <div className='mb-6'>
            <UserServices user={user} type='seller' />
          </div>
          <div className='mb-6'>
            <UserProposals user={user} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;

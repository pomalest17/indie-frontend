// pages/api/createService.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Contract, ethers, Wallet } from 'ethers';
import { config } from '../../../config';
import TalentLayerService from '../../../contracts/ABI/TalentLayerService.json';
import { getUserByAddress } from '../../../queries/users';
import { getServiceSignature } from '../../../utils/signature';
import { handleDelegateActivation } from './getDelegationSigner';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, userAddress, cid } = req.body;

  let signer;

  // @dev : you can add here all the check you need to confirm the delagation for a user

  try {
    const signer = await handleDelegateActivation(userAddress, res);
    if (!signer) {
      return;
    }

    const signature = await getServiceSignature({ profileId: Number(userId), cid });
    const serviceRegistryContract = new Contract(
      config.contracts.serviceRegistry,
      TalentLayerService.abi,
      signer,
    );

    const transaction = await serviceRegistryContract.createService(
      userId,
      process.env.NEXT_PUBLIC_PLATFORM_ID,
      cid,
      signature,
    );

    res.status(200).json({ transaction: transaction });
  } catch (error) {
    console.log('errorDebug', error);
    res.status(500).json('tx failed');
  }
}

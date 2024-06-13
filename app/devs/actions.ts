'use server';
import dbConnect from 'src/lib/dbConnect';
import ProfileModel from 'src/models/profile';

export async function getProfiles(
  query: string,
  currentPage: number,
  perPage: number,
  filter: {
    [key: string]: any;
  }
) {
  const resultsPerPage = perPage || 32;
  const skip = currentPage * resultsPerPage - resultsPerPage;
  const filterQuery = {
    $or: [
      { username: { $regex: query, $options: 'i' } },
      { 'user.name': { $regex: query, $options: 'i' } },
    ],
  } as unknown as any;
  await dbConnect();
  const profiles = await ProfileModel.find(filterQuery)
    .populate('user', 'username name profilePicture')
    .populate('following', 'username name profilePicture')
    .populate('followers', 'username name profilePicture')
    .exec();

  return JSON.parse(JSON.stringify(profiles));
}

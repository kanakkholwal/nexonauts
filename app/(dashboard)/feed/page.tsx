import CreateProfile from 'app/(dashboard)/components/create-profile';
import { getSession } from 'src/lib/auth';
import { sessionType } from 'src/types/session';

export default async function FeedPage() {
  const session = (await getSession()) as sessionType;

  console.log(session);
  if (!session.user.profile) {
    return (
      <div className="space-y-6 my-5">
        <h2 className="text-3xl font-semibold">Your Feed</h2>
        <div className="flex justify-center items-center w-full">
          <CreateProfile />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 my-5">
      <h2 className="text-3xl font-semibold">Your Feed</h2>
    </div>
  );
}

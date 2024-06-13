import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FollowToggle } from './follow-btn';

export default function FollowerFollow({
  developer,
  followUnfollowUser,
  isFollowing,
}) {
  return (
    <div className="flex flex-row items-center justify-start space-x-2">
      <Dialog key={'followers-modal'}>
        <DialogTrigger asChild>
          <span className="text-gray-600 hover:text-foreground cursor-pointer">
            {developer.followers.length} followers
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Followers ({developer.followers.length})</DialogTitle>
            <DialogDescription>
              {developer.username}'s followers
            </DialogDescription>
          </DialogHeader>
          <ul className="flex flex-col gap-2">
            {developer.followers.map((follower) => {
              return (
                <li key={'follower_' + follower.id}>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={follower.profilePicture}
                          alt={follower.username}
                        />
                        <AvatarFallback className="capitalize">
                          {follower.username[0] + follower.username[1]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {follower.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          @{follower.username}
                        </p>
                      </div>
                    </div>

                    <FollowToggle
                      isFollowing={isFollowing}
                      followUser={followUnfollowUser.bind(
                        this,
                        developer.username
                      )}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          {developer.followers.length === 0 && (
            <p className="text-slate-500 font-medium text-center">
              No followers yet
            </p>
          )}
        </DialogContent>
      </Dialog>

      <span className="text-gray-500">|</span>
      <Dialog key={'following-modal'}>
        <DialogTrigger asChild>
          <span className="text-gray-500 hover:text-foreground cursor-pointer">
            {developer.following.length} following
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Following ({developer.following.length})</DialogTitle>
            <DialogDescription>
              {developer.username}'s following
            </DialogDescription>
          </DialogHeader>
          <ul className="flex flex-col gap-2">
            {developer.following.map((following) => (
              <li key={'following_' + following._id}>
                <div className="flex flex-row items-center justify-start space-x-2">
                  <Avatar className="w-8 h-8 shadow-lg">
                    <AvatarImage
                      src={following.profilePicture}
                      alt={following.username}
                      width={320}
                      height={320}
                      className="w-8 h-8"
                    />
                    <AvatarFallback className="w-8 h-8 uppercase text-xl">
                      {following.username[0] + following.username[1]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start justify-center space-y-1">
                    <h5 className="text-slate-600 font-semibold">
                      {following.name}
                    </h5>
                    <p className="text-gray-500 dark:text-slate-400">
                      @{following.username}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {developer.following.length === 0 && (
            <p className="text-slate-500 font-medium text-center">
              No following yet
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}


import { Suspense } from "react";
import SideBarPostCard from "../../../src/layouts/blog/sidenavPostCard";


export function SideBar({recentPosts}) {

  
  
    const renderPosts = (postArray) => {

      return <Suspense  fallback={<div>Loading...</div>}>
    
      {postArray.map((post, index) => (
        <SideBarPostCard key={index} post={post} />
      ))}
    </Suspense>
    };
  
    return (
      <aside className="w-full lg:w-lg flex-1">
        {/* <div className="mb-4">
          <h5 className="uppercase text-lg font-semibold ml-2">Popular Posts</h5>
          <div>{renderPosts(posts.popularPosts)}</div>
        </div> */}
        <div>
          <h5 className="uppercase text-lg font-semibold ml-2">Recent Posts</h5>
          <div>{renderPosts(recentPosts)}</div>
    
        </div>
      </aside>
    );
  }
  
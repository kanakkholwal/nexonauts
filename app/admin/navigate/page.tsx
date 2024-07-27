import Link from "next/link";

const links = [
  {
    title: "Deploymemt Dashboard",
    description: "Deployment and hosting for Application",
    url: "https://vercel.com/dashboard",
  },
  {
    title: "Github Repository",
    description: "Source code for this project",
    url: "https://github.com/kanakkholwal/nexonauts",
  },
];

export default async function NavigationPage() {
  return (
    <div className="space-y-6 my-5">
      <h1 className="text-3xl font-bold">Quick Links</h1>

      <div className="grid grid-cols-1 gap-2">
        {links.map((link, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-1 gap-1 bg-glasss p-3 rounded-xl"
            >
              <h3 className="text-lg font-bold">{link.title}</h3>
              <Link
                href={link.url}
                className="text-sm font-medium hover:underline text-primary"
                target="_blank"
              >
                Go to {link.title}
              </Link>
              <p className="text-sm text-gray-500">{link.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

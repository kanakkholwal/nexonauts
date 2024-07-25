import SoftNavigation from "./components/navigation";

type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function FeedLayout({ children }: LayoutProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <SoftNavigation />
      {children}
    </div>
  );
}

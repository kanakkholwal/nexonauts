import SoftNavigation from "./components/navigation";


type LayoutProps = Readonly<{
    children: React.ReactNode;
  }>;
  
export default function FeedLayout({ children }: LayoutProps) {


    return (<>
        <SoftNavigation />
        {children}
    
    </>)
}
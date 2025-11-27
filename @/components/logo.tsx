import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { appConfig, } from "@root/project.config";



export function AppLogo({
  className,
  showLogo = false,
}: {
  className?: string;
  showLogo?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 justify-center items-center mx-auto ",
        className
      )}
    >
      {showLogo ? (
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src="/logo-square.webp" alt={appConfig.name} />
          <AvatarFallback className="flex items-center justify-center rounded-lg text-3xl font-bold text-center relative bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent hover:from-sky-500 hover:to-primary whitespace-nowrap">
            {appConfig.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ) : (
        <h1 className="text-2xl md:text-7xl font-bold text-center relative bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent hover:from-sky-500 hover:to-primary whitespace-nowrap">
          {appConfig.name}
        </h1>
      )}
      <h2 className="text-md md:text-xl font-semibold capitalize text-muted-foreground text-center">
        {appConfig.name}
      </h2>
    </div>
  );
}
export function ResponsiveAppLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0 justify-center items-center mx-auto ",
        className
      )}
    >
      <h1 className="text-3xl font-bold text-center relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary whitespace-nowrap">
        {appConfig.name}
      </h1>
      <h2 className="text-base font-semibold capitalize text-center">
        {appConfig.name}
      </h2>
    </div>
  );
}

export function ApplicationInfo({
  className,
  children,
  imgClassName,
}: {
  className?: string;
  children?: React.ReactNode;
  imgClassName?: string;
}) {
  return (
    <div className={cn("inline-flex gap-2", className)}>
      <ApplicationSvgLogo className={cn("size-8", imgClassName)} aria-label={appConfig.name} />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{appConfig.name}</span>
        <span className="truncate text-xs text-muted-foreground font-medium">
          {appConfig.appDomain}
        </span>
      </div>
      {children}
    </div>
  );
}
export function ApplicationSquareLogo({
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Avatar className={cn("inline-flex gap-2 size-8 rounded-lg", className)}>
      <AvatarImage src="/logo-square.webp" alt={appConfig.name} />
      <AvatarFallback className="flex items-center justify-center rounded-lg text-3xl font-bold text-center relative bg-linear-to-r from-primary to-sky-500 bg-clip-text text-transparent hover:from-sky-500 hover:to-primary whitespace-nowrap">
        {appConfig.name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}


export function ApplicationSvgLogo(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" data-logo="logo" viewBox="0 0 41 41" {...props}>
    <path
      id="logogram"
      style={{
        fill: "var(--primary, #7F57F1)"
      }}
      d="M12 57H18V28.9014L12 20.662V57ZM46 7.07042V45.9437L16.6667 7H12V10.8028L18 18.831L46.9333 57H52V7.07042H46Z"

    ></path>
  </svg>
}
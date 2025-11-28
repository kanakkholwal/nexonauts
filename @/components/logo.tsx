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
  return <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" style={{
    fill: "var(--primary,currentColor)"
  }} {...props}>
    <path d="M417.43,339.15c-2-2-9.26-.15-15.43-2.15l-68.68-1a11,11,0,0,0-11,10.91V684L205.2,448.53V269.68c0-27.71,22.71-50.17,50.72-50.17H437" />
    <path d="M322.06,767.24q.39-176.62.21-353.24H205.2c0,123.52,0,213.68.16,357.76,0,10.34-2.07,18.36-9.1,26.78-20.08,24-25.62,52.2-17.5,82.47a91.85,91.85,0,0,0,80.58,67.5c38,3.51,74.77-17.43,91.4-52,16.81-35,10.16-75-18.61-104.49C324.91,784.56,322,777.46,322.06,767.24Z" />
    <path d="M626.3,396.92c-.06-5.19-4.19-11.3-8.13-15.32-49.85-51-100.13-101.52-149.95-152.53-6.86-7-13.87-9.6-23.56-9.56-17.35.09-31,.14-42.66.17V337.09c6.06,1.16,12.51,4.26,16.56,8.31l198.68,203a5.11,5.11,0,0,0,9.13-1.34,4.76,4.76,0,0,0,.18-1.36C626.63,496.08,626.89,446.49,626.3,396.92Z" />
    <path d="M661.41,788.26c2,2,9.26.15,15.43,2.15l68.68,1a11,11,0,0,0,11-10.91V443.41L873.64,678.88V857.73c0,27.71-22.71,50.16-50.72,50.16H641.84" />
    <path d="M756.78,360.17q-.39,176.61-.21,353.24H873.63c0-123.52,0-213.68-.15-357.76,0-10.34,2.07-18.36,9.1-26.79,20.08-24,25.62-52.2,17.5-82.47A91.86,91.86,0,0,0,819.5,178.9c-38-3.51-74.77,17.42-91.4,52-16.81,35-10.16,75,18.6,104.49C753.93,342.84,756.8,350,756.78,360.17Z" />
    <path d="M452.54,730.49c.06,5.19,4.19,11.29,8.13,15.32,49.85,51,100.13,101.52,149.94,152.53,6.87,7,13.88,9.6,23.56,9.55,17.36-.08,31-.13,42.67-.16V790.32c-6.06-1.16-12.51-4.27-16.56-8.31l-198.68-203a5.11,5.11,0,0,0-9.13,1.34,4.72,4.72,0,0,0-.18,1.36C452.21,631.33,452,680.91,452.54,730.49Z" />
  </svg>
}
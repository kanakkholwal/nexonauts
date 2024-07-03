"use client";
import React, {
  ReactElement,
  ReactNode,
  Suspense,
  useEffect,
  useState,
} from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactElement;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
}) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const errorHandler = (ev: ErrorEvent) => {
      setError(ev.error);
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  useEffect(() => {
    const unhandledRejectionHandler = (ev: PromiseRejectionEvent) => {
      setError(ev.reason);
    };

    window.addEventListener("unhandledrejection", unhandledRejectionHandler);

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        unhandledRejectionHandler
      );
    };
  }, []);

  if (error) {
    return fallback;
  }

  return <>{children}</>;
};

interface SuspenseWithErrorBoundaryProps extends React.SuspenseProps {
  errorFallback: ReactElement;
}
export const SuspenseWithErrorBoundary: React.FC<
  SuspenseWithErrorBoundaryProps
> = ({ children, fallback, errorFallback }) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

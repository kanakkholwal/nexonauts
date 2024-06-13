import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { RiShareCircleFill } from 'react-icons/ri';

export function ToolCard({
  title,
  description,
  path,
  style,
}: {
  title: string;
  description: string;
  path: string;
  style?: Record<string, any>;
}) {
  return (
    <Card
      className="border-border hover:border-primary flex flex-col items-start"
      variant="glass"
      style={style}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-start grow">
        <CardDescription className="line-clamp-3 mb-3">
          {description}
        </CardDescription>
        <Link
          href={path}
          className="mt-auto flex gap-2 items-center text-primary hover:underline"
        >
          Try this Tool
          <RiShareCircleFill />
        </Link>
      </CardContent>
    </Card>
  );
}

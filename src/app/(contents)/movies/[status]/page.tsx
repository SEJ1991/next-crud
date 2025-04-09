import { PageFrame } from '@/shared';

interface Props {
  params: Promise<{ status: string }>;
}
export default async function MoviesByStatusPage({ params }: Props) {
  const status = (await params).status;
  return <PageFrame>{status}</PageFrame>;
}

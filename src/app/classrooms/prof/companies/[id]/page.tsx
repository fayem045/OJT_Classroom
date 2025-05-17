import CompanyClassroomDetailsClient from './CompanyClassroomDetailsClient';

export default async function CompanyClassroomDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <CompanyClassroomDetailsClient id={params.id} />;
} 
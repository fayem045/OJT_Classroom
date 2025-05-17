import EditCompanyClassroomClient from './EditCompanyClassroomClient';

export default async function EditCompanyClassroomPage({
  params,
}: {
  params: { id: string };
}) {
  return <EditCompanyClassroomClient id={params.id} />;
} 
interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  
  return (
    <div>
      <h1>Détails du projet ID : {resolvedParams.id}</h1>
    </div>
  );
}
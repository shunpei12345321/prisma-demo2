import EditScreen from "./_components/EditScreen";

export default async function EditUserPage({ params }) {
  const userId = Number(params.id);
  return <EditScreen userId={userId} />;
}
// .eslintrc.jsを作成して、"noImplicitAny": falseにした

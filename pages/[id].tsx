import { useRouter } from "next/router";

import PdvButton from "@Uikit/PdvButton";
import PdvSkeleton from "@Uikit/PdvSkeleton";
import { useSchoolQuery } from "hooks/request/schoolQuery";
import Form from "components/Form/Form";

const EditSchool = () => {
  const {
    query: { id },
  } = useRouter();

  const { data: school, isLoading } = useSchoolQuery(id as string);

  if (isLoading) return <PdvSkeleton variant="text" rows={10} />;

  return (
    <>
      <PdvButton
        icon="KeyArrowLeft"
        className="mb-5 mt-3"
        theme="indigo-500"
        size="small"
        asLink
        href={"/"}
      >
        Volver
      </PdvButton>

      <Form />
    </>
  );
};

export default EditSchool;

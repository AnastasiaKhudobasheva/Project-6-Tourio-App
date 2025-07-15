import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../../components/Form";
import { StyledLink } from "../../../components/StyledLink";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const {
    data: place,
    isLoading,
    error,
  } = useSWR(id ? `/api/places/${id}` : null);

  async function editPlace(updatedData) {
    try {
      const response = await fetch(`/api/places/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Update failed");

      router.push(`/places/${id}`);
    } catch (err) {
      console.error("Failed to update:", err);
    }
  }

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading place</h2>;
  if (!place) return <h2>Place not found</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <StyledLink href={`/places/${id}`} $justifySelf="start">
        back
      </StyledLink>
      <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
    </>
  );
}

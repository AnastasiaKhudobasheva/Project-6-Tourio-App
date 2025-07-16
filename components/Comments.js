import styled from "styled-components";
import { useRouter } from "next/router";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton";
import useSWR from "swr";
import { Fragment } from "react";
import { useState } from "react";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 0.5rem;
  text-align: center;
`;

const CommentText = styled.p`
  border-bottom: solid 1px black;
  padding: 20px;
`;

export default function Comments({ locationName }) {
  const router = useRouter();
  const { isReady, query } = router;
  const { id } = query;

  const {
    data: comments,
    mutate,
    isLoading,
    error,
  } = useSWR(isReady ? `/api/comments/${id}` : null);

  const [formData, setFormData] = useState({ name: "", comment: "" });

  async function handleSubmitComment(event) {
    event.preventDefault();

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, placeId: id }),
    });

    if (!res.ok) {
      console.error("Failed to submit comment");
      return;
    }

    await mutate(); // re-fetch comments
    setFormData({ name: "", comment: "" });
  }

  async function handleDeleteComment(commentId) {
    const confirmed = confirm("Delete this comment?");
    if (!confirmed) return;

    // to update API to support deletion of a *single* comment
    const res = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Failed to delete comment");
      return;
    }

    await mutate(); // re-fetch comments
  }

  if (!isReady || isLoading) return <h3>Loading comments...</h3>;
  if (error) return <h3>Error loading comments</h3>;

  return (
    <Article>
      <FormContainer onSubmit={handleSubmitComment}>
        <Label htmlFor="name">Your Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Label htmlFor="comment">Your Comment</Label>
        <Input
          type="text"
          name="comment"
          placeholder="comment here..."
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
          required
        />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>

      {comments && (
        <>
          <h2>{comments.length} fan(s) commented on this place:</h2>
          {comments.map(({ _id, name, comment }) => (
            <Fragment key={_id}>
              <CommentText>
                <small>
                  <strong>{name}</strong> commented on {locationName}
                </small>
              </CommentText>
              <span>{comment}</span>
              <StyledButton onClick={() => handleDeleteComment(_id)}>
                X
              </StyledButton>
            </Fragment>
          ))}
        </>
      )}
    </Article>
  );
}

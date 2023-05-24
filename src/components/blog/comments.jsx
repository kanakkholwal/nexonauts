import styled from "styled-components";
import { Input, TextArea, FormElement, Label } from "components/form-elements";
import { timeAgo } from "lib/scripts";
import Button from "components/buttons";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";

const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 20px;
  border-top: 1px solid rgba(var(--mute-rgb), 0.25);
`;
const AddReplyButton = styled(Button)`
font-size:0.75rem;
padding: 0.25rem 0.5rem;
margin: 0.5rem 0;
line-height:1;
`;
const ToggleReplyButton = styled(Button)`
font-size:0.75rem;
padding: 0.25rem 0.5rem;
margin: 0.5rem 0;
line-height:1;
`;
const CommentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  &:not(:last-child){
    border-bottom: 1px solid rgba(var(--mute-rgb), 0.25);
  }
  padding-bottom:0.75rem;
`;
const CommentCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;
const CommentHeader = styled.div`
  display: flex;
  align-items:center;
  justify-content:space-between;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
`;
const CommentBody = styled.p`
  width: 100%;
  padding:0.75rem 0.5rem;
  text-align: initial;
  background:rgb(231 232 239);
  border-radius:0.5rem;
`;
const RepliesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  overflow: hidden;
  margin-left:1rem;
  border-left: 1px solid rgba(var(--mute-rgb), 0.25);
  padding-left:0.75rem;

    position: relative;
    height: 0;
    transition: height .5s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    &.isOpen{
            height: auto;
    } 
`;
const ReplyForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  overflow: hidden;
    position: relative;
    height: 0;
    transition: height .5s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    &.isOpen{
            height: auto;
    } 
`;
const fetchData = async (url, data) => {
  const response = await axios.post(url, data);
  return response.data;
};

export default function Comments({ post }) {
  const { comments } = post;
  const { data, error, isLoading } = useSWR([`/api/posts/${post._id}/comments/all`,{}], ([url, data]) => fetchData(url, data));
  const [allComments, setAllComments] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const newComment = {
      name: name,
      email: email,
      comment: comment,
    };

    try {
      const response = await axios.post(`/api/posts/${post._id}/comments`, newComment);
      console.log(response.data);

      // Reset the form fields
      setName('');
      setEmail('');
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    if (data)
      if (data !== allComments) {
        setAllComments(data);
      }
  }, [data]);

  return (
    <CommentSection id="comments">
      {comments.enabled === false ? <h5>Comments are disabled for this post</h5> : <h5>Comments</h5>}
      {isLoading ? <h6>Loading...</h6> : null}
      {error ? <h6>Something went wrong</h6> : null}
      {allComments && allComments?.map((comment, index) => {
        return <Comment key={comment._id} comment={comment} postId={post._id} />;
      })}
      {comments.enabled === true ? (
        <>
          <h5>Leave a comment</h5>
          <form onSubmit={handleCommentSubmit}>
            <FormElement>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormElement>
            <FormElement>
              <Label htmlFor="name">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormElement>
            <FormElement>
              <Label htmlFor="name">Your comment</Label>
              <TextArea
                placeholder="Your comment"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </FormElement>
            <Button type="submit">Submit Comment</Button>
          </form>
        </>
      ) : null}
    </CommentSection>
  );
}

function Comment({ comment, postId }) {
  const [replyName, setReplyName] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const repliesRef = useRef(null);
  const replyFormRef = useRef(null);
  const handleReply = async (event, commentId) => {
    event.preventDefault();
    const nestedComment = {
      name: replyName,
      email: replyEmail,
      comment: replyComment,
    };

    try {
      const response = await axios.post(`/api/posts/${postId}/comments/${commentId}/replies`, nestedComment);
      console.log(response.data);

      // Reset the form fields
      setReplyName('');
      setReplyEmail('');
      setReplyComment('');
    } catch (error) {
      console.error('Error adding reply:', error);
    }

    // Reset the reply form fields
    setReplyName('');
    setReplyEmail('');
    setReplyComment('');
    setShowReplyForm(false);
  };

  return (
    <>
      <CommentWrapper id={comment._id} ariaLabelledBy={comment.parentComment ? comment.parentComment : "none"}>
        <CommentCard>
          <CommentHeader>
            <div>
              <h6>{comment.name}</h6>
            </div>
            <div>
              <span>{timeAgo(new Date(comment.createdAt))}</span>
            </div>
          </CommentHeader>
          <CommentBody>{comment.comment}</CommentBody>
        </CommentCard>
        <div className="d-flex align-items-center justify-content-start g-3">
          <AddReplyButton size="sm" level="true" onClick={() => setShowReplyForm(!showReplyForm)}>
            Reply
          </AddReplyButton>
          {comment.replies.length > 0 ? (
            <ToggleReplyButton size="sm" level="true" onClick={() => setShowReply(!showReply)}>
              {showReply ? 'Hide Replies' : `Show ${comment.replies.length} Replies`}
            </ToggleReplyButton>
          ) : null}
        </div>

        <ReplyForm onSubmit={(event) => handleReply(event, comment._id)}
          ref={replyFormRef}
          className={`Collapse ${showReplyForm ? "isOpen" : ""}`}
          style={
            showReplyForm
              ? { height: replyFormRef.current?.scrollHeight + "px" }
              : { height: "0px" }
          }>

          <FormElement>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              placeholder="Name"
              value={replyName}
              onChange={(e) => setReplyName(e.target.value)}
              required
            />
          </FormElement>
          <FormElement>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              value={replyEmail}
              onChange={(e) => setReplyEmail(e.target.value)}
              required
            />
          </FormElement>
          <FormElement>
            <Label htmlFor="name">Your Reply</Label>
            <TextArea
              placeholder="Your Reply"
              value={replyComment}
              onChange={(e) => setReplyComment(e.target.value)}
              required
            ></TextArea>
          </FormElement>

          <Button type="submit">Submit Reply</Button>
        </ReplyForm>

        <RepliesWrapper
          ref={repliesRef}

          className={`Collapse ${showReply ? "isOpen" : ""}`}
          style={
            showReply
              ? { height: repliesRef.current?.scrollHeight + "px" }
              : { height: "0px" }
          }>
          {comment.replies.map((reply) => (
            <Comment key={reply._id} comment={reply} postId={postId} />
          ))}
        </RepliesWrapper>
      </CommentWrapper>

    </>
  );
}

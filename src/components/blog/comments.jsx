import styled from "styled-components";
import { Input, TextArea, FormElement, Label } from "components/form-elements";
import { timeAgo } from "lib/scripts";
import Button from "components/buttons";
import { useState, useEffect } from 'react';
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
    <CommentSection>
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
    <div>
      <div className="d-flex justify-content-start align-items-center" id={comment._id} ariaLabelledBy={comment.parentComment ? comment.parentComment : "none"}>
      <div>
        <h6>{comment.name}</h6>
        <p>{comment.name}</p>
      </div>
      <div>
        <span>{timeAgo(new Date(comment.createdAt))}</span>
      </div>
      </div>
      <Button size="sm" level="true" onClick={() => setShowReplyForm(!showReplyForm)}>
        Reply
      </Button>
      {showReplyForm && (
        <form onSubmit={(event) => handleReply(event, comment._id)}>
          <Input
            type="text"
            placeholder="Name"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={replyEmail}
            onChange={(e) => setReplyEmail(e.target.value)}
            required
          />
          <TextArea
            placeholder="Your Reply"
            value={replyComment}
            onChange={(e) => setReplyComment(e.target.value)}
            required
          ></TextArea>
          <Button type="submit">Submit Reply</Button>
        </form>
      )}
      {comment.replies.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          {comment.replies.map((reply) => (
            <Comment key={reply._id} comment={reply} postId={postId} />
          ))}
        </div>
      )}
    </div>
  );
}

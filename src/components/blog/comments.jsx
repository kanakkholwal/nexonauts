import styled from "styled-components";
import { Input, TextArea, FormGroup, FormElement, Label } from "components/form-elements";
import { timeAgo, getDateTime, getInitials } from "lib/scripts";
import { FiMoreVertical } from "react-icons/fi";
import Button from "components/buttons";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";

const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 20px;
  padding-top: 20px;
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
const MoreOptionCommentDiv = styled.div`
position:relative;
display:flex;
align-items:center;
justify-content:center;
padding:0.5rem;
border-radius:50%;
font-size:1rem;
cursor:pointer;
transition:all 0.25s ease-in-out;
user-select:none;
&:hover,&:active{
  background-color:rgba(var(--mute-rgb), 0.15);
}
`;
const MoreOptionCommentUl = styled.div`
position:absolute;
top:calc(100% - 10px);
right:calc(100% - 10px);
display:flex;
align-items:flex-start;
background:#fbfbfb;
transition: all .15s cubic-bezier(0, 0, .2, 1);
overflow: hidden auto;
min-height: 16px;
max-width: 15rem;
outline: 0px;
box-shadow: rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px;
transform-origin:top right;
border-radius:5px;
display:flex;
flex-direction:column;
gap:0.1rem;
span{
  padding:0.25rem 0.75rem;
  font-size:1rem;
  font-weight:500;
  cursor:pointer;
  &:hover,&:active{
    background-color:rgba(var(--mute-rgb), 0.05);
  }
}
${({open}) =>{
  if(open === "true"){
    return `transform:scale(1);`
  }
  return `
    transform:scale(0);
    `
}}
`;

const CommentCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding:0.75rem;
  border-radius:0.75rem;
  ${'' /* border: 1px solid rgba(var(--mute-rgb), 0.25); */}

`;
const CommenterProfile = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  height:50px;
  width:50px;
  overflow:hidden;
  text-align:center;
  background:rgba(var(--theme-rgb),0.1);    
  img{
    object-fit:cover;
    width:100%;
    height:100%;
  }
 
`;
const CommentHeader = styled.div`
  display: flex;
  align-items:center;
  justify-content:flex-start;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  text-align:initial;

  &>div:last-child{
    margin-left:auto;
  }
`;
const CommentBody = styled.p`
  width: 100%;
  padding:0.75rem 0.5rem;
  text-align: initial;
  background:#f3f3f3;
  border-radius:0.5rem;
`;
const RepliesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  overflow: hidden;
  margin-left:1rem;
  padding-inline:0.5rem;
  max-width:calc(100% - 0.5rem);
  
    position: relative;
    height: 0;
    transition: all .5s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    max-height:100%;
    &.isOpen{
            height: auto;
    } 
  ${CommentCard}{
    background: rgba(var(--body-bg-rgb),0.7);
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
  max-height:100%;
  transition: all .5s cubic-bezier(0.4, 0, 0.2, 1);
  padding-inline:20px 0.75rem;
  &.isOpen{
            height: auto;
  } 
`;
const fetchData = async (url, data) => {
  const response = await axios.post(url, data);
  return response.data;
};

export default function Comments({ post }) {
  const { comments, author } = post;
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR([`/api/posts/${post._id}/comments/all`, {}], ([url, data]) => fetchData(url, data));
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
        return <Comment key={comment._id} comment={comment} author={author} postId={post._id} user={session?.user} />;
      })}
      {comments.enabled === true ? (
        <>
          <h5>Leave a comment</h5>
          <form onSubmit={handleCommentSubmit}>
            <FormGroup>
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
            </FormGroup>

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

function Comment({ comment, postId, author, user }) {
  const [replyName, setReplyName] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
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
  const handleDelete = async (commentId) => {

    try {
      const response = await axios.post(`/api/posts/${postId}/comments/${commentId}/delete`, {
        userId: user?.id
      });
      console.log(response.data);

      // Reset the form fields
      setReplyName('');
      setReplyEmail('');
      setReplyComment('');
    } catch (error) {
      console.error('Error adding reply:', error);
    }


  }

  return (
    <>
      <CommentCard id={comment._id} ariaLabelledBy={comment.parentComment ? comment.parentComment : "none"}>
        <CommentHeader>
          <CommenterProfile>
            {getInitials(comment.name)}
          </CommenterProfile>
          <div>
            <h6>{comment.name}</h6>
            <small>{getDateTime(comment.createdAt)}</small>
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <span>{timeAgo(new Date(comment.createdAt))}</span>
            <MoreOptionCommentDiv onClick={() => setShowOptions(!showOptions)}>
              <FiMoreVertical />
              <MoreOptionCommentUl onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}  open={showOptions ? "true" :"false"}>
                <span>
                  Report
                </span>

                {(user?.role === "admin" || user?.id === author?.user?._id) ?
                  <span onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(comment._id)
                  }}>
                    Delete
                  </span> : null}

              </MoreOptionCommentUl>
            </MoreOptionCommentDiv>

          </div>
        </CommentHeader>
        <CommentBody>{comment.comment}

        </CommentBody>

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
        <ReplyForm ariaLabelledBy={comment._id} onSubmit={(event) => handleReply(event, comment._id)}
          ref={replyFormRef}
          className={`Collapse ${showReplyForm ? "isOpen" : ""}`}
          style={
            showReplyForm
              ? {
                minHeight: replyFormRef.current?.scrollHeight + "px",
                height: repliesRef.current?.scrollHeight + "px",
              }
              : {
                height: "0px",
                minHeight: "0px",
              }
          }>
          <FormGroup>
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
          </FormGroup>

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
              ? {
                minHeight: repliesRef.current?.scrollHeight + "px",
                height: repliesRef.current?.scrollHeight + "px"
              }
              : {
                //  height: "0px",
                minHeight: "0px",
              }
          }>
          {comment.replies.map((reply) => (
            <Comment key={reply._id} comment={reply} postId={postId} />
          ))}
        </RepliesWrapper>
      </CommentCard>


    </>
  );
}

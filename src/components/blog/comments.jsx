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
import toast, { Toaster } from 'react-hot-toast';

const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(var(--mute-rgb), 0.25);
`;
const InsertReply = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding:0.5rem 0.75rem;
  border-radius:0.75rem;
  cursor:pointer;
  background:rgba(var(--secondary-rgb),0.071);
  &:hover{
    background:rgba(var(--secondary-rgb),0.091);
  }
  span{
    margin-left:0.5rem;
    font-size:1rem;
    font-weight:500;
  }
`;
const CommentForm = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding:0.75rem;
  border-radius:0.75rem;
  background:rgba(var(--secondary-rgb),0.051);
  span{
    margin-left:0.5rem;
    font-size:1rem;
    font-weight:500;
  }
  .elements{
    width:100%;
  }
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
    background-color:rgba(var(--secondary-rgb), 0.05);
    color:rgba(var(--secondary-rgb), 1);
  }
}
${({ open }) => {
    if (open === "true") {
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
  mix-blend-mode: multiply;
  background:rgba(var(--${({ nature }) => nature ? nature : "theme"}-rgb),0.1);
  color:rgba(var(--${({ nature }) => nature ? nature : "theme"}-rgb),1);   
  img{
    object-fit:cover;
    width:100%;
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
  max-width:calc(100% - 1.5rem);
  margin-inline:auto;
  padding:0.75rem 0.5rem;
  text-align: initial;
  background:rgba(var(--grey-rgb),0.075);
  border-radius:0.5rem;
`;
const CommentFooter = styled.div`
  width: 100%;
  display: flex;
  align-items:center;
  justify-content:flex-start;
  gap: 0.5rem;
  padding:0 0.75rem;
  &>span{
    font-size:0.825rem;
    font-weight:500;
    color:rgba(var(--grey-rgb),1);
    &.info{
      border-left:1px solid rgba(var(--grey-rgb),0.25);
      padding-left:0.5rem;
      margin-left:0.5rem;

    }
  }
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
  const { data, error, isLoading } = useSWR([`/api/posts/${post._id}/comments/all`, {}], ([url, data]) => fetchData(url, data), {
    refreshInterval: 1000,
    revalidate: true,
  });
  const [allComments, setAllComments] = useState([]);
  const [canComment, setCanComment] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const newComment = {
      name: session?.user?.name ? session?.user?.name : name,
      email: session?.user?.email ? session?.user?.email : email,
      comment: comment,
      user: session?.user?.id || null,
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
      {comments.enabled === true ? (<CommentFormComponent placeholder={<>Leave a comment {session?.user ? <>as <strong>{session?.user?.name}</strong></> : null}</>} canComment={canComment} setCanComment={setCanComment} handleCommentSubmit={handleCommentSubmit} session={session} name={name} email={email} setEmail={setEmail} setName={setName} comment={comment} setComment={setComment} />) : null}

      {allComments && allComments?.map((comment, index) => {
        return <Comment key={comment._id} comment={comment} author={author} postId={post._id} session={session} index={index} />;
      })}

    </CommentSection>
  );
}

function Comment({ index, comment, postId, author, session }) {
  const user = session?.user;
  const [replyName, setReplyName] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleReply = async (event, commentId) => {
    event.preventDefault();
    const nestedComment = {
      name: session?.user?.name ? session?.user?.name :replyName,
      email:session?.user?.email ? session?.user?.email : replyEmail,
      comment: replyComment,
      user: session?.user?.id || null,
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
          <CommenterProfile nature={["success", "theme", "warning", "info", "secondary", "dark"][index % 6]}>
            {getInitials(comment.name)}
          </CommenterProfile>
          <div>
            <h6>{comment.name}</h6>
            <small>{getDateTime(comment.createdAt)}</small>
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <MoreOptionCommentDiv onClick={() => setShowOptions(!showOptions)}>
              <FiMoreVertical />
              <MoreOptionCommentUl onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }} open={showOptions ? "true" : "false"}>
                <span>
                  Report
                </span>

                {(user?.role === "admin" || user?.id === author?.user?._id) ?
                  <span onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toast.promise(handleDelete(comment._id), {
                                    loading: 'Deleting comment to the post...',
                                    success: "Comment deleted Successfully",
                                    error: "Error deleting the Comment!!",
                                })
                  }}>
                    Delete
                  </span> : null}

              </MoreOptionCommentUl>
            </MoreOptionCommentDiv>
            </div>
        </CommentHeader>
        <CommentBody>{comment.comment}</CommentBody>
        <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
        <CommentFooter>
          <span className="ms-auto">{timeAgo(new Date(comment.createdAt))}</span>
          {comment.replies.length > 0 ? (<span className="info">{comment.replies.length} Replies
            </span>) : <span className="info">No reply</span>}

        </CommentFooter>

        <RepliesWrapper ariaLabelledBy={comment._id} >
        <CommentFormComponent canComment={showReplyForm} setCanComment={setShowReplyForm} placeholder={<>Add a reply {session?.user ? <>as <strong>{session?.user?.name}</strong></> : null}</>}
          handleCommentSubmit={(event) => handleReply(event, comment._id)} session={session}
          name={replyName} email={replyEmail} setEmail={setReplyEmail} setName={setReplyName} comment={replyComment} setComment={setReplyComment} />
          {comment.replies.map((reply) => (
            <Comment key={reply._id} comment={reply} author={author} postId={postId} session={session} index={index}/>
          ))}
        </RepliesWrapper>
      </CommentCard>


    </>
  );
}
function CommentFormComponent({
  canComment,
  setCanComment,
  handleCommentSubmit,
  session,
  name,
  setName,
  email,
  setEmail,
  comment,
  setComment,
  placeholder
}) {
  return (<>

    {!canComment
      ?
      <InsertReply onClick={() => setCanComment(!canComment)}>
        <CommenterProfile nature={["success", "theme", "warning", "info", "secondary", "dark"][69 % 6]}>
          {session?.user ?
            session?.user?.profileURL ?
              <Image src={session?.user?.profileURL} alt={session?.user?.name} width={46} height={46} /> : getInitials(session?.user?.name)
            : "A"
          }
        </CommenterProfile>
        <span> {placeholder ? placeholder : "Leave a comment"}</span>
      </InsertReply> :
      <CommentForm onSubmit={(event) => toast.promise(handleCommentSubmit(event), {
                                    loading: 'Adding comment to the post...',
                                    success: "Comment added Successfully",
                                    error: "Error creating the Comment!!",
                                })}>
        <CommenterProfile nature={["success", "theme", "warning", "info", "secondary", "dark"][69 % 6]}>
          {session?.user ?
            session?.user?.profileURL ?
              <Image src={session?.user?.profileURL} alt={session?.user?.name} width={46} height={46} /> : getInitials(session?.user?.name)
            : "A"
          }
        </CommenterProfile>
        <div className="elements">
          {session?.user ? null :
            <FormGroup>

              <FormElement>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  nature="secondary"

                />
              </FormElement>

              <FormElement>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  nature="secondary"

                />
              </FormElement>



            </FormGroup>
          }
          <FormElement>
            <Label htmlFor="message" hidden>Your comment</Label>
            <TextArea
              id="message"
              placeholder="Leave a comment"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              nature="secondary"
            />
          </FormElement>
          <div className="d-flex justify-content-start align-items-center g-2">
          <Button type="submit" low="true"  size="sm" nature="secondary">Submit Comment</Button>
          <Button type="reset" low="true"  size="sm"   nature="secondary" onClick={() =>setCanComment(false)} level="true">Cancel</Button>
          </div>
        </div>
      </CommentForm>
    }
    <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
  </>)

}

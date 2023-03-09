import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  background-color: white;
  padding: 5px;
`;

const Comments = ({ videoId }) => {

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/comments/${videoId}`);
        setComments(res.data);
      } catch (err) { }
    };
    fetchComments();
  }, [videoId, comments]);

  //TODO: ADD NEW COMMENT FUNCTIONALITY
  const handleComment = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/comments/`, { desc, videoId, token: localStorage.getItem("access_token") });
      setDesc("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input placeholder="Add a comment..." onChange={(e) => setDesc(e.target.value)} />
        <Button onClick={handleComment}>Post</Button>
      </NewComment>
      {
        comments.map((comment) => (
          <Comment key={comment?._id} comment={comment}/>
        ))
      }

    </Container>
  );
};

export default Comments;

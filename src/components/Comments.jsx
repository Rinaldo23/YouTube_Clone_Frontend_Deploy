import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

  // const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState("");

  const { isLoading, error, data } = useQuery(["comments"], () =>
    axios.get(`${process.env.REACT_APP_BASE_URL}/comments/${videoId}`).then((res) => {
      return res.data;
    })
  );


  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return axios.post(`${process.env.REACT_APP_BASE_URL}/comments/`, newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleComment = async (e) => {
    e.preventDefault();
    if (desc !== "") {
      mutation.mutate({ desc, videoId, token: localStorage.getItem("access_token") });
      setDesc("");
    }
  }

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/comments/${videoId}`);
  //       setComments(res.data);
  //     } catch (err) { }
  //   };
  //   fetchComments();
  // }, [videoId, comments]);

  //TODO: ADD NEW COMMENT FUNCTIONALITY
  // const handleComment = async () => {
  //   try {
  //     await axios.post(`${process.env.REACT_APP_BASE_URL}/comments/`, { desc, videoId, token: localStorage.getItem("access_token") });
  //     setDesc("")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input placeholder="Add a comment..." value={desc} onChange={(e) => setDesc(e.target.value)} />
        <Button onClick={handleComment}>Post</Button>
      </NewComment>
      {
        // console.log(data)
        data?.map((comment) => (
          <Comment key={comment?._id} comment={comment} />
        ))
      }

    </Container>
  );
};

export default Comments;

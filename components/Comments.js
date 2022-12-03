import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Script from "next/script";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dbConnect from "../utils/dbConnect";

export const Comments = ({ data, comments, users }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState({
    comment: "",
    Author: "638925d290acffd880edc0fc",
    post: data.data[0]._id,
  });
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const usersList = users.data;
  useEffect(() => {
    if (session) {
      setComment({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        Author: session.user.id,
        post: data.data[0]._id,
      });
    } else {
      const anonUserList = usersList.filter((item) => {
        return item._id == "638925d290acffd880edc0fc";
      });
      const anonUser = anonUserList[0];

      setComment((prev) => {
        return {
          ...prev,
          name: anonUser.name,
        };
      });
    }
  }, [session]);

  const postInfo = data.data[0];

  const submitForm = (e) => {
    e.preventDefault();
    let errs = {};
    if (comment?.comment?.length < 2) {
      errs.message = "Comments must be atleast 2 letters";
      setErrors(errs);
      return;
    }
    setErrors("");
    createComment();
  };
  const createComment = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/auth/posts/${postInfo._id}/comments`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(comment),
        }
      );
      router.push(`/posts/${postInfo._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setComment((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
    console.log(comment?.comment);
    if (comment?.comment?.length > 0) {
      setErrors({});
    }
  };

  return (
    <>
      <Script
        src="https://kit.fontawesome.com/ad91fb5d97.js"
        crossorigin="anonymous"
      ></Script>
      <div className="comments--container">
        {session && (
          <p className="commenting">
            You are commenting as
            <b> {session.user.name}</b>
          </p>
        )}
        {!session && (
          <p className="commenting">
            You are commenting as <b>{comment.name}</b>
          </p>
        )}
        {<p className="errors--msg">{errors.message}</p>}
        <div className="commentBox">
          <form onSubmit={submitForm}>
            <div className="boxplus">
              <textarea
                name="comment"
                className="comment--input"
                onChange={handleChange}
              ></textarea>
              <button className="comment--btn" type="submit">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
        <div className="comment--start">
          <p>Comments</p>
          <div className="all-comments--container">
            {comments.map((comment) => {
              return (
                <div key={comment._id} className="comments--list">
                  <div className="partition">
                    <div className="comments--left">
                      <img width="50" src={comment.image} />
                      <p>{comment.name}</p>
                    </div>
                    <div className="comments-text">
                      <p>{comment.comment}</p>
                    </div>
                  </div>
                  <hr className="comments--break"></hr>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Comments;

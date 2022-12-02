import Head from "next/head";
import { useSession } from "next-auth/react";
import Comments from "../../components/Comments";
export default function Home({ data, comments, users }) {
  const post = data.data[0];
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main>
        <div className="main">
          <div className="post--id" key={post._id}>
            <div className="post--container">
              <p className="post--title">{post.title}</p>
              <div className="post---img">
                <img className="post--img" src={post.uploadedImage}></img>
              </div>
              <p className="post--msg">{post.message}</p>
              <div className="profile--container">
                <p className="user--name">{post.name}</p>
                <img className="user--img" src={post.image}></img>
              </div>
            </div>
          </div>
        </div>
        <Comments users={users} comments={comments} data={data} />
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const postId = context.params.id;
  /// getting post data from self api
  const data = await fetch(`http://localhost:3000/api/auth/posts/${postId}`, {
    method: "GET",
  });
  const response = await data.json();
  //getting comments for the post with the post Id
  const comments = await fetch(
    `http://localhost:3000/api/auth/posts/${postId}/comments`
  );
  const commentsResponse = await comments.json();
  const re = commentsResponse.data;

  const find = re.filter((each) => {
    return postId == each.post;
  });
  //fetching the list of users
  const users = await fetch(`http://localhost:3000/api/auth/users`);
  const userRes = await users.json();

  return {
    props: {
      data: response,
      comments: find,
      users: userRes,
    },
  };
};

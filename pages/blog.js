import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Blog() {
  const { data: session } = useSession();
  const [isImgUploaded, setIsImgUploaded] = useState(undefined);
  const [imgSrc, setImgSrc] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [NoImgSelected, setNoImgSelected] = useState(false);
  const [imgIsUploading, setImgIsUploading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    message: "",
  });
  useEffect(() => {
    if (session) {
      setForm({
        title: "",
        message: "",
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        uploadedImage: "",
        Author: session.user.id,
      });
    }
  }, [session]);

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createPost();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const createPost = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e) {
    setForm((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  }
  const validate = () => {
    let err = {};
    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.message) {
      err.message = "Message is required";
    }
    if (form.uploadedImage == false && imgIsUploading) {
      err.image = "Please wait while image is being uploaded";
    } else if (form.uploadedImage == false) {
      err.image = "You must upload an image";
    }
    return err;
  };

  function handleImage(changeEvent) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImgSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);

    imageSubmit(changeEvent);
  }

  async function imageSubmit(e) {
    const dat = e.currentTarget;
    const fileInput = Array.from(dat.files).find(({ name }) => (name = "file"));
    const formData = new FormData();

    if (fileInput.length === 0) {
      setNoImgSelected(true);
      return;
    }
    setNoImgSelected(false);
    formData.append("file", fileInput);

    formData.append("upload_preset", "blogImg");
    setImgIsUploading(true);
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dguei52eb/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    setImgIsUploading(false);
    setForm((prev) => {
      return {
        ...prev,
        uploadedImage: data.secure_url,
      };
    });
    if (form) {
      if (form.uploadedImage !== "") {
        setIsImgUploaded(true);
      }
    }
  }

  return (
    <>
      <div className="blog--create">
        <div>Create a Blog post</div>
        <form onSubmit={handleSubmit}>
          <div className="input--container">
            <div>
              <input
                className="blog-create blog-input"
                type="text"
                placeholder="Title"
                onChange={handleChange}
                name="title"
              />
              {form.title.length < 1 && (
                <p className="errors-display">{errors.title}</p>
              )}
            </div>
            <div>
              <textarea
                className="blog-create blog-textarea"
                placeholder="Message body"
                onChange={handleChange}
                name="message"
              />
              {form.message.length < 1 && (
                <p className="errors-display">{errors.message}</p>
              )}
            </div>
            <div>
              <input
                className="fileUploader"
                onChange={handleImage}
                type="file"
                name="image"
              />
            </div>
            <button className="SUBMIT" type="submit">
              Submit
            </button>
          </div>
        </form>
        {!form.uploadedImage && (
          <p className="errors-display">{errors.image}</p>
        )}
        <img src={imgSrc} className="blogImg" />
      </div>
    </>
  );
}

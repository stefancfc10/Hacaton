import { NextPage } from "next";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

interface FormValues {
  name: string;
  email: string;
  message: string;
  exampleLink: string;
}

const CustomOrders: NextPage = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      exampleLink: "",
    },
  });
  const formRef = useRef(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_23d3zln",
        "template_uiqifcu",
        // @ts-ignore
        formRef.current,
        "Q8xrBeA_s792Zhf-H"
      )
      .then(
        () => {
          setSuccess(true);
          setError(false);
          clearFormInputs();
        },
        () => {
          setError(true);
          setSuccess(false);
          console.log(formRef.current);
        }
      );
  };

  const clearFormInputs = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedFile(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitForm = (data: FormValues) => {
    console.log(data);
    console.log(selectedFile);
  };

  const showGalleryModal = (e: React.MouseEvent<HTMLImageElement>) => {
    setSelectedImage(e.currentTarget.src);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <main className="custom-order-container main">
      <section className="hero-section">
        <div className="heading">
          <h1>Custom Made</h1>
        </div>
      </section>
      <section className="dream-section">
        <div className="container">
          <h2>You dream it, we&rsquo;ll make it</h2>
          <p>
            Whether it’s a piece of jewelry, an ornament or something entirely
            your own, share your idea with us and we’ll do our best to bring it
            to life.
          </p>
          <p>
            Don&rsquo;t forget to attach photos or provide a link from the
            internet to help us better understand your vision.
          </p>
          <p>
            Once we receive your request, we&rsquo;ll reach out to discuss all
            the details with you
          </p>
        </div>
      </section>
      <div className="divider d-flex justify-content-center">
        <img src="/images/home_page/leaf_divider.svg" alt="leaf divider" />
      </div>
      <section className="request-form-container">
        <form ref={formRef} className="container" onSubmit={sendEmail}>
          <div className="form-styles">
            <label htmlFor="name">
              Name <span>(optional)</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name here..."
            />
          </div>

          <div className="form-styles">
            <label htmlFor="email">
              Email <span>(required)</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email address here..."
              name="email"
            />
          </div>

          <div className="form-styles">
            <label htmlFor="message">
              Message <span>(required)</span>
            </label>
            <textarea
              id="message"
              placeholder="Your message here..."
              name="message"
            />
          </div>

          <div className="form-styles">
            <label htmlFor="upload">
              Upload Image <span>(optional)</span>
            </label>
            <label htmlFor="upload" className="upload-label">
              + Attach Images
            </label>
            <input
              type="file"
              id="upload"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-styles">
            <label htmlFor="exampleLink">
              Send Link <span>(optional)</span>
            </label>
            <input
              type="text"
              id="exampleLink"
              {...register("exampleLink")}
              placeholder="https://www.example.com"
            />
          </div>

          <div className="disclaimer">
            <p>
              * Due to the nature of handcrafted products, keep in mind that the
              replicated piece may not appear exactly as shown on the photos.
              However, we will try our best to ensure it closely resembles the
              original!
            </p>
          </div>

          <button type="submit">Send Request</button>

          {error && (
            <p className="text-danger">
              Your message has NOT been successfully sent
            </p>
          )}
          {success && (
            <p className="text-success">
              Your message has been successfully sent
            </p>
          )}
        </form>
      </section>
      <section className="gallery-container">
        <h2>Gallery</h2>
        <div className="wrapper">
          <div className="card">
            <div className="card-inner">
              <img
                src="/images/custom_order_page/custom_gallery_1.jpg"
                alt="gallery image"
                onClick={showGalleryModal}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-inner">
              <img
                src="/images/custom_order_page/custom_orders_title.jpg"
                alt="gallery image"
                onClick={showGalleryModal}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-inner">
              <img
                src="/images/custom_order_page/custom_gallery_3.jpg"
                alt="gallery image"
                onClick={showGalleryModal}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-inner">
              <img
                src="/images/custom_order_page/custom_gallery_4.jpg"
                alt="gallery image"
                onClick={showGalleryModal}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-inner">
              <img
                src="/images/custom_order_page/custom_gallery_5.jpg"
                alt="gallery image"
                onClick={showGalleryModal}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-inner">
              <img
                src="/images/custom_order_page/custom_gallery_6.jpg"
                alt="gallery image"
                onClick={showGalleryModal}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-inner">
              <img
                src="/images/custom_order_page/custom_gallery_7.jpg"
                alt="gallery image"
                onClick={showGalleryModal}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-inner">
              <img
                src="/images/custom_order_page/custom_gallery_8.jpg"
                alt="gallery image"
                onClick={showGalleryModal}
              />
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            {selectedImage && (
              <img src={selectedImage} alt="image in fullscreen" />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default CustomOrders;

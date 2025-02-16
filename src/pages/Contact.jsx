import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { Send } from "lucide-react";

const ContactForm = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const user_name = formData.get("user_name");
    const user_email = formData.get("user_email");
    const user_contact = formData.get("user_contact");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!user_name || !user_email || !user_contact || !subject || !message) {
      Swal.fire({
        title: "Error",
        text: "Please fill all fields!",
        icon: "error",
        background: "#222",
        color: "#FF4C4C",
        confirmButtonColor: "#FF4C4C",
      });
      return;
    }

    setIsLoading(true);

    try {
      await emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current,
        "YOUR_PUBLIC_KEY"
      );

      Swal.fire({
        title: "Success",
        text: "Your message has been sent!",
        icon: "success",
        background: "#222",
        color: "#32CD32",
        confirmButtonColor: "#32CD32",
      });

      form.current.reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to send message. Try again later.",
        icon: "error",
        background: "#222",
        color: "#FF4C4C",
        confirmButtonColor: "#FF4C4C",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-[#000B2A] text-white py-16 flex justify-center items-center">
      <div className="container mx-auto px-6 lg:px-20 max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 text-center">Contact Me</h2>
        <p className="text-gray-400 text-lg text-center mb-8">Let's Discuss Your Project</p>
        <div className="mt-8 border-t w-full border-gray-600"></div>

        <div className="mb-4 w-full flex flex-col md:flex-row ">
          <hi className="text-4xl mb-12 text-gray-400 flex justify-center items-center">Get in touch with Me</hi>
          <form ref={form} onSubmit={sendEmail} className="flex flex-col w-full gap-4 p-8 rounded-lg">
          {[
            { name: "user_name", type: "text", label: "Your Name" },
            { name: "user_email", type: "email", label: "Your Email" },
            { name: "user_contact", type: "text", label: "Your Contact" },
            { name: "subject", type: "text", label: "Subject" },
          ].map((field) => (
            <div key={field.name} className="relative">
              <input
                type={field.type}
                name={field.name}
                className="peer w-full p-3 border border-gray-600 bg-transparent text-white rounded-md focus:outline-none focus:border-purple-500 pt-5"
                required
              />
              <label className="absolute left-3 top-5 transform -translate-y-1/2 bg-[#000B2A] px-2 text-gray-400 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:-translate-y-0 peer-focus:text-sm peer-focus:text-purple-500 peer-focus:px-2">
                {field.label}
              </label>
            </div>
          ))}

          <div className="md:col-span-2 relative">
            <textarea
              name="message"
              rows="4"
              className="peer w-full p-3 border border-gray-600 bg-transparent text-white rounded-md focus:outline-none focus:border-purple-500 pt-5"
              required
            ></textarea>
            <label className="absolute left-3 top-6 bg-[#000B2A] px-2 text-gray-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-purple-500 peer-focus:px-2">
              Your Message
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 flex item-center justify-center rounded-lg font-medium transition duration-300 ${
              isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-[#320F85] hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Sending..." : <><Send className="mr-2" size={20} /> SEND MESSAGE</>}
          </button>
        </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

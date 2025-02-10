import React, { useRef, useState } from "react";
import { Send } from "lucide-react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.contact || !formData.subject || !formData.message) {
      Swal.fire({
        title: "Error",
        text: "Please fill all fields!",
        icon: "error",
        background: "#000B2A",
        color: "#FF4C4C",
        confirmButtonColor: "#FF4C4C",
      });
      return;
    }

    // Send email using EmailJS
    emailjs
      .sendForm(
        "service_o3qyx2a", // Replace with your EmailJS Service ID
        "template_afhb2np", // Replace with your EmailJS Template ID
        form.current,
        "PcFzo5u8K7Higxmwf" // Replace with your EmailJS Public Key
      )
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Your message has been sent!",
          icon: "success",
          background: "#000B2A",
          color: "#32CD32",
          confirmButtonColor: "#32CD32",
        });
        setFormData({ name: "", email: "", contact: "", subject: "", message: "" });
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Failed to send message. Try again later.",
          icon: "error",
          background: "#000B2A",
          color: "#FF4C4C",
          confirmButtonColor: "#FF4C4C",
        });
      });
  };

  return (
    <section className="bg-[#000B2A] text-white py-16 flex justify-center items-center">
      <div className="container mx-auto px-6 lg:px-20 max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 text-center">Contact Me</h2>
        <p className="text-gray-400 text-lg text-center mb-8">Let's Discuss Your Project</p>

        <form ref={form} onSubmit={handleSubmit} className="space-y-6 p-8 rounded-lg">
          {[
            { name: "name", type: "text", label: "Your Name" },
            { name: "email", type: "email", label: "Your Email" },
            { name: "contact", type: "text", label: "Your Contact" },
            { name: "subject", type: "text", label: "Subject" },
          ].map((field) => (
            <div key={field.name} className="relative">
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="peer w-full p-3 border-b-2 border-gray-600 bg-transparent rounded text-white focus:outline-none focus:border-purple-500"
                required
              />
              <label className="absolute left-3 top-3 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-purple-500">
                {field.label}
              </label>
            </div>
          ))}

          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              className="peer w-full p-3 border-b-2 border-gray-600 bg-transparent rounded text-white focus:outline-none focus:border-purple-500"
              required
            ></textarea>
            <label className="absolute left-3 top-3 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-purple-500">
              Your Message
            </label>
          </div>

          <button type="submit" className="px-6 py-3 flex ml-auto bg-[#320F85] text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300">
            <Send className="mr-2 flex items-center justify-center" size={20} />
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

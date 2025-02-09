import React, { useState } from "react";
import { Send } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import '../App.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_contact: "",
    subject: "",
    message: "",
  });

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.user_name || !formData.user_email || !formData.user_contact || !formData.subject || !formData.message) {
      Swal.fire("Error", "Please fill all fields!", "error");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);

      if (response.data.success) {
        Swal.fire("Success", "Your message has been sent!", "success");
        setFormData({ user_name: "", user_email: "", user_contact: "", subject: "", message: "" });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to send message. Try again later.", "error");
    }
  };

  return (
    <section className="bg-[#000B2A] text-white py-16 flex justify-center items-center" >
      <div className="container mx-auto px-6 lg:px-20 max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 text-center"data-aos="fade-down">Contact Me</h2>
        <p className="text-gray-400 text-lg text-center mb-8"data-aos="fade-up">Let's Discuss Your Project</p>
        <div className="mt-8 border-t border-gray-600 mb-8 w-full"></div>

        <div className="flex flex-col md:flex-row items-center justify-around w-full">
        <p className="text-gray-400 text-4xl font-syne touch"data-aos="fade-right">Get in touch with me</p>
        <form onSubmit={handleSubmit} className="space-y-6 w-full rounded-lg">
          {[
            { name: "user_name", type: "text", label: "Your Name" },
            { name: "user_email", type: "email", label: "Your Email" },
            { name: "user_contact", type: "text", label: "Your Contact" },
            { name: "subject", type: "text", label: "Subject" },
          ].map((field) => (
            <div key={field.name} className="relative"data-aos="fade-up">
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="w-full p-3 border-b-2 border-gray-600 bg-transparent rounded text-white focus:outline-none focus:border-purple-500 peer"
                required
                data-aos="fade-up"
              />
              <label
                className={`absolute left-3 transition-all duration-300 text-gray-400 ${
                  formData[field.name]
                    ? "top-[-12px] text-sm text-purple-500"
                    : "top-3 text-base"
                }`}
              >
                {field.label}
              </label>
            </div>
          ))}

          <div className="relative"data-aos="fade-up">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-3 border-b-2 border-gray-600 bg-transparent rounded text-white focus:outline-none focus:border-purple-500 peer"
              required
              data-aos="fade-up"
            ></textarea>
            <label
              className={`absolute left-3 transition-all duration-300 text-gray-400 ${
                formData.message
                  ? "top-[-12px] text-sm text-purple-500"
                  : "top-3 text-base"
              }`}
            >
              Your Message
            </label>
          </div>

          <button type="submit" className="px-6 py-3 flex ml-[150px]  bg-[#320F85] text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300 send"
          data-aos="fade-down">
            <Send className="mr-2 flex items-center justify-center" size={20} />
            SEND MESSAGE
          </button>
        </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

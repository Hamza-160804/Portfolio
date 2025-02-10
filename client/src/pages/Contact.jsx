import React, { useRef } from "react";
import { Send } from "lucide-react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;

    if (!form.name.value || !form.email.value || !form.contact.value || !form.subject.value || !form.message.value) {
      Swal.fire("Error", "Please fill all fields!", "error");
      return;
    }

    try {
      await emailjs.sendForm(
        "service_5qoyrph", // Replace with your Service ID
        "template_afhb2np", // Replace with your Template ID
        form,
        "PcFzo5u8K7Higxmwf" // Replace with your Public Key
      );

      Swal.fire("Success", "Your message has been sent!", "success");
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire("Error", "Failed to send message. Try again later.", "error");
    }
  };

  return (
    <section className="bg-[#000B2A] text-white py-16 flex justify-center items-center">
      <div className="container mx-auto px-6 lg:px-20 max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 text-center">Contact Me</h2>
        <p className="text-gray-400 text-lg text-center mb-8">Let's Discuss Your Project</p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 p-8 rounded-lg">
          {[{ name: "name", label: "Your Name" }, { name: "email", label: "Your Email" }, { name: "contact", label: "Your Contact" }, { name: "subject", label: "Subject" }].map((field) => (
            <div key={field.name} className="relative">
              <input
                type={field.name.includes("email") ? "email" : "text"}
                name={field.name}
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
              rows="4"
              className="peer w-full p-3 border-b-2 border-gray-600 bg-transparent rounded text-white focus:outline-none focus:border-purple-500"
              required
            ></textarea>
            <label className="absolute left-3 top-3 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-purple-500">
              Your Message
            </label>
          </div>

          <button type="submit" className="px-6 py-3 flex ml-auto bg-[#320F85] text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300 send">
            <Send className="mr-2 flex items-center justify-center" size={20} />
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
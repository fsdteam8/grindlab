import React, { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
    } = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (formData.phone && !/^[+()\-.\s\d]{7,}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!formData.message || formData.message.length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Reset form on success
      setFormData({ name: "", email: "", phone: "", message: "" });
      alert(
        "Message sent! Thanks for reaching out. We'll get back to you shortly."
      );
    } catch (error) {
      console.error("Error sending message:", error);
      alert("There was an error sending your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }

    // Simulate API call
    // setTimeout(() => {
    //   alert('Message sent! Thanks for reaching out. We\'ll get back to you shortly.');
    //   setFormData({ name: '', email: '', phone: '', message: '' });
    //   setIsSubmitting(false);
    // }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/5150461.jpg')`,
          filter: "brightness(.9) grayscale(0.1) contrast(1.1)",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Dot Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left Column - Form */}
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 font-primary">
                Let&apos;s Elevate Your Guest Experience
              </h3>
              <p className="text-white text-bsae leading-relaxed">
                Contact us to craft a customized wellness experience for your
                hotel, retreat, or private clientele.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/30 text-white text-lg placeholder:text-white focus:outline-none focus:border-white/60 transition-all duration-300"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#E6F6FC] text-white text-lg placeholder:text-white focus:outline-none focus:border-white/60 transition-all duration-300"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full px-0 py-4  border-0 border-b border-[#E6F6FC] text-white text-lg placeholder:text-white focus:outline-none focus:border-white/60 transition-all duration-300"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-400">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Type your message here"
                  rows={3}
                  className="w-full px-0  md:mt-6  py-4 bg-transparent border-0 border-b border-[#E6F6FC] text-white text-lg placeholder:text-white focus:outline-none focus:border-white/60 transition-all duration-300 resize-none"
                />
                {errors.message && (
                  <p className="mt-2text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[limegreen] hover:bg-green-300 text-black font-semibold px-8 py-3 rounded-sm transition-all duration-300 disabled:opacity-70 inline-flex items-center gap-2"
                >
                  {isSubmitting ? "SENDING..." : "SUBMIT"}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-8 lg:pl-12">
            <div>
              <h4 className="text-3xl md:text-[48px] font-bold text-white mb-8 font-primary">
                Contact Information
              </h4>

              <div className="space-y-4 text-white/80 text-lg">
                <p>Maui, Hawaii, USA</p>
                <p>Call us: +1234567890</p>
                <p>
                  Whatsapp:
                  <br />
                  +1234567890
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <h5 className="text-white text-lg mb-4 font-light">Follow Us</h5>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <span className="text-white text-sm font-medium">f</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <span className="text-white text-xs font-medium">in</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <span className="text-white text-sm font-medium">𝕏</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;

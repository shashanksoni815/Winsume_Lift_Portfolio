// import { useState } from 'react';
// import { Send, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
// import { motion } from 'motion/react';

// export function InquiryForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     city: '',
//     propertyType: 'Residential Villa',
//     message: '',
//   });

//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Mock form submission
//     setIsSubmitted(true);
//     setTimeout(() => {
//       setIsSubmitted(false);
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         city: '',
//         propertyType: 'Residential Villa',
//         message: '',
//       });
//     }, 3000);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <section id="inquiry" className="bg-[#2a4544] py-24">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
//             Get In Touch
//           </h2>
//           <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
//           <p className="text-xl text-white/70 max-w-3xl mx-auto">
//             Let's discuss how we can elevate your property with a bespoke lift solution
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//           {/* Contact Info */}
//           <motion.div 
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="space-y-8"
//           >
//             <div>
//               <h3 className="text-2xl text-white mb-6 font-['Playfair_Display']">Contact Information</h3>
//               <p className="text-white/60 mb-8">
//                 Our team is ready to answer your questions and guide you through the process of creating your perfect elevator.
//               </p>
//             </div>

//             <div className="space-y-6">
//               <div className="flex items-start">
//                 <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
//                   <Phone size={20} className="text-orange-500" />
//                 </div>
//                 <div>
//                   <div className="text-white/50 text-sm mb-1 uppercase tracking-wider">Phone</div>
//                   <div className="text-white">+91 79 428 29113</div>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
//                   <Mail size={20} className="text-orange-500" />
//                 </div>
//                 <div>
//                   <div className="text-white/50 text-sm mb-1 uppercase tracking-wider">Email</div>
//                   <div className="text-white">concierge@winsumelift.com</div>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
//                   <MapPin size={20} className="text-orange-500" />
//                 </div>
//                 <div>
//                   <div className="text-white/50 text-sm mb-1 uppercase tracking-wider">Location</div>
//                   <div className="text-white">Winsume Tower, Landmark Area<br />Indore, M.P., India</div>
//                 </div>
//               </div>
//             </div>

//             {/* WhatsApp Button */}
//             <div className="pt-6 border-t border-[#3a5554]">
//               <a 
//                 href="https://wa.me/917942829113" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-full hover:from-green-600 hover:to-green-700 hover:scale-105 transition-all shadow-lg hover:shadow-green-500/30 w-full group"
//               >
//                 <MessageCircle size={20} className="mr-3 group-hover:animate-pulse" />
//                 <span className="font-semibold uppercase tracking-wider text-sm">Chat on WhatsApp</span>
//               </a>
//               <p className="text-white/40 text-xs text-center mt-3">Instant response available</p>
//             </div>

//             <div className="pt-8 border-t border-[#3a5554]">
//               <div className="text-white/50 text-sm mb-2 uppercase tracking-wider">Business Hours</div>
//               <div className="text-white text-sm">Monday - Friday: 9:00 AM - 6:00 PM</div>
//               <div className="text-white text-sm">Saturday: 10:00 AM - 4:00 PM</div>
//               <div className="text-white text-sm">Sunday: By Appointment</div>
//             </div>
//           </motion.div>

//           {/* Inquiry Form */}
//           <motion.div 
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="lg:col-span-2"
//           >
//             <form onSubmit={handleSubmit} className="bg-[#1a3332] border border-[#3a5554] rounded-2xl p-8">
//               {isSubmitted ? (
//                 <div className="text-center py-12">
//                   <div className="w-20 h-20 bg-orange-500/20 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <Send size={32} className="text-orange-500" />
//                   </div>
//                   <h3 className="text-2xl text-white mb-3 font-['Playfair_Display']">Thank You!</h3>
//                   <p className="text-white/60">
//                     We've received your inquiry and will contact you within 24 hours.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label htmlFor="name" className="block text-white/70 mb-2 text-sm uppercase tracking-wider">
//                         Full Name *
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         className="w-full bg-[#2a4544] border border-[#3a5554] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
//                         placeholder="John Doe"
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="email" className="block text-white/70 mb-2 text-sm uppercase tracking-wider">
//                         Email Address *
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="w-full bg-[#2a4544] border border-[#3a5554] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
//                         placeholder="john@example.com"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label htmlFor="phone" className="block text-white/70 mb-2 text-sm uppercase tracking-wider">
//                         Phone Number
//                       </label>
//                       <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="w-full bg-[#2a4544] border border-[#3a5554] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
//                         placeholder="+1 (555) 000-0000"
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="city" className="block text-white/70 mb-2 text-sm uppercase tracking-wider">
//                         City
//                       </label>
//                       <input
//                         type="text"
//                         id="city"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         className="w-full bg-[#2a4544] border border-[#3a5554] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
//                         placeholder="New York"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label htmlFor="propertyType" className="block text-white/70 mb-2 text-sm uppercase tracking-wider">
//                         Property Type *
//                       </label>
//                       <select
//                         id="propertyType"
//                         name="propertyType"
//                         value={formData.propertyType}
//                         onChange={handleChange}
//                         required
//                         className="w-full bg-[#2a4544] border border-[#3a5554] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
//                       >
//                         <option value="residential">Residential Villa</option>
//                         <option value="commercial">Commercial</option>
//                         <option value="mixed">Mixed Use</option>
//                         <option value="other">Other</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="message" className="block text-white/70 mb-2 text-sm uppercase tracking-wider">
//                       Message *
//                     </label>
//                     <textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                       rows={6}
//                       className="w-full bg-[#2a4544] border border-[#3a5554] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
//                       placeholder="How can we help you?"
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-all text-lg font-medium flex items-center justify-center uppercase tracking-wider"
//                   >
//                     <Send size={20} className="mr-2" />
//                     Submit Inquiry
//                   </button>

//                   <p className="text-white/50 text-sm text-center">
//                     By submitting this form, you agree to our privacy policy and terms of service.
//                   </p>
//                 </div>
//               )}
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useState } from 'react';
import { Send, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

export function InquiryForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    propertyType: 'Residential Villa',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      alert('Please create your identity and log in before sending an inquiry.');
      navigate('/create-identity');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch('https://winsume-lift-backend01.onrender.com/api/inquiries/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          message: formData.message,
          type: formData.propertyType,
          source: 'inquiry-form',
        }),
      });

      if (response.status === 401) {
        alert('Your session has expired. Please log in again.');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const msg = errorData?.message ?? 'Failed to send inquiry. Please try again.';
        alert(msg);
        return;
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        propertyType: 'Residential Villa',
        message: '',
      });
    } catch (error) {
      console.error('Error sending inquiry', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="inquiry" className="bg-[#2a4544] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6" />
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Let's discuss how we can elevate your property with a bespoke lift solution
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Left: Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl text-white mb-6 font-['Playfair_Display']">
                Contact Information
              </h3>
              <p className="text-white/60 mb-8">
                Our team is ready to answer your questions and guide you through the
                process of creating your perfect elevator.
              </p>
            </div>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone size={20} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-white/50 text-sm mb-1 uppercase tracking-wider">Phone</div>
                  <div className="text-white">+91 79 428 29113</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail size={20} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-white/50 text-sm mb-1 uppercase tracking-wider">Email</div>
                  <div className="text-white">concierge@winsumelift.com</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin size={20} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-white/50 text-sm mb-1 uppercase tracking-wider">Location</div>
                  <div className="text-white">
                    Winsume Tower, Landmark Area
                    <br />
                    Indore, M.P., India
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="pt-6 border-t border-[#3a5554]">
              
              <a  href="https://wa.me/917942829113"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-full hover:from-green-600 hover:to-green-700 hover:scale-105 transition-all shadow-lg hover:shadow-green-500/30 w-full group"
              >
                <MessageCircle size={20} className="mr-3 group-hover:animate-pulse" />
                <span className="font-semibold uppercase tracking-wider text-sm">
                  Chat on WhatsApp
                </span>
              </a>
              <p className="text-white/40 text-xs text-center mt-3"> Instant response available</p>
            </div>

            {/* Hours */}
            <div className="pt-8 border-t border-[#3a5554]">
              <div className="text-white/50 text-sm mb-2 uppercase tracking-wider">Business Hours</div>
              <div className="text-white text-sm">Monday – Friday: 9:00 AM – 6:00 PM</div>
              <div className="text-white text-sm">Saturday: 10:00 AM – 4:00 PM</div>
              <div className="text-white text-sm">Sunday: By Appointment</div>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#1a3332] border border-[#3a5554] rounded-2xl p-8"
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-orange-500/20 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={32} className="text-orange-500" />
                  </div>
                  <h3 className="text-2xl text-white mb-3 font-['Playfair_Display']">Thank You!</h3>
                  <p className="text-white/60">
                    We've received your inquiry and will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="inq-name"
                        className="block text-white/70 mb-2 text-sm uppercase tracking-wider"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="inq-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-[#2a4544] border border-[#3a5554] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="inq-email"
                        className="block text-white/70 mb-2 text-sm uppercase tracking-wider"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="inq-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-[#2a4544] border border-[#3a5554] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="inq-phone"
                        className="block text-white/70 mb-2 text-sm uppercase tracking-wider"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="inq-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0000000000"
                        className="w-full bg-[#2a4544] border border-[#3a5554] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="inq-city"
                        className="block text-white/70 mb-2 text-sm uppercase tracking-wider"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="inq-city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Indore"
                        className="w-full bg-[#2a4544] border border-[#3a5554] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="inq-propertyType"
                        className="block text-white/70 mb-2 text-sm uppercase tracking-wider"
                      >
                        Property Type *
                      </label>
                      <select
                        id="inq-propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#2a4544] border border-[#3a5554] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                      >
                        <option value="Residential Villa">Residential Villa</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Mixed Use">Mixed Use</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="inq-message"
                      className="block text-white/70 mb-2 text-sm uppercase tracking-wider"
                    >
                      Message *
                    </label>
                    <textarea
                      id="inq-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="How can we help you?"
                      className="w-full bg-[#2a4544] border border-[#3a5554] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-all text-lg font-medium flex items-center justify-center uppercase tracking-wider disabled:opacity-60 disabled:hover:bg-orange-500"
                  >
                    <Send size={20} className="mr-2" />
                    {isSubmitting ? 'Sending…' : 'Submit Inquiry'}
                  </button>

                  <p className="text-white/50 text-sm text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </div>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
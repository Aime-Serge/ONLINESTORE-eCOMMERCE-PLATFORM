'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import MainLayout from '../components/layouts/MainLayout';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: '✅ Your message has been sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: '❌ Failed to send message. Please try again later.' });
      }
    } catch {
      setStatus({ type: 'error', message: '⚠️ An error occurred. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | S&G Fast and Easy Buy</title>
        <meta name="description" content="Get in touch with S&G Fast and Easy Buy. We're here to help you with your shopping needs." />
      </Head>
      <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8">📬 Contact Us</h1>
        <p className="text-center text-gray-600 mb-12">
          We’d love to hear from you! Whether you have a question about products, orders, or anything else — our team is ready to help. 💬
        </p>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
            <FaMapMarkerAlt className="text-blue-600 text-2xl mb-2" />
            <h3 className="font-semibold">Address</h3>
            <p className="text-gray-500">123 Market Street, Nairobi, Kenya</p>
          </div>
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
            <FaEnvelope className="text-blue-600 text-2xl mb-2" />
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-500">
              <a href="mailto:support@sgbuy.com" className="hover:underline">support@sgbuy.com</a>
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
            <FaPhone className="text-blue-600 text-2xl mb-2" />
            <h3 className="font-semibold">Phone</h3>
            <p className="text-gray-500">
              <a href="tel:+254700123456" className="hover:underline">+254 700 123 456</a>
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
            <FaClock className="text-blue-600 text-2xl mb-2" />
            <h3 className="font-semibold">Hours</h3>
            <p className="text-gray-500">Mon - Sat: 9am - 7pm</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows={5}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition w-full md:w-auto"
            >
              {loading ? 'Sending...' : 'Send Message ✉️'}
            </button>
          </form>

          {status.message && (
            <p className={`mt-4 text-center font-medium ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {status.message}
            </p>
          )}
        </div>

        {/* Google Map */}
        <div className="mt-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.858588671391!2d36.82194641525671!3d-1.292065035993954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6a778eb0f%3A0x50154b9b3d11db!2sNairobi!5e0!3m2!1sen!2ske!4v1619172268905!5m2!1sen!2ske"
            width="100%"
            height="400"
            loading="lazy"
            className="rounded-lg shadow-lg border-0"
          ></iframe>
        </div>
      </div>
      </MainLayout>
    </>
  );
}

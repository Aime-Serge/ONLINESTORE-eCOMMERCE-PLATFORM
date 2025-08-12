import React, { useState } from 'react'; 
import api from '../services/api';
import { useRouter } from 'next/router';
import MainLayout from '../components/layouts/MainLayout';
import Head from 'next/head';

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await api.post('/auth/register/', form, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (res.status === 201 || res.status === 200) {
        setSuccess('Account created! Redirecting to sign in...');
        setForm({ email: '', first_name: '', last_name: '', phone_number: '', password: '' });
        router.push('/login'); // ✅ Immediately redirect to login page
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <>
      <Head>
        <title>S&G Fast and Easy Buy | Online Products Stock</title>
        <meta
          name="description"
          content="Fast and Easy Online Shopping Platform"
        />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <MainLayout>
        <section className="max-w-md mx-auto mt-12 p-6 border rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Create a User Profile</h1>

          {error && <p className="text-red-600 mb-4">{error}</p>}
          {success && <p className="text-green-600 mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="first_name" className="block mb-1 font-medium">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block mb-1 font-medium">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="phone_number" className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                pattern="^\+?[0-9]{7,15}$"
                title="Enter a valid phone number"
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                minLength={6}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Create Account
            </button>
          </form>
        </section>
      </MainLayout>
    </>
  );
};

export default SignupPage;

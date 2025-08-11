import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MainLayout from '../components/layouts/MainLayout';
import Head from 'next/head';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth) as { status: string, error?: string | null };

  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(form)).then((res: { meta: { requestStatus: string } }) => {
      if (res.meta.requestStatus === 'fulfilled') {
        router.push('/auth/login');
      }
    });
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
    {/*<section className="container mx-auto p-4">*/}
    <section className="max-w-md mx-auto mt-12 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {auth.status === 'failed' && (
        <p className="text-red-600 mb-4">{auth.error ?? 'Login failed'}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
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
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={auth.status === 'loading'}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {
          auth.status === 'loading' ? 'Logging in...' : 'Login'
          }
        </button>
        <p className="text-xl mt-2">
          Do not have an account? <Link href="/signup" className="text-green-600-xl hover:underline">Register</Link>
          </p>
      </form>
    </section>
    </MainLayout>
    </>
  );
};

export default LoginPage;

"use client"
import React, { useActionState, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputUser, IUser } from './_lib/type';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { handleSignup } from './_lib/api';
import { redirect } from 'next/navigation';

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Name field is required'),
    surname: yup.string().required('Surname field is required'),
    login: yup.string().required('Login field is required').min(6, 'The login should be at least 6 characters long'),
    password: yup.string().required('Password field is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character')
  })
  .required()

const Home = () => {
  const [error, setError] = useState("")
  const { register, handleSubmit, formState: { errors }, reset } = useForm<InputUser>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<InputUser> = (FormData) => {
    handleSignup(FormData)
      .then(res => {
        if (res.status === "error" && res.message) {
          setError(res.message)
        } else {
          reset()
          setError("")
          redirect("/")
        }
      })
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {error && <p className='text-danger'>{error}</p>}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            {errors.name && <p className='text-pink-500'>{errors.name.message} </p>}
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="surname" className="block text-sm font-medium mb-1">Surname</label>
            {errors.surname && <p className='text-purple-500'>{errors.surname.message} </p>}
            <input
              type="text"
              {...register("surname")}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your surname"
            />
          </div>
          <div>
            <label htmlFor="login" className="block text-sm font-medium mb-1">Login</label>
            {errors.login && <p className='text-indigo-500'>{errors.login.message} </p>}
            <input
              type="text"
              {...register("login")}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your login"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            {errors.password && <p className='text-pink-500'>{errors.password.message} </p>}
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <a href="#" className="text-pink-400 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};
export default Home;





















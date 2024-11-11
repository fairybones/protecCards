// https://tailwindui.com/components/marketing/sections/contact-sections

// Wholesale: req form
"use client";
import { useState } from "react";
import { Field, Label, Switch } from "@headlessui/react";

const initValues = {
  firstName: "",
  lastName: "",
  email: "",
  request: "",
  zipcode: "",
};
const initState = { values: initValues };
export default function Wholesale() {
  const [agreed, setAgreed] = useState(false);
  const [state, setState] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(state),
      });
      if (response.ok) {
        alert(
          "Email sent sunccessfully! Check your email over the next 1-2 business days for your personalized quote."
        );
      } else {
        alert("Failed to send request, please try again later.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while sending the request.");
    }
  };
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contact sales
        </h2>
        <p className="mt-10 text-lg leading-8 text-gray-600">
          Interested in wholesale rates? We want to support fans, grading
          experts & more with premier products. Fill out the form below to
          recieve a personalized quote!
        </p>
      </div>
      {/* ADD TO EMAIL ACTION */}
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                value={values.firstName}
                onChange={handleChange}
                name="firstName"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                value={values.lastName}
                onChange={handleChange}
                name="lastName"
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                value={values.email}
                onChange={handleChange}
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="request"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Tell us more...
            </label>
            <div className="mt-2">
              <textarea
                value={values.request}
                onChange={handleChange}
                name="request"
                rows={4}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
            <p className="mt-5 text-sm text-center leading-6 text-gray-600">
              * Minimum order of 1000 units *
            </p>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="zipcode"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Where to? Please enter a valid zipcode.
            </label>
            <div className="mt-2.5">
              <input
                value={values.zipcode}
                onChange={handleChange}
                name="zipcode"
                type="zipcode"
                autoComplete="zipcode"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <Field className="flex mt-9 gap-x-4 sm:col-span-2">
          <div className="flex h-6 items-center">
            <Switch
              checked={agreed}
              onChange={setAgreed}
              className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 data-[checked]:bg-emerald-600"
            >
              <span className="sr-only">Consent to Contact</span>
              <span
                aria-hidden="true"
                className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
              />
            </Switch>
          </div>
          <Label className="text-sm leading-6 text-gray-600">
            By checking this, you agree to our{" "}
            <a
              href="/privacy"
              className="font-semibold text-emerald-800"
              target="_blank"
            >
              privacy&nbsp;policy
            </a>
            .
          </Label>
        </Field>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-emerald-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  );
}

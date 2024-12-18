// Warranty FAQ + modal form
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
  Field,
  Fieldset,
  Input,
  Legend,
  Textarea,
  Select,
  Label,
} from "@headlessui/react";

const questions = [
  {
    id: 1,
    title: "Is there a minimum for wholesale orders?",
    description:
      "Yes, wholesale rates are offered at a minimum quantity of 1,000 units.",
    category: {
      title: "Wholesale",
      href: "/wholesale",
    },
  },
  {
    id: 2,
    title: "How do the cases close?",
    description:
      "Most of our cases are secured by a magnetic closure. Please check the product's description for exact specifications.",
    category: {
      title: "Damaged & Broken",
      href: "/warranty",
    },
  },
  {
    id: 3,
    title: "How is shipping calculated, and when will my product ship?",
    description:
      "By weight and distance. Orders are shipped same day, or by next business day for in-stock items.",
    category: {
      title: "Order Details",
      href: "/warranty",
    },
  },
  {
    id: 4,
    title: "Do I need a license to legally resell products?",
    description:
      "Yes! We require a resellers certification for wholesale accounts. We'll help you!",
    category: {
      title: "Wholesale",
      href: "/wholesale",
    },
  },
  {
    id: 5,
    title: "What happens with my personal information?",
    description:
      "Our use of information received is outlined in our privacy policy. We do not sell or use personal information without consent.",
    category: {
      title: "Data Security",
      href: "/privacy",
    },
  },
  {
    id: 6,
    title: "What is your return policy?",
    description:
      "We offer a warranty program to ensure the longevity of our products. Click the button below to submit a request form!",
    category: {
      title: "Order Details",
      href: "/warranty",
    },
  },
];

export default function Warranty() {
  // open & close modal form
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    product: "",
    method: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "warranty",
          formData,
        }),
      });
      if (res.ok) {
        setMessage("Email sent successfully!");
        setFormData({
          name: "",
          email: "",
          product: "",
          method: "",
        });
      } else {
        setMessage("Failed to send email.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-10 text-lg leading-8 text-gray-600">
            Something went wrong. What now?
          </p>
        </div>
        <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {questions.map((question) => (
            <article
              key={question.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex mb-3 items-center gap-x-4 text-xs">
                <a
                  href={question.category.href}
                  className="relative mt-3 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {question.category.title}
                </a>
              </div>
              <div className="group-relative">
                <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  {question.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  {question.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-end mr-10">
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="inline-flex w-full p-2 justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Warranty Request
          </button>
        </div>
      </div>
      {/* MODAL FORM */}
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <Dialog
          open={formOpen}
          onClose={() => setFormOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity -z-10 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
              />
              <DialogTitle className="font-bold text-lg">
                Let us make things right.
              </DialogTitle>
              <p>
                Check your email for the next steps. Please give us 1-2 business
                days to reply.
              </p>
              <Fieldset className="space-y-8">
                <Field>
                  <Label className="mt-3 block">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block"
                  />
                </Field>
                <Field>
                  <Label className="mt-2 block">Name on Order</Label>
                  <Input
                    className="mt-1 block"
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Field>
                <Legend className="font-bold">Tell us more...</Legend>
                <Field>
                  <Label className="mt-2 block">Product Affected:</Label>
                  <Input
                    className="mt-1 block"
                    id="product"
                    name="product"
                    type="text"
                    value={formData.product}
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <Label className="block font-semibold">
                    Preferred Method of Reconcilliation
                  </Label>
                  <Select
                    className="mt-2 block"
                    id="method"
                    name="method"
                    value={formData.method}
                    onChange={handleChange}
                  >
                    <option>Replacement</option>
                    <option>Return & Refund</option>
                  </Select>
                </Field>
              </Fieldset>
              <div className="flex gap-4">
                <button onClick={() => setFormOpen(false)}>Cancel</button>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 rounded-md bg-emerald-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>
              {message && <p className="mt-4 text-center text-sm">{message}</p>}
            </DialogPanel>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

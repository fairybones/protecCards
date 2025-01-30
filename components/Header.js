"use client"
// https://tailwindui.com/components/ecommerce/components/store-navigation
import React, { useContext } from "react";
import Link from "next/link";
import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  PopoverGroup,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";

// import helper function(s)
import ChangeCurrency from "utils/ChangeCurrency";
import { CartContext } from "context/CartContext";

// header contains nav icon, logo, cart icon
// import proLogo from "";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const navigation = {
  categories: [
    {
      id: "shop",
      name: "Shop",
      featured: [
        {
          name: "New Arrivals",
          href: "/new",
          imageSrc: "../public/img/new.png",
          imageAlt: "spotlight new products",
        },
        {
          name: "Bestsellers",
          href: "/bestsellers",
          imageSrc: "../public/img/best.png",
          imageAlt: "best selling products",
        },
      ],
      sections: [
        {
          id: "trading",
          name: "Trading Cards",
          items: [
            { name: "Card Sleeves & Slabs", href: "/trading" },
          ],
        },
        {
          id: "grading",
          name: "Grading Accessories",
          items: [
            { name: "Grading Slabs", href: "/grading" },
          ],
        },
        {
          id: "display",
          name: "Display Cases",
          items: [
            { name: "Card Stands", href: "/display" },
          ],
        },
      ],
    },
  ],
  forms: [
    { name: "Frequently Asked Questions", href: "/warranty" },
    { name: "Wholesale", href: "/wholesale" },
  ],
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");

  const { cart } = useContext(CartContext);
  const cartItems = cart?.cartItems;

  return (
    <div className="bg-white">
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-emerald-600 data-[selected]:text-emerald-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <img
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="object-cover object-center"
                            />
                          </div>
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a
                                href={item.href}
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.forms.map((form) => (
                <div key={form.name} className="flow-root">
                  <a
                    href={form.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {form.name}
                  </a>
                </div>
              ))}
            </div>
            {/* CHANGE CURRENCY */}
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-yellow-500 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Checkout coming soon!
          <a href="/HomePage"></a>
        </p>
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Nav</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="ml-4 flex lg:ml-0">{/* INSERT LOGO */}</div>

              <PopoverGroup className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-emerald-600 data-[open]:text-emerald-600">
                          {category.name}
                        </PopoverButton>
                      </div>
                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 top-1/2 bg-white shadow"
                        />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div
                                    key={item.name}
                                    className="group relative text-base sm:text-sm"
                                  >
                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                      <img
                                        alt={item.image_alt}
                                        src={item.image_src}
                                        className="object-cover object-center"
                                      />
                                    </div>
                                    <a
                                      href={item.href}
                                      className="mt-6 block font-medium text-gray-900"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 z-10"
                                      />
                                      {item.name}
                                    </a>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p
                                      id={`${section.name}-heading`}
                                      className="font-medium text-gray-900"
                                    >
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <a
                                            href={item.href}
                                            className="hover:text-gray-800"
                                          >
                                            {item.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {navigation.forms.map((form) => (
                    <a
                      key={form.name}
                      href={form.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {form.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              {/* CHANGE CURRENCY */}
              <div className="ml-auto flex items-center space-x-6">
                <div className="hidden lg:ml-8 lg:flex ml-auto">
                  <a href="#" className="flex items-center">
                    <span className="sr-only">Currency</span>
                    <CurrencyDollarIcon
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                    <ChangeCurrency
                      currentCurrency={currency}
                      setCurrency={setCurrency}
                    />
                  </a>
                </div>
              </div>

              <div className="ml-4 flow-root lg:ml-6">
                {/* CART HREF */}
                <Link href="/cart" className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    aria-hidden="true"
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {cartItems?.length || 0}
                  </span>
                  {/* UPDATE # of items in cart */}
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
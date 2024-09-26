// Warranty FAQ + modal form
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Field,
  Fieldset,
  Input,
  Legend,
  Textarea,
  Select,
  Label,
} from "@headlessui/react";

export default function Warranty() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-lg p-6">Something went wrong. What now?</h1>
      <button
        className="inline-flex items-center gap-2 rounded-md bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-blue-600 data-[open]:bg-blue-700 data-[focus]:outline-1 data-[focus]:outline-white"
        onClick={() => setFormOpen(true)}
      >
        Open Form
      </button>
      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle>Warranty Request</DialogTitle>
            <Description>Let's make things right.</Description>
            <p>
              Check your email for the next steps. Please give us 1-2 business
              days to reply.
            </p>
            <Fieldset className="space-y-8">
              <Legend className="text-log font-bold">Tell us more...</Legend>
              <Field>
                <Label className="block">Email Address</Label>
                <Input className="mt-1 block" name="contact" />
              </Field>
              <Field>
                <Label className="block">Your Name</Label>
                <Textarea className="mt-1 block" name="name" />
              </Field>
              <Field>
                <Label className="block">Product Affected</Label>
                <Textarea className="mt-1 block" name="product" />
              </Field>
              <Field>
                <Label className="block">
                  Preferred Method of Reconcilliation
                </Label>
                <Select className="mt-1 block" name="method">
                  <option>Replacement</option>
                  <option>Return & Refund</option>
                </Select>
              </Field>
            </Fieldset>
            <div className="flex gap-4">
              <button onClick={() => setFormOpen(false)}>Cancel</button>
              <button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                onClick={() => setFormOpen(false)}
              >
                Submit
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

import { OppoFormInterface } from "./formSlice"

// A mock function to mimic making an async request for data
export function fakeFetchFrom(form: OppoFormInterface) {
  console.log('fakeFetchRoom started!')
  return new Promise<{ data: OppoFormInterface, ok: boolean}>((resolve) =>
    setTimeout(() => resolve({ data: form, ok: true }), 500)
  );
}

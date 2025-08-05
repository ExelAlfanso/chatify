import Form from "next/form";
export default function Register() {
  return (
    <Form
      action=""
      className="flex flex-col gap-10 items-center justify-center w-100 bg-gray-500"
    >
      <div className="flex flex-col gap-10">
        <div>
          <label htmlFor="">email:</label>
          <input type="email" />
        </div>
        <div>
          <label htmlFor="">password:</label>
          <input type="password" />
        </div>
        <div>
          <label htmlFor="">confirm password:</label>
          <input type="password" />
        </div>
      </div>
      <button className="cursor-pointer hover:bg-gray-500">Submit</button>
    </Form>
  );
}

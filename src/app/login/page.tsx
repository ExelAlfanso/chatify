import Header from "@/components/Header";
import Form from "next/form";
export default function Login() {
  return (
    <Form
      action=""
      className="flex flex-col gap-10 items-center justify-center bg-white min-h-screen text-black"
    >
      <Header className="font-bold">Sign in</Header>
      <div className="flex flex-col gap-10">
        <div>
          <label htmlFor="">email:</label>
          <input type="email" />
        </div>
        <div>
          <label htmlFor="">password:</label>
          <input type="password" />
        </div>
      </div>
      <button className="cursor-pointer hover:bg-gray-500">Submit</button>
    </Form>
  );
}

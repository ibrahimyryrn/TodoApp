import Button from "../components/Button";

function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-white p-5 rounded-lg shadow-lg w-72 text-center">
        <h2 className="mb-5 font-bold text-2xl">Sign Up Page</h2>
        <form className="mb-4 text-left">
          {/* <div className="mb-4 text-left">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 box-border border-solid border-2 border-slate-400 rounded"
            />
          </div> */}
          <div className="mb-4 text-left">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 box-border border-solid border-2 border-slate-400 rounded"
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 box-border border-solid border-2 border-slate-400 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 box-border border-solid border-2 border-slate-400 rounded"
            />
          </div>
          <Button
            className={
              "w-full p-3 bg-blue-500 text-white border-none rounded cursor-pointer hover:bg-blue-700 mt-5 text-lg"
            }
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;

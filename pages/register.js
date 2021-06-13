/** @format */

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      toast.success("Registration Successfull. Please login to continue");
      router.push("/login");
    } catch (error) {
      toast.error(error.response.data);
      setEmail("");
      setLoading(false);
    }
  };
  return (
    <>
      <div className="p-5 mb-4 bg-primary bg-gradient">
        <div className="container-fluid py-5">
          <h1 className="text-center text-white">Register</h1>
        </div>
      </div>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            autoComplete="off"
          />
          <input
            type="email"
            className="form-control mb-4 p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="off"
          />
          <input
            type="password"
            className="form-control mb-4 p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="off"
          />

          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary "
              disabled={loading}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </div>
        </form>
        <p className="text-center p-3">
          Already Registered?{" "}
          <Link href="/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;

import Cookies from "js-cookie";
import { useState } from "react";
import { ApiLogin, ApiOtp, ApiRegister } from "../api";
import { useRouter } from "next/router";
import Link from "next/link";
import { Form, Input, Button, Checkbox } from "antd";

const register = () => {
  const Router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [secondStep, setSecondStep] = useState(false);
  const [otp, setOtp] = useState("");

  const handleRegister = (e) => {
    ApiRegister(e, (data, error) => {
      if (error) return alert(error);
      Cookies.set("registerToken", data.token);
      setSecondStep(true);
    });
  };

  const handleOtp = (e) => {
    e.preventDefault();
    ApiOtp({ otp }, (data, error) => {
      console.log(data);
      if (error) return alert(error);
      Cookies.set("user", JSON.stringify(data.user));
      Router.push("/login");
    });
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="stripe">
          <h1>FikraSpace</h1>
        </div>
        <div className="right-side">
          {!secondStep ? (
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={handleRegister}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          ) : (
            // <form onSubmit={handleRegister}>
            //   <p className="label">Name</p>
            //   <input
            //     required
            //     placeholder="John Doe"
            //     value={name}
            //     onChange={(e) => setName(e.target.value)}
            //     type="text"
            //   />
            //   <p className="label">Phone Number</p>
            //   <input
            //     required
            //     placeholder="00000000000"
            //     value={phone}
            //     onChange={(e) => setPhone(e.target.value)}
            //     type="text"
            //   />
            //   <p className="label">Password</p>
            //   <input
            //     required
            //     placeholder="**********"
            //     value={password}
            //     onChange={(e) => setPassword(e.target.value)}
            //     type="password"
            //   />
            //   <button type="submit">Sign Up</button>
            //   <div
            //     className="links-container"
            //     style={{ marginTop: 10, alignSelf: "center" }}
            //   >
            //     <p>Already have an account?</p>
            //     <Link href="/login">
            //       <p className="sign-up-link">Login</p>
            //     </Link>
            //   </div>
            // </form>
            <form onSubmit={handleOtp}>
              <p className="label">OTP</p>
              <input
                required
                type="text"
                placeholder="1234"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button type="submit">Verify</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default register;

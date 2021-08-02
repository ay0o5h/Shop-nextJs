import Cookies from "js-cookie";
import { ApiForgotPass, ApiVerifyOtp } from "../api";
import { useState } from "react";
import { useRouter } from "next/router";
const ForgotPassword = () => {
  const Router = useRouter();
  const [phone, setPhone] = useState("");
  const [stepTwo, setStepTwo] = useState(false);
  const [passwordOtp, setPasswordOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handeForgot = (e) => {
    e.preventDefault();
    ApiForgotPass({ phone }, (data, error) => {
      if (error) return alert(error);

      Cookies.set("forgotToken", data.token);
      setStepTwo(true);
    });
  };

  const handleVerify = (e) => {
    e.preventDefault();
    ApiVerifyOtp({ passwordOtp, newPassword }, (data, error) => {
      if (error) return alert(error);
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
          {!stepTwo ? (
            <form onSubmit={handeForgot}>
              <p className="label">Phone Number</p>
              <input
                required
                type="text"
                placeholder="0000000000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button type="submit">Verify</button>
            </form>
          ) : (
            <form onSubmit={handleVerify}>
              <p className="label">OTP</p>
              <input
                required
                type="text"
                placeholder="0000000000"
                value={passwordOtp}
                onChange={(e) => setPasswordOtp(e.target.value)}
              />
              <p className="label">New Password</p>
              <input
                required
                type="password"
                placeholder="*********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button type="submit">Verify</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

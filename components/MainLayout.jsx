import { PageHeader, Popover, Avatar, Button, Select } from "antd";
const { Option } = Select;
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useStore } from "../store";
import { phrases } from "../phrases";

const MainLayout = ({ children, title, subTitle, hasBack }) => {
  const [token, setToken] = useState();
  const [labguageLoaded, setLanguageLoaded] = useState(false);
  const Router = useRouter();
  const handleLogout = async () => {
    await Cookies.remove("token");
    await Cookies.remove("user");
    Router.reload();
  };

  const { lang, setLang } = useStore();

  const content = (
    <div>
      <Button onClick={handleLogout} type="primary" danger>
        Logout
      </Button>
    </div>
  );

  useEffect(() => {
    const value = Cookies.get("token");
    const language = Cookies.get("userLang");
    if (language) setLanguageLoaded(true);
    console.log(value);

    if (value != "undefined") setToken(value);
  }, []);

  async function handleChange(value) {
    setLang(value);
    await Cookies.set("userLang", value);
  }

  useEffect(() => {
    console.log(lang);
  }, [lang]);

  return labguageLoaded ? (
    <>
      {hasBack ? (
        <PageHeader
          className="site-page-header"
          title={title}
          subTitle={subTitle}
          onBack={() => Router.back()}
          extra={
            token
              ? [
                  <>
                    <Popover
                      trigger="click"
                      placement="bottom"
                      content={content}
                    >
                      <Avatar size="large" icon={<UserOutlined />} />
                    </Popover>
                    <Select
                      defaultValue={lang}
                      style={{ width: 120, margin: "0 10px" }}
                      onChange={handleChange}
                    >
                      <Option value="en">English</Option>
                      <Option value="ar">عربي</Option>
                    </Select>
                  </>,
                ]
              : [
                  <>
                    <Link href={"/login"}>
                      <Button type="primary">{phrases[lang].login}</Button>
                    </Link>
                    <Link href={"/register"}>
                      <Button>{phrases[lang].signUp}</Button>
                    </Link>
                    <Select
                      defaultValue={lang}
                      style={{ width: 120, margin: "0 10px" }}
                      onChange={handleChange}
                    >
                      <Option value="en">English</Option>
                      <Option value="ar">عربي</Option>
                    </Select>
                  </>,
                ]
          }
        />
      ) : (
        <PageHeader
          className="site-page-header"
          title={title}
          subTitle={subTitle}
          extra={
            token
              ? [
                  <>
                    <Popover
                      trigger="click"
                      placement="bottom"
                      content={content}
                    >
                      <Avatar size="large" icon={<UserOutlined />} />
                    </Popover>
                    <Select
                      defaultValue={lang}
                      style={{ width: 120, margin: "0 10px" }}
                      onChange={handleChange}
                    >
                      <Option value="en">English</Option>
                      <Option value="ar">عربي</Option>
                    </Select>
                  </>,
                ]
              : [
                  <>
                    <Link href={"/login"}>
                      <Button type="primary">{phrases[lang].login}</Button>
                    </Link>
                    <Link href={"/register"}>
                      <Button>{phrases[lang].signUp}</Button>
                    </Link>
                    <Select
                      defaultValue={lang}
                      style={{ width: 120, margin: "0 10px" }}
                      onChange={handleChange}
                    >
                      <Option value="en">English</Option>
                      <Option value="ar">عربي</Option>
                    </Select>
                  </>,
                ]
          }
        />
      )}

      <div className="container">{children}</div>
    </>
  ) : null;
};

export default MainLayout;

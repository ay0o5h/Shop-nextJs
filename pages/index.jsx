import Cookies from "js-cookie";
import RouteProtect from "../HOC/RouteProtect";
import { PageHeader, Avatar, Popover, Button, Spin } from "antd";
import { useState } from "react";

import { useEffect } from "react";
import { URL } from "../api";
import moment from "moment";
import Link from "next/link";
import PureCard from "../components/pureCard";
import MainLayout from "../components/MainLayout";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { useStore } from "../store";
import { phrases } from "../phrases";

const Home = () => {
  const [categories, setCategories] = useState();

  const { lang, setLang } = useStore();

  useEffect(() => {
    const language = Cookies.get("userLang");
    if (language) setLang(language);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${URL}/categories`, requestOptions)
      .then((response) => response.json())
      .then((result) => setCategories(result.data))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <RouteProtect>
        <MainLayout title="FikraCamps Shop">
          <div
            className={lang == "en" ? "hero-container" : "hero-container flip"}
          >
            <div className="left">
              <span className="hero-type-wrapper">
                <h1 className="hero-type">{phrases[lang].welcome}</h1>
              </span>
              <Button size="large" className="hero-cta" type="primary">
                {phrases[lang].ctaText}
                {lang == "en" ? (
                  <RightOutlined className="my-icon" />
                ) : (
                  <LeftOutlined className="my-icon" />
                )}
              </Button>
            </div>
            <div className="right">
              <img src="./images/hero.svg" alt="" />
            </div>
          </div>

          <div className="home-content">
            {!!categories ? (
              categories?.[0].map((e) => (
                <PureCard item={e} link="/subCategories" />
              ))
            ) : (
              <Spin size="large" />
            )}
          </div>
        </MainLayout>
      </RouteProtect>
    </>
  );
};

export default Home;

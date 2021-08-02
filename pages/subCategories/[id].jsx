import Cookies from "js-cookie";
import { useRouter } from "next/router";
import RouteProtect from "../../HOC/RouteProtect";
import { PageHeader, Avatar, Popover, Button } from "antd";
import { useState } from "react";

import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { URL } from "../../api";
import MainLayout from "../../components/MainLayout";
import PureCard from "../../components/pureCard";

const SubCategories = () => {
  const Router = useRouter();
  const { id } = Router.query;
  const [data, setData] = useState();
  console.log("id=>>", id);
  useEffect(() => {
    const token = Cookies.get("token");
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/subcategories/category/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  }, [Router]);

  return (
    <>
      <RouteProtect>
        <MainLayout title="Home" subTitle="Sub Categories" hasBack>
          <div className="home-content">
            {data?.[0].map((e) => {
              return <PureCard item={e} link="/product" />;
            })}
          </div>
        </MainLayout>
      </RouteProtect>
    </>
  );
};

export default SubCategories;

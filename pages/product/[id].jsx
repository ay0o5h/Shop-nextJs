import Cookies from "js-cookie";
import RouteProtect from "../../HOC/RouteProtect";
import { PageHeader, Avatar, Popover, Button, Spin, Empty } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { URL } from "../../api";
import moment from "moment";
import Link from "next/link";
import PureCard from "../../components/pureCard";
import MainLayout from "../../components/MainLayout";

const Products = () => {
  const Router = useRouter();
  const [products, setProducts] = useState();
  const { id } = Router.query;
  useEffect(() => {
    const token = Cookies.get("token");
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/products/subcategory/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setProducts(result.data))
      .catch((error) => console.log("error", error));
  }, [Router]);

  return (
    <>
      <RouteProtect>
        <MainLayout title="Home" subTitle="Product" hasBack>
          <div className="home-content">
            {!!products ? (
              !products?.[0].length > 0 ? (
                <Empty />
              ) : (
                products?.[0].map((e) => (
                  <PureCard item={e} link="/singleProduct" />
                ))
              )
            ) : (
              <Spin size="large" />
            )}
          </div>
        </MainLayout>
      </RouteProtect>
    </>
  );
};

export default Products;

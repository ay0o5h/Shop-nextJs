import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { URL } from "../../api";
import MainLayout from "../../components/MainLayout";
import RouteProtect from "../../HOC/RouteProtect";
import { Image } from "antd";
import { useStore } from "../../store";
import { phrases } from "../../phrases";

const singleProduct = () => {
  const [data, setData] = useState();
  const Router = useRouter();
  const { lang, setLang, theme, setTheme } = useStore();

  const { id } = Router.query;

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${URL}/products/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, [Router]);
  return (
    <RouteProtect>
      <MainLayout title="Home" subTitle="Product" hasBack>
        {!!data ? (
          <div className="single-content">
            <div className="image-wrapper">
              <img className="sp-img" src={data.image} />
              <p className="price">${data.price}</p>
            </div>
            <div
              className={lang == "en" ? "name-warranty" : "name-warranty flip"}
            >
              <p className="sp-name">
                {lang == "en" ? data.name : data.nameAr}
              </p>
              <p className="sp-war">
                {phrases[lang].warranty}: {data.warranty ?? ""}{" "}
                {data.warranty > 1
                  ? lang == "ar"
                    ? phrases[lang].year
                    : phrases[lang].years
                  : phrases[lang].year}{" "}
              </p>
            </div>
            <p
              className={
                lang == "en" ? "sp-description" : "sp-description flip"
              }
            >
              {lang == "en" ? data.description : data.descriptionAr}
            </p>
          </div>
        ) : null}
      </MainLayout>
    </RouteProtect>
  );
};

export default singleProduct;

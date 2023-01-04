import React from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

const App: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {pathnames.map((name, index) => (
        <Breadcrumb.Item>
          <a href={`/${pathnames.slice(0, index + 1).join("/")}`}>{name}</a>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default App;

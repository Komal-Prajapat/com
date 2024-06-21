import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./index.css"; // Import your custom CSS file
import RemoveTag from "../../components/removetag";

const DetailPageTab = ({ description, general }) => {
  const showSpecificationTab = general && general.length > 0;

  return (
    <div className="detailpagetab">
      <Tabs style={{ width: "100%" }}>
        <TabList className="custom-tab-list">
          <Tab>Description</Tab>
          {showSpecificationTab && <Tab>Specification</Tab>}
        </TabList>

        <TabPanel>
          <RemoveTag
            ParserText={description}
            style={{
              fontSize: "14px",
              lineHeight: "24px",
              color: "red",
              fontFamily: "sans-serif",
              marginBottom: "0",
            }}
          />
        </TabPanel>

        {showSpecificationTab && (
          <TabPanel style={{ width: "100%" }}>
            <div className="table_container">
              <table style={{ width: "100%" }}>
                <tbody>
                  {general.map((item, index) => (
                    <tr key={index}>
                      <td className="general_title">{item.title}</td>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
        )}
      </Tabs>
    </div>
  );
};

export default DetailPageTab;

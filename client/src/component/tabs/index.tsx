import { Tabs } from "@mantine/core";
import { ReactNode, useState } from "react";
import styles from "./MantineTab.module.css";

type TabComponent = {
  id: string;
  component: ReactNode;
};

type TabLabel = {
  id: string;
  label: string;
};

export type TabContentType = {
  components: TabComponent[];
  labels: TabLabel[];
};

const MantineTab = ({ tabsContent }: { tabsContent: TabContentType }) => {
  const [activeTab, setActiveTab] = useState(tabsContent.components[0].id);

  return (
    <Tabs
      value={activeTab}
      onChange={(value: string | null) => setActiveTab(value || "")}
      color="red"
      activateTabWithKeyboard={true}
    >
      <Tabs.List className="!border-b before:!border-none">
        {tabsContent.labels.map((item) => (
          <Tabs.Tab
            key={item.id}
            value={item.id}
            id={item.id}
            className={styles.m_539e827b}
          >
            {item.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabsContent.components.map((item) => (
        <Tabs.Panel
          key={item.id}
          value={item.id}
          className="flex items-center justify-center mt-10"
        >
          {item.component}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default MantineTab;

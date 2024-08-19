import DropdownIcon from "@/assets/filter/DropdownIcon";
import { Box, Collapse, Group } from "@mantine/core";
import { useRef, useState } from "react";

interface SectionSectionType {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface Props {
  sections: SectionSectionType[];
}

const CollapsibleContainer = ({ sections }: Props) => {
  const [openedSections, setOpenedSections] = useState<string[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleSection = (title: string, index: number) => {
    setOpenedSections((prev) => {
      const newOpenedSections = title === prev[0] ? [] : [title];

      if (index !== 0) {
        setTimeout(() => {
          if (sectionRefs.current[title]) {
            sectionRefs.current[title].scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 200);
      }

      return newOpenedSections;
    });
  };

  return (
    <div className="w-full">
      {sections.map((section, index) => (
        <Box
          key={section.id}
          id={section.id}
          ref={(el) => (sectionRefs.current[section.title] = el)}
        >
          <Group mb={20}>
            <button
              className="text-2xl pb-2 border-b text-[#000000] border-[#D9D9D9] w-full text-start relative"
              onClick={() => toggleSection(section.title, index)}
            >
              {section.title}
              <span
                className={`absolute right-0 bottom-[-10px] bg-white border rounded-full h-[20px] w-[20px] flex items-center justify-center ${
                  openedSections.includes(section.title) ? "rotate-180" : ""
                }`}
              >
                <DropdownIcon />
              </span>
            </button>
          </Group>

          <Collapse in={openedSections.includes(section.title)}>
            <div className="px-56 pt-5 pb-9">{section.content}</div>
          </Collapse>
        </Box>
      ))}
    </div>
  );
};

export default CollapsibleContainer;

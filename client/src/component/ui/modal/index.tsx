import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { Modal } from "@mantine/core";

type Props = {
  title: string;
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const sizeType = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "55rem",
  "3xl": "70%",
  "4xl": "100%",
};

function DefaultModal({
  onClose,
  opened,
  size = "xl",
  title,
  children,
}: Props) {
  const W1024 = useWindowWidth(1024);

  return (
    <Modal
      size={W1024 ? sizeType["4xl"] : sizeType[size]}
      className="text"
      opened={opened}
      onClose={onClose}
      styles={{
        root: { width: "800px" },
        content: { padding: "0 20px" },
        header: { paddingTop: "20px" },
        title: { fontSize: "20px", fontWeight: "500" },
      }}
      title={title}
    >
      {children}
    </Modal>
  );
}

export default DefaultModal;

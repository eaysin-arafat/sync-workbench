import styles from "./loader.module.css";

const SidebarLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className={styles.container}>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default SidebarLoader;

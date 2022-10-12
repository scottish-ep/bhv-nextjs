import React from "react";
import styles from "./TitlePage.module.css";
import Icon from "../Icon/Icon";

interface TitlePageProps {
  title?: string;
  href?: string;
}

const TitlePage = (props: TitlePageProps) => {
  const { title, href } = props;

  return (
    <div className="flex flex-row gap-[16px] items-center">
      {href && (
        <button
          className={styles.button}
          onClick={() => (window.location.href = href)}
        >
          <Icon icon="back" size={24} color="#DADADD" />
        </button>
      )}
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default TitlePage;

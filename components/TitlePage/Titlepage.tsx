import React from "react";
import styles from "./TitlePage.module.css";
import Icon from "../Icon/Icon";
import classNames from "classnames";

interface TitlePageProps {
  title?: string;
  href?: string;
  description?: string;
  className?: string;
}

const TitlePage = (props: TitlePageProps) => {
  const { title, href, description, className, ...rest } = props;

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
      <div className={classNames(styles.title, className)}>{title}</div>
      <div className="flex flex-col gap-y-2">
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.description}>{description}</div>}
      </div>
    </div>
  );
};

export default TitlePage;

import React, { useState } from "react";
import { Card, Tag, Tooltip, Button, Dropdown } from "antd";
import {
  GlobalOutlined,
  InfoCircleOutlined,
  DownOutlined,
  LinkOutlined,
  UserOutlined,
  FlagOutlined,
  BookOutlined,
} from "@ant-design/icons";
import styles from "./NewsSnippet.module.scss";

import type { IData_SnippetNews } from "./types";
import { message } from "antd";

interface Props {
  data: IData_SnippetNews;
}

const NewsSnippet: React.FC<Props> = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  
  const [showDetails, setShowDetails] = useState(false);
  const handleToggleDetails = () => setShowDetails(!showDetails);

  const [showDuplicates, setShowDuplicates] = useState(false);
  const handleToggleDuplicates = () => setShowDuplicates(!showDuplicates);


  const date = new Date(data.DP).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const sentimentColor =
    data.SENT === "positive" ? "#1AC387" : data.SENT === "negative" ? "#F6A5A5" : "#FFD98E";

  const handleShowMore = () => setShowMore(!showMore);

  return (
    <Card className={styles.card} bordered={false}>
      <div className={styles.headerRow}>
        <div className={styles.leftInfo}>
          <span className={styles.date}>{date}</span>
          <span className={styles.reach}>{data.REACH.toLocaleString()} Reach</span>
          <span className={styles.traffic}>
            Top Traffic:{" "}
            {data.TRAFFIC.map((t, i) => (
              <Tooltip key={i} title={`${t.value} ${Math.round(t.count * 100)}%`}>
                <span>{t.value} {Math.round(t.count * 100)}%{i < data.TRAFFIC.length - 1 && ", "}</span>
              </Tooltip>
            ))}
          </span>
        </div>
        <div className={styles.rightInfo}>
          <Tag color={sentimentColor} className={styles.sentiment}>{data.SENT}</Tag>
          <Button size="small" icon={<InfoCircleOutlined />} onClick={() => message.info("News sentiment is based on analysis of keywords and context.")} />
          <Button size="small" icon={<DownOutlined />} onClick={handleToggleDetails} />
        </div>
      </div>

      <a href={data.URL || "#"} target="_blank" rel="noreferrer" className={styles.title}>
        {data.TI}
      </a>
      {showDetails && (
        <div className={styles.detailsBlock}>
          <p>{data.AB}</p>
        </div>
      )}

      <div className={styles.metaRow}>
        <span className={styles.metaItem}><GlobalOutlined /> {data.DOM}</span>
        <span className={styles.metaItem}><FlagOutlined /> {data.CNTR}</span>
        <span className={styles.metaItem}><BookOutlined /> {data.LANG}</span>
        <span className={styles.metaItem}><UserOutlined /> {data.AUTHOR}</span>
      </div>

      <div className={styles.highlight}>
        {(showMore ? data.HIGHLIGHTS : data.HIGHLIGHTS.slice(0, 2)).map((highlight, i) => (
          <p
            key={i}
            className={styles.highlightText}
            dangerouslySetInnerHTML={{
              __html: highlight.replace(/&lt;kw&gt;/g, "<mark>").replace(/&lt;\/kw&gt;/g, "</mark>"),
            }}
          />
        ))}
        {data.HIGHLIGHTS.length > 2 && (
          <Button type="link" className={styles.showMoreBtn} onClick={handleShowMore} icon={<DownOutlined />}>
            {showMore ? "Show less" : "Show more..."}
          </Button>
        )}
      </div>

      <div className={styles.tags}>
        {data.KW.slice(0, 5).map((tag, i) => (
          <Tag key={i} className={styles.tag}>
            <span>
              <GlobalOutlined style={{ fontSize: "14px", marginRight: "4px" }} />
              {tag.value} <sup>{tag.count}</sup>
            </span>
          </Tag>
        ))}
        {data.KW.length > 5 && (
          <Button type="link" className={styles.showAllBtn} icon={<DownOutlined />}>
            Show all +{data.KW.length - 5}
          </Button>
        )}
      </div>

      <Button
        type="default"
        className={styles.sourceBtn}
        href={data.URL || "#"} // Ссылка на источник
        target="_blank"
        rel="noreferrer"
        style={{
          backgroundColor: "rgba(100, 100, 100, 0.2)",
          color: "#4fa3ff",
          padding: "10px 16px",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "bold",
          transition: "background 0.3s ease-in-out, color 0.2s ease",
          border: "none",
          width: "fit-content",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(100, 100, 100, 0.4)")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(100, 100, 100, 0.2)")}
      >
        Original Source
      </Button>


      <div className={styles.footerRow}>
        <span>Duplicates: {data.DUPLICATES}</span>

        <div className={styles.relevanceDropdown}>
          <Dropdown menu={{ items: [{ key: "rel", label: "By relevance" }, { key: "date", label: "By date" }] }}>
          <button className={styles.relevanceButton}>
            By relevance <DownOutlined />
          </button>
          </Dropdown>
        </div>
      </div>

      <div className={styles.duplicateBlock}>
        <div className={styles.duplicateHeader}>
          <span>{date} | Top Reach: {data.TRAFFIC[0]?.value} {Math.round(data.TRAFFIC[0]?.count * 100)}%</span>
          <div>
            <Button size="small" icon={<InfoCircleOutlined />} />
            <Button size="small" icon={<DownOutlined />} />
          </div>
        </div>

        <a href={data.URL} target="_blank" rel="noreferrer" className={styles.title}>
          {data.TI}
        </a>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}><LinkOutlined /> ria.ru</span>
          <span className={styles.metaItem}><FlagOutlined /> Austria</span>
          <span className={styles.metaItem}><UserOutlined /> Emily C.</span>
        </div>
      </div>

      <Button
        type="default"
        className={styles.viewDuplicatesBtn}
        onClick={handleToggleDuplicates}
        style={{
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          transition: "background 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        icon={<DownOutlined />}
      >
        {showDuplicates ? "Hide duplicates" : "View duplicates"}
      </Button>
      {showDuplicates && (
        <div className={styles.duplicatesList}>
          <p>Duplicate articles will be listed here...</p>
        </div>
      )}
    </Card>
  );
};

export default NewsSnippet;

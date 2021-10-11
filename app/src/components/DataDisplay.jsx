

export default function DataDisplay({ dataTheme, dataContent }) {
  const { title, label} = dataTheme;
  return (
    <div className="sm_box">
      <div className="label">
        <h3 className="content_titl">{title}</h3>
      </div>
      <ul className="sm_box_content">
        <li className="item_label">
          {label.map((item, index) => {
            return (
              <span key={index}>
                {item}
              </span>
            );
          })}
        </li>

        {dataContent &&
          dataContent.map((item, index) => {
            return (
              <li className="item_single" key={index}>
                <span className="num_font">{parseFloat(item[0])}</span>
                <span className="num_font">{parseFloat(item[1])}</span>
                {item[2] && <span >{item[2]}</span>}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
